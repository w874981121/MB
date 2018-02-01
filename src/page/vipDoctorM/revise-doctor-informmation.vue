<!--修改vip医生信息-->
<template>
  <div class="new-account m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/vipdm' }">VIP医生管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改VIP医生信息</el-breadcrumb-item>
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
        <el-form-item label="我的会员：">
          <el-button plain>添加会员</el-button>
        </el-form-item>
        <el-form-item label="诊疗费用：">
          <el-input v-model="form.price"><template slot="append">元</template></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain>设为网站特邀</el-button>
          <el-button plain>禁用账号</el-button>
          <el-button plain>重置密码</el-button>
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
    name: 'revise-vip-coctor-management',
    data(){
      return {
        imageUrl: '',
        form: {
          photoUrl: '',  //头像地址
          customerName: '',  //医生姓名
          phone: '', //医生手机号
          hospital: '', //医院名称
          department: '', //科室
          title: '', //职称
          price: '',   //诊疗费
          customersId: '',  //会员ID
          type: 1
        }
      }
    },
    watch: {},
    methods: {
      getData(){
        this.$axios.get('/api/back/customers/' + this.$route.query.customerId).then((response)=> {
          console.log(response)
          let data = response.data.data;
          this.imageUrl = "http://47.104.146.162:8080/images/" + data.photoUrl,
            this.form = {
              photoUrl: data.photoUrl,  //头像地址
              customerName: unescape(data.customerName),  //医生姓名
              phone: data.phone, //医生手机号
              hospital: unescape(data.hospital), //医院名称
              department: unescape(data.department), //科室
              title: unescape(data.title), //职称
              price: data.price,
              customersId: data.customersId,
              type: 0
            }
          console.log(this.form)
        }).catch(function (error) {
          console.log(error);
        });
        return
      },
      //文件上传成功
      handleAvatarSuccess(res, file) {
        this.imageUrl = "http://47.104.146.162:8080/images/" + res.data;
        this.form.photoUrl = res.data;
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
        this.$axios.post('/api/back/users', this.form)
          .then((response)=> {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted(){
      this.getData();
      console.log("来了")
      console.log(this.$route.query)
    }
  }
</script>

<style lang="scss">

</style>
