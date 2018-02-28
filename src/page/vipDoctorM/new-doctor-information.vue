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
          <div>
            <template v-for="name in memberTag">
              <el-tag class="mr10">{{name}}</el-tag>
            </template>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" plain @click="purviewidsAlert">添加会员</el-button>
        </el-form-item>
        <el-form-item label="诊疗费用：">
          <el-input v-model="form.price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>

    </div>
    <template>
      <div class="alert_box_transfer" v-show="memberidsstate">
        <h3>添加会员：</h3>
        <el-transfer v-model="memberids" :button-texts="['删除', '添加']" :titles="['未分配会员', '选中会员']" :data="memberdata">
        </el-transfer>
        <el-button class="preservation_but" type="primary" @click="preservationFn">保存</el-button>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  export default {
    name: 'new-vip-coctor-management',
    data(){
      const generateData = () => {
        const data = [];
        this.$axios.get('/api/back/doctors/customers')
          .then((response) => {
            console.log(response)
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
        this.imageUrl = "http://47.104.146.162:8080/images/" + res.data;
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
      onSubmit() {
        let fromdata = {
          photoUrl: this.form.photoUrl,
          customerName: escape(this.form.customerName),
          phone: this.form.phone,
          hospital: escape(this.form.hospital),
          department: escape(this.form.department),
          title: escape(this.form.title),
          price: this.form.price,
          customersId: "",
          type: this.form.type,
        }
        if(this.memberids.length > 0){
          fromdata.customersId = this.memberids.join(",");
        }
        this.$axios.post('/api/back/doctors', fromdata)
          .then((response)=> {
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

</style>
