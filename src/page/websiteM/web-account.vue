<!--账号管理-->
<template>
  <div class="web_account m20 fsz14">
    <div class="get_form mt20">
      <div class="uplogo">
        <span class="title">公司logo:</span>
        <img v-if="form.photoUrl" :src="imageUrl" class="avatar">
      </div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="公司名称：">
          <el-input :disabled="true" v-model="form.truename"></el-input>
        </el-form-item>
        <el-form-item label="公司联系人：">
          <el-input :disabled="true" v-model="form.linkName"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input :disabled="true" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="网址：">
          <el-input :disabled="true" v-model="form.weburl"></el-input>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input :disabled="true" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input :disabled="true" v-model="form.password"></el-input>
        </el-form-item>
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="onSubmit">修改登录密码</el-button>-->
        <!--</el-form-item>-->
      </el-form>
    </div>

    <div class="alert_password" v-show="alert_state">
      <div aria-label="提示" class="el-message-box__wrapper"
           style="z-index: 2048;">
        <div class="el-message-box">
          <div class="el-message-box__header">
            <div class="el-message-box__title tac">
              <span>修改登录密码</span></div>
            <!--<button type="button" aria-label="Close" class="el-message-box__headerbtn"><i class="el-message-box__close el-icon-close"></i></button>-->
          </div>
          <div class="el-message-box__content">
            <div class="el-message-box__input">
              <div class="el-input">
                <input placeholder="请输入原密码" class="el-input__inner" type="text">
              </div>
              <div class="el-input">
                <input placeholder="请输入新密码" class="el-input__inner mt10" type="text">
              </div>
              <div class="el-input">
                <input placeholder="请输入新密码" class="el-input__inner mt10" type="text">
              </div>
            </div>
          </div>
          <div class="el-message-box__btns">
            <button type="button" @click="cancel" class="el-button el-button--default el-button--small">取消</button>
            <button type="button" @click="determine" class="el-button el-button--default el-button--small el-button--primary ">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'web_account',
    data(){
      return {
        alert_state: false,
        imageUrl: '',
        form: {
//            truename:'',   //公司名称
//            linkName:'',   //公司联系人
//            phone:'',      //电话
//            username:'',   //账号
//            photoUrl:'',   //logo地址
//            comments:'',   //网站地址
        }
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      //请求
      getData(){
        let _this = this;
        this.$axios.get('/api/back/users/company/' + this.cookieFn.get("usersid")).then((response)=> {
          let datelist = response.data.data;
          console.log(datelist)
          _this.form = datelist;
          console.log(_this.form)
          _this.imageUrl = this.$api+"/images/" + this.form.photoUrl
        }).catch(function (error) {
          console.log(error);
        })
      },
      //修改密码
      onSubmit(){
        this.alert_state = !this.alert_state
      },
      //确定修改
      determine(){
        this.onSubmit();
        console.log()
        this.$message({
          showClose: true,
          type: "success",
          message: '修改成功！'
        });
      },
      //取消修改
      cancel(){
        this.onSubmit();
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .avatar {
    width: auto;
    margin-bottom: 10px;
  }

  .alert_password {
    position: absolute;
    top: 50%;
  }
</style>
