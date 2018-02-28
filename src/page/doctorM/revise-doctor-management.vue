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
          action="/api/back/users/image"
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
        <el-form-item>
          <!--<el-button plain>网站禁言</el-button>-->
          <el-button plain @click="disableFn">{{status ==0 ? '禁用账号':'启用账号'}}</el-button>
          <!--<el-button plain>重置密码</el-button>-->
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
        imageUrl: "http://47.104.146.162:8080/images/" + this.photoUrl,
        form: {},
        status: null,
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
          this.imageUrl = "http://47.104.146.162:8080/images/" + data.photoUrl,
            this.form = {
              customerId: data.customerId,
              photoUrl: data.photoUrl,  //头像地址
              customerName: data.customerName,  //医生姓名
              phone: data.phone, //医生手机号
              hospital: data.hospital, //医院名称
              department: data.department, //科室
              title: data.title, //职称
            }
            this.status = data.status
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
        this.imageUrl = "http://47.104.146.162:8080/images/" + res.data;
        this.form.photoUrl = res.data;
        console.log(res.data)
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
          price: 0,
        }
        this.$axios.post('/api/back/doctors', fromdata).then((response)=> {
          console.log(response)
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
