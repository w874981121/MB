<!--修改vip会员信息-->
<template>
  <div class="new-account m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/vipi' }">VIP会员管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改VIP会员信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="get_form mt20">
      <div class="uplogo">
        <span class="title">照片:</span>
        <el-upload
          class="avatar-uploader mb18"
          v-loading="loading"
          :action="upimgUrl"
          name="imagePath"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="姓名：" prop="customerName" :rules="[{required: true, message: '请输入姓名', trigger: 'blur'}]">
          <el-input v-model="form.customerName"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex" :rules="[{required: true, message: '请选择性别', trigger: 'blur'}]">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option
              v-for="item in optionsSex"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地址：">
          <el-cascader
            :options="options"
            v-model="form.address"
            :props="props">
          </el-cascader>
        </el-form-item>

        <el-form-item label="手机号：" prop="phone" :rules="[{required: true, message: '请输入手机号', trigger: 'blur'}]">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="passWord" :rules="[{required: true, message: '请输入密码', trigger: 'blur'}]">
          <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item label="设备编号：" prop="cardNo" :rules="[{required: true, message: '请输入设备编号', trigger: 'blur'}]">
          <el-input v-model="form.cardNo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="upgrade">降级为普通会员</el-button>
          <el-button plain @click="disableFn">{{form.status ==0 ? '禁用账号':'启用账号'}}</el-button>
          <el-button plain @click="prohibitRelease">{{form.releases == 1 ? '开启发布论坛' : '禁止发布论坛'}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="prohibitReply">{{form.reply == 1 ? '开启回复论坛' : '禁止回复论坛'}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">保存修改</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script type="text/javascript">
  import qs from 'qs';
  export default {
    name: 'revise-viprmm',
    data(){
      return {
        options: [],
        props: {
          value: 'code',
          label: 'areaName',
          children: 'children',
        },
        optionsSex: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        upimgUrl: this.$urlapi + '/back/customers/image',
        imageUrl: '',
        loading: false,
        form: {
          customerId: this.$route.query.customerId,
          photoUrl: '',
          customerName: '',
          phone: '',
          cardNo: '',
          sex: '',
          status: '',
          type: 1,
        },
      }
    },
    watch: {},
    mounted(){
      this.getData()
    },
    methods: {
      getData(){
        this.$axios.get('/api/back/customers/' + this.$route.query.customerId).then((response)=> {
          console.log(response)
          let data = response.data.data;


          data.areaList.forEach((item, a)=> {
            data.areaList[a].children = item.secList;
            item.secList.forEach((tem, b)=> {
              data.areaList[a].children[b].children = tem.thirdList;
            })
          })
          this.options = data.areaList;
          if (data.address) {
            this.form.address = data.address.split(',');
          }

          this.imageUrl = this.$api + "/images/" + data.photoUrl
          this.form.photoUrl = data.photoUrl  //头像地址
          this.form.customerName = decodeURIComponent(data.customerName)  //用户姓名
          this.form.phone = data.phone //手机号
          this.form.cardNo = data.cardNo //用户设备号
          this.form.status = data.status //状态
          this.form.passWord = data.passWord  //密码
          this.form.sex = data.sex  //性别
          this.form.reply = data.reply ? data.reply : 0;   //回复状态   1 禁止回复   0可回复
          this.form.releases = data.releases ? data.releases : 0;
        }).catch(function (error) {
          console.log(error);
        });
      },
      //文件上传成功
      handleAvatarSuccess(res, file) {
        if (res.errcode === 0) {
          this.$message({
            type: 'success',
            message: "上传成功"
          });
          this.imageUrl = this.$api + "/images/" + res.data;
          this.form.photoUrl = res.data;
        } else {
          this.$message({
            type: 'error',
            message: "上传失败"
          });
        }
        this.loading = false;
      },
      //上传文件之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        console.log(file)
        if (!isJPG) {
          this.loading = false;
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.loading = false;
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        this.loading = true;
        return isJPG && isLt2M;
      },
      //上传文件失败
      handleAvatarError(res, file){
        this.loading = false;
        this.$message({
          type: 'error',
          message: "上传失败"
        });
      },
      //禁用/启用
      disableFn(){
        let _this = this;
        let messageText = [];
        if (this.form.status == 0) {
          messageText[0] = '禁用账号后此账号不可继续使用！';
          messageText[1] = '成功！';
        } else {
          messageText[0] = '启用账号此账号可正常使用！';
          messageText[1] = '成功！';
        }
        this.$confirm(messageText[0], '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/customers/lock', {customerId: this.$route.query.customerId})
            .then((response) => {
              console.log(response)
              this.$message({
                type: 'success',
                message: messageText[1]
              });
              history.go(-1)
            })
            .catch(function (error) {
              console.log(error);
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });
        })
      },
      //重置密码
      setReset(){
        this.$confirm("确认是否要重置密码？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/reset', {customerId: this.$route.query.customerId}).then((response) => {
            console.log(response)
            this.$message({
              type: 'success',
              message: "重置成功"
            });
            history.go(-1)
          }).catch(function (error) {
            console.log(error);
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        })
      },
      //降级为普通会员
      upgrade(){
        this.$confirm('降级为普通会员？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/customers/vip', {customerId: this.$route.query.customerId})
            .then((response) => {
              console.log(response)
              this.$message({
                type: 'success',
                message: "降级成功"
              });
              history.go(-1)
            })
            .catch(function (error) {
              console.log(error);
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消降级'
          });
        })
      },


      //禁止回复论坛
      prohibitReply(){
        let _this = this;
        let messageText = [];
        if (this.form.reply == 0) {
          messageText[0] = '确认禁止回复论坛?';
          messageText[1] = '禁用成功！';
        } else {
          messageText[0] = '确认启用回复论坛！';
          messageText[1] = '启用成功！';
        }
        this.$confirm(messageText[0], '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/customer/reply', {customerId: this.$route.query.customerId})
            .then((response) => {
              console.log(response)
              this.$message({
                type: 'success',
                message: messageText[1]
              });
              history.go(-1)
            })
            .catch(function (error) {
              console.log(error);
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });
        })
      },

      //禁止发布论坛
      prohibitRelease(){
        let _this = this;
        let messageText = [];
        if (this.form.releases == 0) {
          messageText[0] = '确认禁止发布坛?';
          messageText[1] = '禁用成功！';
        } else {
          messageText[0] = '确认启用发布论坛！';
          messageText[1] = '启用成功！';
        }
        this.$confirm(messageText[0], '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/customer/release', {customerId: this.$route.query.customerId})
            .then((response) => {
              console.log(response)
              this.$message({
                type: 'success',
                message: messageText[1]
              });
              history.go(-1)
            })
            .catch(function (error) {
              console.log(error);
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });
        })
      },

      //保存修改
      onSubmit(formName) {
        let fromData = {
          customerId: this.$route.query.customerId,
          photoUrl: this.form.photoUrl,
          customerName: escape(this.form.customerName),
          phone: this.form.phone,
          cardNo: this.form.cardNo,
          passWord: this.form.passWord,
          sex: this.form.sex,
          type: 1,
        }
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            throw new Error('参数错误'); //验证判断
          }
        });
        if (!!this.form.address) {
          fromData.address = this.form.address.join(',');
        }

        if (fromData.phone.length < 1) {
          return
        }
        this.$axios.post('/api/back/customers', fromData)
          .then((response)=> {
            console.log(response)
            if (response.data.errcode == 0) {
              this.$message({
                showClose: true,
                type: "success",
                message: '修改成功！'
              });
              history.go(-1)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style lang="scss">

</style>
