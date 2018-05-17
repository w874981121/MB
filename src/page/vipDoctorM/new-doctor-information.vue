<!--新建vip医生信息-->
<template>
  <div class="new-account m20 por fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/vipdm' }">VIP医生管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建VIP医生信息</el-breadcrumb-item>
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
        <el-form-item label="医院名称：" prop="hospital" :rules="[{required: true, message: '请输入医院名称', trigger: 'blur'}]">
          <el-input v-model="form.hospital"></el-input>
        </el-form-item>
        <el-form-item label="科室：" prop="department" :rules="[{required: true, message: '请输入科室', trigger: 'blur'}]">
          <el-input v-model="form.department"></el-input>
        </el-form-item>
        <el-form-item label="职称：" prop="title" :rules="[{required: true, message: '请输入职称', trigger: 'blur'}]">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="customerName" :rules="[{required: true, message: '请输入姓名', trigger: 'blur'}]">
          <el-input v-model="form.customerName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone" :rules="[{required: true, message: '请输入手机号', trigger: 'blur'}]">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="我的会员：">
          <div>
            <template v-for="name in memberTag">
              <el-tag class="mr10">{{name}}</el-tag>
            </template>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" plain @click="purviewidsAlert">添加会员</el-button>
        </el-form-item>
        <el-form-item label="诊疗费用：" prop="price" :rules="[{required: true, message: '请输入诊疗费用', trigger: 'blur'}]">
          <el-input v-model="form.price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        </el-form-item>
      </el-form>

    </div>
    <template>
      <div class="alert_box_transfer" v-show="memberidsstate">
        <h3>添加会员：</h3>
        <el-transfer v-model="memberids" :button-texts="['删除', '添加']" :titles="['未分配会员', '选中会员']" :data="memberdata">
        </el-transfer>
        <el-button class="preservation_but" type="primary" @click="preservationFn">保存</el-button>
        <el-button class="preservation_but mr20" @click="purviewidsAlert">关闭</el-button>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
  import qs from 'qs';
  export default {
    name: 'new-vip-coctor-management',
    data(){
      const generateData = () => {
        const data = [];
        this.$axios.get('/api/back/doctors/customers')
          .then((response) => {
            let datalist = response.data.data;
            datalist.forEach(function (item, i) {
              data.push({
                key: item.customerId,
                label: item.customerName,
              });
            })
          })
          .catch((error) => {
            console.log(error);
          })
        console.log(data)
        return data;
      }
      return {
        upimgUrl: this.$urlapi + '/back/customers/image',
        imageUrl: '',
        loading: false,
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
        },
        memberdata: generateData(), //所有权限请求
        memberids: [],        //选中权限id
        memberidsstate: false, //权限窗口状态
        memberTag: [],
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
      //上传文件失败
      handleAvatarError(res, file){
        this.loading = false;
        this.$message({
          type: 'error',
          message: "上传失败"
        });
      },
      //添加会员弹窗
      purviewidsAlert(){
        this.memberidsstate = !this.memberidsstate;
      },
      //保存
      preservationFn(){
        this.purviewidsAlert();
        this.powerShow();
      },
      //会员展示
      powerShow(){
        let _this = this;
        this.memberTag = [];
        this.memberdata.forEach(function (item, i) {
          _this.memberids.forEach(function (tem, s) {
            if (item.key === tem) {
              _this.memberTag.push(item.label)
            }
          })
        })
      },
      onSubmit(formName) {
        let formdata = {
          photoUrl: this.form.photoUrl,
          customerName: this.form.customerName,
          phone: this.form.phone,
          hospital: this.form.hospital,
          department: this.form.department,
          title: this.form.title,
          price: this.form.price,
          customersId: "",
          type: this.form.type,
        }

        this.$refs[formName].validate((valid) => {

          if (!valid) {
            throw new Error('参数错误'); //验证判断
          }
        });



        if (formdata.phone.length != 11) {
          this.$message({
            type: 'error',
            message: "手机号码格式错误"
          });
          return
        }
        this.$axios.post('/api/back/doctors', formdata)
          .then((response)=> {
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
    }
  }
</script>

<style lang="scss">
  .alert_box_transfer {
    background: #eee;
    border: 1px #bbb solid;
    display: block;
    width: 524px;
    padding: 30px;
    position: absolute;
    border-radius: 4px;
    top: 34%;
    left: 50%;
    transform: translate(-50%, -50%);

  .preservation_but {
    float: right;
    margin-top: 20px;
  }

  }
</style>
