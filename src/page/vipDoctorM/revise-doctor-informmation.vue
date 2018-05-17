<!--修改vip医生信息-->
<template>
  <div class="new-account m20 por fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/vipdm' }">VIP医生管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改VIP医生信息</el-breadcrumb-item>
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
        <el-form-item label="医院名称：" prop="hospital" :rules="[{required: true, message: '请输入医院名称', trigger: 'blur'}]">
          <el-input v-model="form.hospital"></el-input>
        </el-form-item>
        <el-form-item label="科室：" prop="department" :rules="[{required: true, message: '请输入科室', trigger: 'blur'}]">
          <el-input v-model="form.department"></el-input>
        </el-form-item>
        <el-form-item label="职称：" prop="title" :rules="[{required: true, message: '请输入职称', trigger: 'blur'}]">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="customerName" :rules="[{required: true, message: '请输入姓名', trigger: 'blur'}]">
          <el-input v-model="form.customerName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone" :rules="[{required: true, message: '请输入手机号', trigger: 'blur'}]">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="passWord" :rules="[{required: true, message: '请输入密码', trigger: 'blur'}]">
          <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item label="我的会员：">
          <div>
            <template v-for="name in memberTag">
              <el-tag class="mr10">{{name}}</el-tag>
            </template>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" plain @click="purviewidsAlert">添加会员</el-button>
        </el-form-item>
        <el-form-item label="诊疗费用：">
          <el-input v-model="form.price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button plain @click="setGuest">{{guest == 1 ? '取消特邀':'设为特邀'}}</el-button>
          <el-button plain @click="disableFn">{{status ==0 ? '禁用账号':'启用账号'}}</el-button>
          <el-button plain @click="upgrade">降级为普通医生</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="prohibitReply">{{form.reply == 1 ? '开启回复论坛' : '禁止回复论坛'}}</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <div class="alert_box_transfer" v-show="memberidsstate">
        <h3>添加会员：</h3>
        <el-transfer v-model="memberids" :button-texts="['删除', '添加']" :titles="['未分配会员', '选中会员']" :data="memberdata">
        </el-transfer>
        <el-button class="preservation_but" type="primary" @click="preservationFn">保存</el-button>
        <el-button class="preservation_but mr20" @click="purviewidsAlert">关闭</el-button>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
  import qs from 'qs';
  export default {
    name: 'revise-vip-coctor-management',
    data(){
      const generateData = () => {
        const data = [];
        this.$axios.get('/api/back/doctors/customers')
          .then((response) => {
            console.log(response)
            let datalist = response.data.data;
            datalist.forEach(function (item, i) {
              data.push({
                key: item.customerId,
                label: item.customerName,
              });
            })
          })
          .catch((error) => {
            console.log(error);
          })
        console.log(data)
        return data;
      }
      return {
        upimgUrl: this.$urlapi + '/back/customers/image',
        imageUrl: '',
        loading:false,
        form: {
          photoUrl: '',  //头像地址
          customerName: '',  //医生姓名
          phone: '', //医生手机号
          hospital: '', //医院名称
          department: '', //科室
          title: '', //职称
          price: '',   //诊疗费
          customersId: '',  //会员ID
          passWord: '', //密码
          type: 1
        },
        status:'',
        guest:'',
        memberdata: generateData(), //所有权限请求
        memberids: [],        //选中权限id
        memberidsstate: false, //权限窗口状态
        memberTag: [],
      }
    },
    watch: {},
    methods: {
      getData(){
        this.$axios.get('/api/back/customers/' + this.$route.query.customerId).then((response)=> {
          let data = response.data.data;
            this.imageUrl = this.$api+"/images/" + data.photoUrl,
            this.form = {
              photoUrl: data.photoUrl,  //头像地址
              customerName: unescape(data.customerName),  //医生姓名
              phone: data.phone, //医生手机号
              hospital: unescape(data.hospital), //医院名称
              department: unescape(data.department), //科室
              title: unescape(data.title), //职称
              passWord: data.passWord,
              price: data.price,
              customersId: data.customersId,
              reply: data.reply ? data.reply : 0,   //回复状态   1 禁止回复   0可回复
            }
            this.status = data.status
            this.guest = data.guest
        }).catch(function (error) {
          console.log(error);
        });

        //会员数据
        let _this = this
        this.$axios.get('/api/back/doctors/customers?customerId=' + this.$route.query.customerId).then((response)=> {
          let data = response.data.data;
          data.forEach(function(tiem,i){
            _this.memberids.push(tiem.customerId)
            _this.memberTag.push(tiem.customerName)
            _this.memberdata.push({
              key: tiem.customerId,
              label: tiem.customerName,
            });
          })
        }).catch(function (error) {
          console.log(error);
        });


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
      //添加会员弹窗
      purviewidsAlert(){
        this.memberidsstate = !this.memberidsstate;
      },
      //保存
      preservationFn(){
        this.purviewidsAlert();
        this.powerShow();
      },
      //会员展示
      powerShow(){
        let _this = this;
        this.memberTag = [];
        this.memberdata.forEach(function (item, i) {
          _this.memberids.forEach(function (tem, s) {
            if (item.key === tem) {
              _this.memberTag.push(item.label)
            }
          })
        })
      },
      //禁用/启用
      disableFn(){
        let _this = this;
        let messageText = [];
        if (this.status == 0) {
          messageText[0] = '禁用账号后此账号都不可继续使用！';
          messageText[1] = '成功！';
        } else {
          messageText[0] = '启用账号此账号都可正常使用！';
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

      //设为特邀
      setGuest(){
        let _this = this;
        let messageText = '';
        if (this.guest == 0) {
          messageText = '确认设置特邀医生？';
        } else {
          messageText = '确认取消为特邀医生？';
        }
        this.$confirm(messageText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/doctor/guest', {customerId: this.$route.query.customerId}).then((response) => {
            console.log(response)
            this.$message({
              type: 'success',
              message: '成功'
            });
            history.go(-1)
          }).catch(function (error) {
            console.log(error);
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        })
      },

      //降级为普通会员
      upgrade(){
        this.$confirm('降级为普通医生？', '提示', {
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
      //保存修改
      onSubmit(formName) {
        let formdata = {
          customerId: Number(this.$route.query.customerId),
          photoUrl: this.form.photoUrl,  //头像地址
          customerName: this.form.customerName,  //医生姓名
          phone: this.form.phone, //医生手机号
          hospital: this.form.hospital, //医院名称
          department: this.form.department, //科室
          title: this.form.title, //职称
          price: this.form.price,   //诊疗费
          passWord: this.form.passWord,
          customersId: '',  //会员ID
        }

        this.$refs[formName].validate((valid) => {
          if (!valid) {
            throw new Error('参数错误'); //验证判断
          }
        });

        if(this.memberids.length > 0){
          formdata.customersId = this.memberids.join(",");
        }

        if(formdata.phone.length < 1){
          this.$alert("请完善信息！！！", "提示", {
            confirmButtonText: '确定',
          });
          return
        }

        this.$axios.post('/api/back/doctors',formdata).then((response)=> {
            console.log(response)
        if(response.data.errcode === 0){
          this.$message({
            type: 'success',
            message: "修改成功"
          });
          history.go(-1)
        }
        }).catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted(){
      this.getData();
    }
  }
</script>

<style lang="scss">
  .alert_box_transfer {
    background: #eee;
    border: 1px #bbb solid;
    display: block;
    width: 524px;
    padding: 30px;
    position: absolute;
    border-radius: 4px;
    top: 34%;
    left: 50%;
    transform: translate(-50%, -50%);

  .preservation_but {
    float: right;
    margin-top: 20px;
  }

  }
</style>
