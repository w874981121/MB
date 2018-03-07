<!--导航组件-->
<template>
  <el-row>
    <el-col :span="12">
      <el-menu :router="true" :default-active="initnav" class="el-menu-vertical-demo" @select="handleSelect"
               @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff"
               :unique-opened="true" active-text-color="#ffd04b">
        <template v-for="(i, index) in navlistData">
          <el-submenu v-if="i.list && i.state" :index="i.url" :key="i.key">
            <template slot="title">
              <!--<i class="el-icon-caret-right"></i>-->
              <span slot="title" :style="{'color': repTest(i.url, initindex) ? '#ffd04b' : '#fff'}">{{i.name}}</span>
            </template>
            <el-menu-item v-if="f.state" v-for="(f, len) in i.list" :key="f.key" :index="f.url">
              {{f.name}}
            </el-menu-item>
          </el-submenu>

          <el-menu-item :index="i.url" v-if="!i.list && i.state">
            <!--<i class="el-icon-setting"></i>-->
            <span slot="title">{{i.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
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
          state: false,
          list: [{
            name: '网站账号管理',
            key: '00',
            url: 'websitemm',
            state: false,
          }, {
            name: '角色权限管理',
            key: '01',
            url: 'roleam',
            state: false,
          }]
        }, {
          name: '网站管理',
          key: '1',
          url: 'open-forumm-enterprisa-expertlh',//
          state: false,
          list: [{
            name: '网站信息',
            key: '10',
            url: 'webaccount',
            state: false,
          }, {
            name: '论坛管理',
            key: '11',
            url: 'forumm',
            state: false,
          }, {
            name: '企业公告',
            key: '12',
            url: 'enterprisa',
            state: false,
          }, {
            name: '专家讲堂',
            key: '13',
            url: 'expertlh',
            state: false,
          }]
        }, {
          name: 'VIP医生管理',
          key: '2',
          url: 'vipdm',
          state: false,
        }, {
          name: '普通医生管理',
          key: '3',
          url: 'doctorm',
          state: false,
        }, {
          name: 'VIP会员管理',
          key: '4',
          url: 'open-vipi-healthr-abnormalr-remoteo-datas',
          state: false,
          list: [{
            name: 'VIP信息',
            key: '40',
            url: 'vipi',
            state: false,
          }, {
            name: '健康记录',
            key: '41',
            url: 'healthr',
            state: false,
          }, {
            name: '异常报告',
            key: '42',
            url: 'abnormalr',
            state: false,
          }, {
            name: '远程订单',
            key: '43',
            url: 'remoteo',
            state: false,
          }, {
            name: '数据统计',
            key: '44',
            url: 'chart',
            state: false,
          }]
        }, {
          name: '普通会员管理',
          key: '5',
          url: 'regularmm',
          state: false,
        }, {
          name: '登录遇到问题',
          key: '6',
          url: 'loginlog',
          state: false,
        }]
      }
    },
    watch: {
      "$route"(to, form){
        this.initnav = to.path.split("/")[1];
        this.initindex = to.path.split("/")[1];
      },
    },
    methods: {
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      handleSelect(key, keyPath){
        this.initindex = key;
      },
      repTest(str, txt){

        console.log(str, txt)

        let re = txt.split("/")
        if (re.length < 2) {
          re = txt
        } else {
          re = re[1]
        }
        let start = new RegExp(re).test(str);
        return start
      },
      getPurview(){
        let navlistData = this.navlistData

        //全部显示
        const setState = ()=> {
          navlistData.forEach((item, i)=> {
            item.state = true
            if (!!item.list) {
              item.list.forEach((o, f)=> {
                o.state = true
              })
            }
          })
        }
        if (this.cookieFn.get("type") == 0) {  //类型为0 全部显示
          setState();
        } else if (this.cookieFn.get("type") == 1) {   //类型为1 关闭网站账号管理
          setState();
          navlistData[0].list[0].state = false;
        } else {
          this.$axios.get('/api/back/purview/' + this.cookieFn.get("usersid")).then((response)=> {
            console.log(response)
            let data = response.data.data;
            data.forEach(function (obj, n) {
              navlistData.forEach(function (item, i) {
                if (item.name == obj.purviewname) {
                  navlistData[i].state = true;
                } else {
                  if (item.list !== undefined) {
                    item.list.forEach((tem, index) => {
                      console.log(tem.name)
                      if (tem.name == obj.purviewname) {
                        navlistData[i].list[index].state = true;
                        navlistData[i].state = true;
                      }
                    })
                  }
                }


//                if (item.hasOwnProperty('state')) {
//                  if (item.name == obj.purviewname) {
//                    navlistData[i].state = true;
//                  }
//                } else {
//                  item.list.forEach((tem, index) => {
//                    if (tem.hasOwnProperty('state') && tem.name == obj.purviewname) {
//                      if (tem.name == obj.purviewname) {
//                        navlistData[i].list[index].state = true;
//                        navlistData[i].state = true;
//                      }
//                    }
//                  })
//                }
              })
            })
          }).catch(function (error) {
            console.log(error);
          });
        }


      },
    },
    beforeMount(){
      this.getPurview();
      this.initnav = this.$route.path.split("/")[1]
      this.initindex = this.$route.path
    },
    mounted(){
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
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
