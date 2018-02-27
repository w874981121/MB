<template>
  <div id="contentbox">
    <div class="top">
      <div class="toptitle fl ml20">
        欢迎使用精益天成管理系统
      </div>
      <div class="sign_out fr mr20" @click="signOut">
        <i></i>
        退出
      </div>
      <div class="username fr mr20">
        <i></i>
        <b>{{username}}</b>
        <span>{{truename}}</span>
      </div>
    </div>
    <div class="nav">
      <NavList></NavList>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import NavList from '../components/NavList.vue'
  export default {
    name: 'contentbox',
    data(){
      return {
        username: this.cookieFn.get("username"),
        truename: this.cookieFn.get("truename"),
      }
    },
    mounted(){
      console.log(this.username, this.truename)
      console.log(this.$store.state)//获取参数
    },
    methods: {
      signOut(){
        let _this = this;
        this.$axios.get("/api/usersLogin").then((response) => {
          console.log(response)
        this.$message({
          showClose: true,
          type: "warning",
          message: '退出成功！'
        });
        _this.$router.push({path: "/"})
        _this.cookieFn.delete("username")
        _this.cookieFn.delete("truename")
        _this.cookieFn.delete("usersid")
        _this.cookieFn.delete("type")
      }).
        catch(function (error) {
          console.log(error);
        });
      }
    },
    components: {
      NavList
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  #contentbox {
    height: 100%;
    .top {
      position: absolute;
      width: 100%;
      height: 60px;
      line-height: 60px;
      background: #409EFF;
      color: #fff;
      z-index: 9;
      .sign_out {
        position: relative;
        padding-left: 30px;
        cursor: pointer;
        i {
          position: absolute;
          width: 20px;
          height: 20px;
          display: block;
          left: 0;
          top: 19px;
          background: url("../assets/signout.png") no-repeat center;
          background-size: 100%;
        }
      }
      .username {
        position: relative;
        padding-left: 30px;
        i {
          position: absolute;
          width: 20px;
          height: 20px;
          display: block;
          left: 0;
          top: 20px;
          background: url("../assets/username.png") no-repeat center;
          background-size: 100%;
        }
        span {
          font-size: 14px;
        }
      }
    }
    .nav {
      width: 200px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      padding-top: 60px;
      z-index: 8;
    }
    .content {
      width: 100%;
      height: 100%;
      position: absolute;
      box-sizing: border-box;
      padding-left: 200px;
      padding-top: 60px;
      top: 0;
      left: 0;
      overflow: auto;
      z-index: 1;
    }
  }
</style>
