<template>
  <div id="login">
    <div class="login_box">
      <div class="login_bg">
      <div class="text"><img src="../assets/login_text.png" alt="">
      </div>
      <div class="formdiv">
        <el-input size="medium" placeholder="请输入账号" v-model="login.usersname">
        </el-input>
        <el-input class="mt20" @keyup.enter.native="postLogin($event)" type="password" size="medium" placeholder="请输入密码" v-model="login.password">
        </el-input>
        <a class="mt10" @click="open">遇到问题</a>
        <el-button class="mt20" @keyup.enter.native="postLogin($event)" style="width:100%" size="medium" type="primary" @click="postLogin">
          登陆
        </el-button>
      </div>
    </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  export default {
    data(){
      return {
        login: {
          usersname: '',
          password: ''
        }
      }
    },
    methods: {
      //登陆请求
      postLogin(){
        this.$axios.post('/api/login', qs.stringify(this.login),{
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).then((response)=> {
          console.log(response)
          let data = response.data.data;
          switch (response.data.errcode){
            case 0:
              this.$message({
                showClose: true,
                type: "success",
                message: '登陆成功！'
              });
              this.cookieFn.set("username", response.data.data.username);
              this.cookieFn.set("truename", response.data.data.truename);
              this.cookieFn.set("usersid", response.data.data.usersid);
              this.cookieFn.set("type", response.data.data.type);
              this.cookieFn.set("token", response.data.data.token);
              this.$router.push({path: "/contentbox"})
              break;

            case 30002:
              this.$alert('登录失败(账号密码错误)', '登录失败', {
                confirmButtonText: '确定',
                type: "error",
              });
              break;

            case 30010:
              this.$alert('登录失败(账号被冻结)', '登录失败', {
                confirmButtonText: '确定',
                type: "error",
              });
              break;

            default :

          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      open() {
        this.$alert('客服电话：010-12345678', '联系客服', {
          confirmButtonText: '确定',
        });
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  #login {
    width: 100%;
    height: 100%;
    background: url(../assets/bgT.jpg) center no-repeat;
    background-size: 100% 100%;
    .login_box {
      width: 800px;
      height: 400px;

      background: url("../assets/login_bg.png") no-repeat;
      background-size: 1000px 500px;
      background-position: -100px;
      position: absolute;
      top: 50%;
      right: 74px;
      margin-top: -200px;
      .login_bg{
        width: 100%;
        height:100%;
        border-radius: 5px;
        background: rgba(158, 172, 181, 0.4);
      }
    }
    .text {
      width: 400px;
      height: 124px;
      float: left;
      margin-top: 138px;
      img {
        display: block;
        height: 100%;
        margin: 0 auto;
      }
    }
    .formdiv {
      width: 240px;
      padding: 100px 80px;
      float: left;
      a {
        float: right;
        display: block;
        line-height: 1;
        border-bottom: 1px solid #04396a;
        cursor: pointer;
      }
    }
  }
</style>
