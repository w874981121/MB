<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
               background-color="#545c64" text-color="#fff" :unique-opened="true" active-text-color="#ffd04b">
        <template v-for="(i, index) in navlistData">
          <el-submenu v-if="i.list" :index="indexergeM(index,index)" :key="i.key">
            <template slot="title">
              <i class="el-icon-caret-right"></i>
              <span>{{i.name}}</span>
            </template>
            <el-menu-item-group v-for="(f, len) in i.list" :key="f.key">
              <el-menu-item :index="f.url">{{f.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item :index="i.url" v-if="i.url">
            <!--<i class="el-icon-setting"></i>-->
            <span slot="title">{{i.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
  .tac {
    width: 400px;
    height: 100%;
  }

  .el-menu-vertical-demo {
    height: 100%;
  }
</style>


<script>
  export default {
    name: 'NavList',
    data() {
      return {
        uniqueOpened: true,
        navlistData: [{
          name: '账号管理',
          key: '0',
          list: [{
            name: '网站账号管理',
            key: '00',
            url: 'fioas',
          }, {
            name: '角色权限管理',
            key: '01',
            url: 'glk',
          }]
        }, {
          name: '网站管理',
          key: '1',
          list: [{
            name: '论坛管理',
            key: '10',
            url: 'sadl',
          }, {
            name: '企业公告',
            key: '11',
            url: 'fliasj',
          }, {
            name: '专家讲堂',
            key: '12',
            url: 'lhls',
          }]
        }, {
          name: 'VIP医生管理',
          key: '2',
          url: 'ad',
        }, {
          name: '医生管理',
          key: '3',
          url: 'asd',
        }, {
          name: 'VIP会员管理',
          key: '4',
          list: [{
            name: 'VIP信息',
            key: '40',
            url: 'fioas',
          }, {
            name: '健康记录',
            key: '41',
            url: 'glk',
          }, {
            name: '异常报告',
            key: '42',
            url: 'glk',
          }, {
            name: '远程订单',
            key: '43',
            url: 'glk',
          }, {
            name: '数据统计',
            key: '44',
            url: 'glk',
          }]
        }, {
          name: '普通会员管理',
          key: '5',
          url: 'gfdfd',
        }, {
          name: '登录遇到问题',
          key: '6',
          url: 'gfdjks',
        }]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      indexergeM(i, d){
        return i + "-" + d
      }
    }
  }
</script>
