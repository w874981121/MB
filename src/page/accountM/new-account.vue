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
          action="/api/back/users/image"
          name="imagePath"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.photoUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="公司名称：">
          <el-input v-model="form.truename"></el-input>
        </el-form-item>
        <el-form-item label="公司联系人：">
          <el-input v-model="form.linkName"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
        imageUrl: '',
        form: {
          photoUrl: '',
          truename: '',
          linkName: '',
          phone: '',
          type: 1,
        }
      }
    },
    watch: {},
    methods: {
      //上传文件之前
      beforeAvatarUpload(file) {
        console.log(file.type)
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
      //文件上传成功
      handleAvatarSuccess(res, file) {
        this.imageUrl = "http://47.104.146.162:8080/images/" + res.data;
        this.form.photoUrl = res.data;
        console.log(res.data)
      },
      //创建
      onSubmit() {
        let form = {
          photoUrl: this.form.photoUrl,
          truename: escape(this.form.truename),
          linkName: escape(this.form.linkName),
          phone: this.form.phone,
          type: 1,
        };
        this.$axios.post('/api/back/users/webSite', form).then((response) => {
          if(response.data.errcode === 0){
          this.$message({
            showClose: true,
            type: "success",
            message: '创建成功！'
          });
          history.go(-1)
        }
      }).catch((error) => {
          console.log(error);
      })
        ;
      }
    },
    mounted(){
      console.log("来了")
      console.log(this.$route.query)
    }
  }
</script>

<style lang="scss">

</style>
