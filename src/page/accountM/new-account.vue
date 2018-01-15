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
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="公司名称：">
          <el-input v-model="form.usersname"></el-input>
        </el-form-item>
        <el-form-item label="公司联系人：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script type="text/javascript">
  import qs from 'qs';
  export default {
    name: 'new-account',
    data(){
      return {
        imageUrl: '',
        form: {
          username: 'jkasdhasdk',
          password: '3123123112'
        }
      }
    },
    watch: {},
    methods: {
      //文件上传成功
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      //上传文件之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
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
      onSubmit() {
//        var forms = qs.stringify(this.form);
//        this.$axios({
//          method:'post',
//          url:'http://192.168.50.145:8080/users',
//          data: forms,
//          responseType:'json',
//          headers: {
//            'Content-Type': 'application/x-www-form-urlencoded'
//          }
//        }) .then((response)=> {
//          console.log("1")
//          console.log(response)
//        })
//          .catch(function (error) {
//            console.log(error);
//          });
//

        this.$axios.post('/api/back/users', this.form, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        })
          .then((response)=> {
            console.log("2")
            console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted(){
      console.log("来了")
      console.log(this.$route.query)
    }
  }
</script>

<style lang="scss">
  .get_form {
    width: 500px;
  }

  .uplogo {
    overflow: hidden;
    width: 100%;

  .title {
    width: 120px;
    text-align: right;
    line-height: 32px;
    padding-right: 12px;
    display: block;
    float: left;
    box-sizing: border-box;
  }

  .avatar-uploader {
    float: left;
  }

  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
