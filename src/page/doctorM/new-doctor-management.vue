<!--新建医生信息-->
<template>
  <div class="new-account m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/coctorm' }">医生管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建医生信息</el-breadcrumb-item>
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
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
        upimgUrl: this.$urlapi + '/back/customers/image',
        imageUrl: '',
        loading:false,
        form: {
          photoUrl: '',  //头像地址
          customerName: '',  //医生姓名
          phone:'', //医生手机号
          hospital:'', //医院名称
          department:'', //科室
          title:'', //职称
          type: 0
        }
      }
    },
    watch: {},
    methods: {
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
      onSubmit() {
        let fromdata = {
          photoUrl: this.form.photoUrl,
          customerName: escape(this.form.customerName),
          phone: this.form.phone,
          hospital:escape(this.form.hospital),
          department:escape(this.form.department),
          title:escape(this.form.title),
          price: '0',
          customersId:'',
          type: this.form.type,
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
            message: "新建成功"
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

    }
  }
</script>

<style lang="scss">

</style>
