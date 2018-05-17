<!--新建普通会员信息-->
<template>
  <div class="new-account m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/regularmm' }">普通会员管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建普通会员信息</el-breadcrumb-item>
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
        <el-form-item label="姓名：" prop="customerName" :rules="[{required: true, message: '请输入姓名', trigger: 'blur'}]">
          <el-input v-model="form.customerName"></el-input>
        </el-form-item>

        <el-form-item label="性别：" prop="sex" :rules="[{required: true, message: '请输入姓名', trigger: 'blur'}]">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option
              v-for="item in optionsSex"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="地址：">
          <el-cascader
            :options="options"
            v-model="form.address"
            :props="props">
          </el-cascader>
        </el-form-item>

        <el-form-item label="手机号：" prop="phone" :rules="[{required: true, message: '请输入手机号', trigger: 'blur'}]">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script type="text/javascript">
  import qs from 'qs';
  export default {
    name: 'new-doctor-management',
    data(){
      return {
        options: [],
        props: {
          value: 'code',
          label: 'areaName',
          children: 'children',
        },
        upimgUrl: this.$urlapi + '/back/customers/image',
        imageUrl: '',
        loading: false,
        optionsSex: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        form: {
          photoUrl: '',  //头像地址
          customerName: '',  //用户姓名
          phone: '', //手机号
          sex: '',
          address: [],
          type: 0
        }
      }
    },
    watch: {},
    methods: {
      //文件上传成功
      handleAvatarSuccess(res, file) {
        if (res.errcode === 0) {
          this.$message({
            type: 'success',
            message: "上传成功"
          });
          this.imageUrl = this.$api + "/images/" + res.data;
          this.form.photoUrl = res.data;
        } else {
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
//      地址信息
      getData(){
        this.$axios.get('/api/back/users/allArea').then((response)=> {
//          console.log(this.options)
          let data = response.data.data;
          console.log(data)
          data.forEach((item, a)=> {
            data[a].children = item.secList;
            item.secList.forEach((tem, b)=> {
              data[a].children[b].children = tem.thirdList;
            })
          })
          this.options = data;
        }).catch(function (error) {
          console.log(error);
        });
      },
      //新建
      onSubmit(formName) {
        let fromdata = {
          customerName: escape(this.form.customerName),
          photoUrl: this.form.photoUrl,
          phone: this.form.phone,
          sex: this.form.sex,
          type: 0,
        }
        if(!!this.form.address){
          fromdata.address=this.form.address.join(',');
        }
        this.$refs[formName].validate((valid) => {
          console.log("=====")
          if (!valid) {
            throw new Error('参数错误'); //验证判断
          }
        });

        if (fromdata.phone.length != 11) {
          this.$message({
            type: 'error',
            message: "手机号码格式错误"
          });
          return
        }

        if (fromdata.phone.length < 1) {
          this.$message({
            showClose: true,
            type: "error",
            message: '请完善信息！！！'
          });
          return
        }
        this.$axios.post('/api/back/customers', fromdata)
          .then((response)=> {
            console.log(response)
            if (response.data.errcode == 30012) {
              this.$message({
                showClose: true,
                type: "error",
                message: '手机号重复，请重新填写！'
              });
              return
            }

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
      this.getData()
    }
  }
</script>

<style lang="scss">
</style>
