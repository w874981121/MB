<!--修改vip医生信息-->
<template>
  <div class="new-account m20 por fsz14">
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
          <!--<el-button plain>设为网站特邀</el-button>-->
          <el-button plain @click="disableFn">{{status ==0 ? '禁用账号':'启用账号'}}</el-button>
          <!--<el-button plain>重置密码</el-button>-->
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存修改</el-button>
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
    name: 'revise-vip-coctor-management',
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
        status:'',
        memberdata: generateData(), //所有权限请求
        memberids: [],        //选中权限id
        memberidsstate: false, //权限窗口状态
        memberTag: [],
      }
    },
    watch: {},
    methods: {
      getData(){
        this.$axios.get('/api/back/customers/' + this.$route.query.customerId).then((response)=> {
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
            }
            this.status = data.status
        }).catch(function (error) {
          console.log(error);
        });

        //会员数据
        let _this = this
        this.$axios.get('/api/back/doctors/customers?customerId=' + this.$route.query.customerId).then((response)=> {
          let data = response.data.data;
          data.forEach(function(tiem,i){
            _this.memberids.push(tiem.customerId)
            _this.memberTag.push(tiem.customerName)
            _this.memberdata.push({
              key: tiem.customerId,
              label: tiem.customerName,
            });
          })
        }).catch(function (error) {
          console.log(error);
        });


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
      //禁用/启用
      disableFn(){
        let _this = this;
        let messageText = [];
        if (this.status == 0) {
          messageText[0] = '禁用账号后此账号都不可继续使用！';
          messageText[1] = '成功！';
        } else {
          messageText[0] = '启用账号此账号都可正常使用！';
          messageText[1] = '成功！';
        }
        this.$confirm(messageText[0], '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/customers/lock', {customerId: this.$route.query.customerId})
            .then((response) => {
              console.log(response)
              this.$message({
                type: 'success',
                message: messageText[1]
              });
              history.go(-1)
            })
            .catch(function (error) {
              console.log(error);
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });
        })
      },
      onSubmit() {
        let fromdata = {
          customerId: Number(this.$route.query.customerId),
          photoUrl: this.form.photoUrl,  //头像地址
          customerName: this.form.customerName,  //医生姓名
          phone: this.form.phone, //医生手机号
          hospital: this.form.hospital, //医院名称
          department: this.form.department, //科室
          title: this.form.title, //职称
          price: this.form.price,   //诊疗费
          customersId: '',  //会员ID
        }
        if(this.memberids.length > 0){
          fromdata.customersId = this.memberids.join(",");
        }


        this.$axios.post('/api/back/doctors',fromdata)
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
