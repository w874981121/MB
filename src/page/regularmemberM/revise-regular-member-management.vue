<!--修改普通会员信息-->
<template>
  <div class="new-account m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/regularmm' }">普通会员管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改普通会员信息</el-breadcrumb-item>
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

      <el-form ref="form" label-width="120px">
        <el-form-item label="姓名：">
          <el-input v-model="form.customerName"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex" :rules="[{required: true, message: '请输入姓名', trigger: 'blur'}]">
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


        <el-form-item label="手机号：">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="密码：">
          <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="upgrade">升级为VIP</el-button>
          <el-button plain @click="disableFn">{{form.status ==0 ? '禁用账号':'启用账号'}}</el-button>
          <el-button plain @click="prohibitRelease">{{form.releases == 1 ? '开启发布论坛' : '禁止发布论坛'}}</el-button>

        </el-form-item>
        <el-form-item>
          <el-button plain @click="prohibitReply">{{form.reply == 1 ? '开启回复论坛' : '禁止回复论坛'}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  export default {
    name: 'new-doctor-management',
    data(){
      return {
        options:[],
        props: {
          value: 'code',
          label:'areaName',
          children: 'children',
        },
        loading:false,
        optionsSex:[{
          value: '男',
          label: '男'
        },{
          value: '女',
          label: '女'
        }],
        upimgUrl: this.$urlapi + '/back/customers/image',
        imageUrl: '',
        form: {},
      }
    },
    watch: {},
    mounted(){
      this.getForm()
    },
    methods: {
      getForm(){
      let form = {};
      this.$axios.get('/api/back/customers/' + this.$route.query.customerId).then((response)=> {
        console.log(response)
        let data = response.data.data;

        data.areaList.forEach((item,a)=>{
          data.areaList[a].children = item.secList;
          item.secList.forEach((tem,b)=>{
            data.areaList[a].children[b].children = tem.thirdList;
          })
        })
        this.options = data.areaList;
         this.imageUrl = this.$api+"/images/" + data.photoUrl,
          this.form = {
            photoUrl: data.photoUrl,  //头像地址
            customerName: decodeURIComponent(data.customerName),  //用户姓名
            phone: data.phone, //手机号
            cardNo: data.cardNo, //用户设备号
            status: data.status,
            passWord: data.passWord,
            sex: data.sex,
            reply: data.reply ? data.reply : 0,   //回复状态   1 禁止回复   0可回复
            releases: data.releases ? data.releases : 0,
          }

          if(data.address){
            this.form.address = data.address.split(',');
          }

      }).catch(function (error) {
        console.log(error);
      });
      return;
    },
      //文件上传成功
      handleAvatarSuccess(res, file) {
        if(res.errcode === 0){
          this.$message({
            type: 'success',
            message: "上传成功"
          });
          this.imageUrl = this.$api + "/images/" + res.data;
          this.form.photoUrl = res.data;
        }else{
          this.$message({
            type: 'error',
            message: "上传失败"
          });
        }
        this.loading = false;
      },
      //上传文件之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'|| 'image/png';
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
      //升级会员
      upgrade(){
        this.$confirm('确认升级为VIP？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/customers/vip', {customerId: this.$route.query.customerId})
            .then((response) => {
              console.log(response)
              this.$message({
                type: 'success',
                message: "升级成功"
              });
              history.go(-1)
            })
            .catch(function (error) {
              console.log(error);
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消升级'
          });
        })
      },
      //禁用/启用
      disableFn(){
        let _this = this;
        let messageText = [];
        if (this.form.lockState == 0) {
          messageText[0] = '禁用账号后此账号都不可继续使用！';
          messageText[1] = '禁用成功！';
        } else {
          messageText[0] = '启用账号此账号都可正常使用！';
          messageText[1] = '启用成功！';
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
      onSubmit() {
        let fromData = {
          customerId: this.$route.query.customerId,
          photoUrl: this.form.photoUrl,
          customerName: this.form.customerName,
          phone: this.form.phone,
          passWord: this.form.passWord,
          sex: this.form.sex,
          address: this.form.address.join(','),
          type: 0,
        }
        if(fromData.phone.length < 1){
          return
        }
        this.$axios.post('/api/back/customers', fromData)
          .then((response)=> {
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
    },

  }
</script>

<style lang="scss">

</style>
