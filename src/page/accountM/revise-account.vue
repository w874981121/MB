<template>
  <div class="new-account m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/websitemm' }">网站账号管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改账号</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="get_form mt20">
      <div class="uplogo">
        <span class="title">公司logo:</span>
        <el-upload
          class="avatar-uploader mb18"
          action="/api/back/users/image"
          name="imagePath"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="公司名称：" prop="truename" :rules="[{required: true, message: '请输入公司名称', trigger: 'blur'}]">
          <el-input v-model="form.truename"></el-input>
        </el-form-item>
        <el-form-item label="公司联系人：" prop="linkName" :rules="[{required: true, message: '请输入公司联系人', trigger: 'blur'}]">
          <el-input v-model="form.linkName"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="phone" :rules="[{required: true, message: '请输入电话', trigger: 'blur'}]">
          <el-input v-model="form.phone" ></el-input>
        </el-form-item>

        <el-form-item>
          <a href="javascript:void(0);" @click="disableFn">{{form.lockState == 0 ? '禁用账号':'启用账号'}}</a>
          <!--<a href="javascript:void(0);" class="ml20" @click="resetFn">重置密码</a>-->
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">保存修改</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  export default {
    name: 'new-account',
    data(){
      return {
        imageUrl: "",
        form: {
          photoUrl: "",
          truename: "",
          linkName: "",
          phone: "",
          lockState: '',
        }
      }
    },
    mounted(){
      this.$axios.get('/api/back/users/' + this.$route.query.usersid, {params: {usersid: this.$route.query.usersid}}).then((response)=> {
        console.log(response)
        let data = response.data.data;
        this.imageUrl = this.$api+ "/images/" + data.photoUrl, this.form.photoUrl = data.photoUrl;
        this.form.truename = data.truename;
        this.form.linkName = data.linkName;
        this.form.phone = data.phone;
        this.form.lockState = data.lockState;
        console.log(this.getdata)
      }).catch(function (error) {
        console.log(error);
      });
    },
    methods: {
      //文件上传成功
      handleAvatarSuccess(res, file) {
        if(res.errcode === 30004){
          this.$message({
            type: 'error',
            message: "上传失败"
          });
        }else if(res.errcode === 0){
          this.$message({
            type: 'success',
            message: "上传成功"
          });
        }
        this.imageUrl = this.$api + "/images/" + res.data;
        this.form.photoUrl = res.data;
      },
      //上传文件之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //修改
      onSubmit(formName) {

        this.$refs[formName].validate((valid) => {
          console.log("=====")
        if (!valid) {
          throw new Error('参数错误'); //验证判断
        }
      });

        let form = {
          usersid: this.$route.query.usersid,
          photoUrl: this.form.photoUrl,
          truename: escape(this.form.truename),
          linkName: escape(this.form.linkName),
          phone: this.form.phone
        }
        this.$axios.post('/api/back/users/webSite', form)
          .then((response)=> {
            this.$message({
              showClose: true,
              type: "success",
              message: '修改成功！'
            });
            history.go(-1)
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      //禁用账号
      disableFn() {
        let _this = this;
        let messageText = [];
        if (this.form.lockState == 0) {
          messageText[0] = '禁用账号后，本账号的网址、医生账号、会员账号都不可继续使用！';
          messageText[1] = '禁用成功！';
        }else{
          messageText[0] = '启用账号后，本账号的网址、医生账号、会员账号都可继续使用！';
          messageText[1] = '启用成功！';
        }
        this.$confirm(messageText[0], '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/users', {usersid: this.$route.query.usersid})
            .then((response)=> {
              console.log(response)
              this.$message({
                type: 'success',
                message: messageText[1],
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
        });
      },
      //  重置
      resetFn() {
        this.$confirm('重置密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送请求
          this.$message({
            type: 'success',
            message: '重置成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });
      }
    },
  }
</script>

<style lang="scss">

</style>
