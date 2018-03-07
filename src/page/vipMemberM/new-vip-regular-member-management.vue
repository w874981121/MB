<!--新建Vip会员信息-->
<template>
  <div class="new-account m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/vipi' }">VIP会员管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建VIP会员信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="get_form mt20">
      <div class="uplogo">
        <span class="title">照片:</span>
        <el-upload
          class="avatar-uploader mb18"
          action="/api/back/customers/image"
          name="imagePath"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="姓名：">
          <el-input v-model="form.customerName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="设备编号：">
          <el-input v-model="form.cardNo"></el-input>
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
    name: 'new-viprmm',
    data(){
      return {
        imageUrl: '',
        form: {
          photoUrl: '',  //头像地址
          customerName: '',  //用户姓名
          phone:'', //手机号
          cardNo: '', //用户设备号
          type: 1
        }
      }
    },
    watch: {},
    methods: {
      //文件上传成功
      handleAvatarSuccess(res, file) {
        this.imageUrl = this.$api+"/images/" + res.data;
        this.form.photoUrl = res.data;
        console.log(res.data)
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
        return isJPG && isLt2M;
      },
      onSubmit() {
        let fromdata = {
          photoUrl: this.form.photoUrl,
          customerName: escape(this.form.customerName),
          phone: this.form.phone,
          cardNo:this.form.cardNo,
          type: 1,
        }

        if(fromData.phone.length < 1){
          return
        }

        this.$axios.post('/api/back/customers', fromdata)
          .then((response)=> {
            console.log(response)
        if (response.data.errcode == 0) {
          this.$message({
            showClose: true,
            type: "success",
            message: '新建成功！'
          });
          history.go(-1)
        }
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
</style>
