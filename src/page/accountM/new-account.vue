<template>
  <div class="new-account m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/websitemm' }">网站账号管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建账号</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="get_form mt20">
      <div class="uplogo">
        <span class="title">公司logo:</span>
        <el-upload
          class="avatar-uploader mb18"
          v-loading="loading"
          :action="upimgUrl"
          name="imagePath"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.photoUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="公司名称：" prop="truename" :rules="[{required: true, message: '请输入公司名称', trigger: 'blur'}]">
          <el-input v-model="form.truename"></el-input>
        </el-form-item>
        <el-form-item label="网站后缀：" prop="username" :rules="[{required: true, message: '请输入后缀', trigger: 'blur'}]">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="公司联系人：" prop="linkName" :rules="[{required: true, message: '请输入公司联系人', trigger: 'blur'}]">
          <el-input v-model="form.linkName"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="phone" :rules="[{required: true, message: '请输入电话号码', trigger: 'blur'}]">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
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
        upimgUrl: this.$urlapi + '/back/users/image',
        imageUrl: '',
        loading: false,
        form: {
          photoUrl: '',
          truename: '',
          linkName: '',
          username: '', //网站后缀
          phone: '',
          type: 1,
        }
      }
    },
    watch: {},
    mounted(){
    },
    methods: {
      //上传文件之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          this.loading = false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          this.loading = false;
        }
        this.loading = true;
        return isJPG && isLt2M;
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
      //上传文件失败
      handleAvatarError(res, file){
        this.loading = false;
        this.$message({
          type: 'error',
          message: "上传失败"
        });
      },
      //创建
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          console.log("=====")
          if (!valid) {
          throw new Error('参数错误'); //验证判断
        }
      });

        let form = {
          photoUrl: this.form.photoUrl,
          truename: escape(this.form.truename),
          linkName: escape(this.form.linkName),
          phone: this.form.phone,
          username: this.form.username,
          type: 1,
        };

        if(form.phone.length != 11){
           this.$message({
            type: 'error',
            message: "手机号码格式错误"
          });
          return
        }

        this.$axios.post('/api/back/users/webSite', form).then((response) => {
          if(response.data.errcode === 30012){
            this.$message({
              type: "error",
              message: '公司名重复或者网站后缀重复！！'
            });
            return
          }

          if(response.data.errcode === 0){
          this.$message({
            showClose: true,
            type: "success",
            message: '创建成功！'
          });
          return history.go(-1)
        }else{
          this.$message({
            showClose: true,
            type: "error",
            message: '创建失败！'
          });
            return
        }
      }).catch((error) => {
          this.$message({
          showClose: true,
          type: "error",
          message: '创建失败！'
        });
          console.log(error);
      });
      }
    },
  }
</script>

<style lang="scss">

</style>
