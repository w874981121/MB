<template>
  <div id="login">
    <div class="login_box">
      <div class="text"><img src="../assets/login_text.png" alt="">
      </div>
      <div class="formdiv">
        <el-input size="medium" placeholder="请输入账号" v-model="login.usersname">
        </el-input>
        <el-input class="mt20" size="medium" placeholder="请输入密码" v-model="login.password">
        </el-input>
        <a class="mt10" @click="open">遇到问题</a>
        <el-button class="mt20" style="width:100%" size="medium" type="primary" @click="postLogin">
          登陆
        </el-button>
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
          usersname: 'admin',
          password: 'admin'
        }
      }
    },
    methods: {
      postLogin(){
        var data = qs.stringify(this.login);
        this.$axios.post('/api/login',data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((response)=> {
          console.log(response)
        }).catch(function (error) {
          console.log(error);
        });
      },
//        this.$router.push({path: "/websitemm", query: {token: '1232432543534'}})
      open() {
        this.$alert('客服电话：010-12345678', '联系客服', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
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
    .login_box {
      width: 800px;
      height: 400px;
      background: rgba(158, 172, 181, 0.4);
      border-radius: 5px;
      position: absolute;
      top: 50%;
      right: 74px;
      margin-top: -200px;
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
