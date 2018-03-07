<!--修改医生信息-->
<template>
  <div class="new-account m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/doctorm' }">医生管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改医生信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="get_form mt20">
      <div class="uplogo">
        <span class="title">照片:</span>
        <el-upload
          class="avatar-uploader mb18"
          action="/api/back/customers/image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="医院名称：">
          <el-input v-model="form.hospital"></el-input>
        </el-form-item>
        <el-form-item label="科室：">
          <el-input v-model="form.department"></el-input>
        </el-form-item>
        <el-form-item label="职称：">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="form.customerName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="setGuest">{{guest == 1 ? '取消特邀':'设为特邀'}}</el-button>
          <el-button plain @click="disableFn">{{status == 0 ? '禁用账号':'启用账号'}}</el-button>
          <!--<el-button plain @click="setReset">重置密码</el-button>-->
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
    name: 'revise-doctor-management',
    data(){
      return {
        imageUrl: this.$api+"/images/" + this.photoUrl,
        form: {},
        status: null,
        guest: null,
      }
    },
    watch: {},
    mounted(){
      console.log("000")
      this.getData();
    },
    methods: {
      getData(){
        let form = {};
        this.$axios.get('/api/back/customers/' + this.$route.query.customerId).then((response)=> {
          console.log(response)
          let data = response.data.data;
          this.imageUrl = this.$api+"/images/" + data.photoUrl,
            this.form = {
              customerId: data.customerId,
              photoUrl: data.photoUrl,  //头像地址
              customerName: data.customerName,  //医生姓名
              phone: data.phone, //医生手机号
              hospital: data.hospital, //医院名称
              department: data.department, //科室
              title: data.title, //职称
              passWord:data.passWord, // 密码
            }
            this.status = data.status
            this.guest = data.guest
        }).catch(function (error) {
          console.log(error);
        });
        return
      },
      //上传文件之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        console.log(file)
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        debugger
        return isJPG && isLt2M;
      },
      //文件上传成功
      handleAvatarSuccess(res, file) {
        this.imageUrl = this.$api+"/images/" + res.data;
        this.form.photoUrl = res.data;
        console.log(res.data)
      },

      //设为特邀
      setGuest(){

        let _this = this;
        let messageText = '';
        if (this.guest == 0) {
          messageText = '确认取消特邀医生？';
        } else {
          messageText = '确认设置为特邀医生？';
        }
        this.$confirm(messageText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/customers/lock', {customerId: this.$route.query.customerId}).then((response) => {
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


        this.$confirm("确认是否要设置为特邀医生？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/doctor/guest', {customerId: this.$route.query.customerId}).then((response) => {
            console.log(response)
            this.$message({
              type: 'success',
              message: "设置成功"
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
            message: '已取消'
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
      //修改确认
      onSubmit() {
        let fromdata = {
          customerId: this.form.customerId,
          photoUrl: this.form.photoUrl,
          customerName: this.form.customerName,
          phone: this.form.phone,
          hospital: this.form.hospital,
          department: this.form.department,
          title: this.form.title,
          passWord: this.form.passWord,
          price: 0,
        }
        if(fromdata.phone.length < 1){
          this.$alert("请完善信息！！！", "提示", {
            confirmButtonText: '确定',
          });
          return
        }
        this.$axios.post('/api/back/doctors', fromdata).then((response)=> {
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
  }
</script>

<style lang="scss">
</style>
