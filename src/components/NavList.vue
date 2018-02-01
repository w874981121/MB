<!--导航组件-->
<template>
  <el-row>
    <el-col :span="12">
      <el-menu :router="true" :default-active="initnav" class="el-menu-vertical-demo" @select="handleSelect"
               @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff"
               :unique-opened="true" active-text-color="#ffd04b">
        <template v-for="(i, index) in navlistData">
          <el-submenu v-if="i.list" :index="i.url" :key="i.key">
            <template slot="title">
              <!--<i class="el-icon-caret-right"></i>-->
              <span slot="title"
                    :style="{'color': repTest(i.url, initindex) ? '#ffd04b' : '#fff'}">{{i.name}}</span>
            </template>
            <el-menu-item v-for="(f, len) in i.list" :key="f.key" :index="f.url">{{f.name}}</el-menu-item>
          </el-submenu>

          <el-menu-item :index="i.url" v-if="!i.list">
            <!--<i class="el-icon-setting"></i>-->
            <span slot="title">{{i.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style lang="scss">
  .nav {
  .el-row {
    height: 100%;
  }
  .el-col-12 {
    width: 100%;
    height: 100%;
  }
  .el-submenu,
  .el-menu-item {
    min-width: 150px;
    text-align: left;
  }
  .el-icon-arrow-down::before {
    color: #fff !important;
  }
  .el-menu-vertical-demo {
    height: 100%;
  }
  .el-menu-item {
    height: 36px;
    line-height: 36px;
  }
  .el-submenu__title {
    height: 48px;
    line-height: 48px;
  }
  }
</style>

<script>
  export default {
    name: 'NavList',
    data() {
      return {
        navindex: "0-0",  //上级导航index
        initnav: "websitemm",
        initindex: "websitemm",
        navlistData: [{
          name: '账号管理',
          key: '0',
          url: 'open-websitemm-roleam',
          list: [{
            name: '网站账号管理',
            key: '00',
            url: 'websitemm',
          }, {
            name: '角色权限管理',
            key: '01',
            url: 'roleam',
          }]
        }, {
          name: '网站管理',
          key: '1',
          url: 'open-forumm-enterprisa-expertlh',///
          list: [{
            name: '网站账号',
            key: '10',
            url: 'webaccount',
          }, {
            name: '论坛管理',
            key: '11',
            url: 'forumm',
          }, {
            name: '企业公告',
            key: '12',
            url: 'enterprisa',
          }, {
            name: '专家讲堂',
            key: '13',
            url: 'expertlh',
          }]
        }, {
          name: 'VIP医生管理',
          key: '2',
          url: 'vipdm',
        }, {
          name: '医生管理',
          key: '3',
          url: 'doctorm',
        }, {
          name: 'VIP会员管理',
          key: '4',
          url: 'open-vipi-healthr-abnormalr-remoteo-datas',
          list: [{
            name: 'VIP信息',
            key: '40',
            url: 'vipi',
          }, {
            name: '健康记录',
            key: '41',
            url: 'healthr',
          }, {
            name: '异常报告',
            key: '42',
            url: 'abnormalr',
          }, {
            name: '远程订单',
            key: '43',
            url: 'remoteo',
          }, {
            name: '数据统计',
            key: '44',
            url: 'datas',
          }]
        }, {
          name: '普通会员管理',
          key: '5',
          url: 'regularmm',
        }, {
          name: '登录遇到问题',
          key: '6',
          url: 'loginlog',
        }]
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(to,"------------to")
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath){
        this.initindex = key;
//        this.$router.push({ path: '/'+key})
      },
      repTest(str, txt){
        let re =txt.split("/")
        if(re.length<2){
          re = txt
        }else{
          re = re[1]
        }
        let start = new RegExp(re).test(str);
        return start
      }
    },
    beforeMount(){
      this.initnav = this.$route.path.split("/")[1]
      this.initindex = this.$route.path
    },
    mounted(){
      console.log(this)
    }
  }
</script>
