import Vue from 'vue'
import Router from 'vue-router'

import Contentbox from '@/page/content.vue'
import Login from '@/page/login.vue'

//账户管理
import AccountM from '@/page/accountM/index'
import Websitemccountmanagement from '@/page/accountM/website-mccount-management'
import Newaccount from '@/page/accountM/new-account'



import Roleauthoritymanagement from '@/page/role-authority-management'
import Vipdoctormanagement from '@/page/vip-doctor-management'
import Doctormanagement from '@/page/doctor-management'
import Generalmembermanagement from '@/page/general-member-management'
import Loginlog from '@/page/login-log'
import Forummanagement from '@/page/forum-management'
import Enterprisannouncement from '@/page/enterpris-announcement'
import Expertlecturehall from '@/page/expert-lecture-hall'
import Vipinformation from '@/page/vip-information'
import Healthrecords from '@/page/health-records'
import Abnormalreport from '@/page/abnormal-report'
import Remoteorder from '@/page/remote-order'
import Datastatistics from '@/page/data-statistics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: '/login'
    },{
      path: '/login',
      name: '登陆',
      component: Login,
    },{
      path: '/contentbox',
      name: '管理平台入口',
      component: Contentbox,
      children:[{
        path: '/AccountM',
        name: '网站账户管理',
        component: AccountM,
        children:[{
          path: '/websitemm',
          name: '新建账户',
          component: Websitemccountmanagement,
        },{
          path: '/newaccount',
          name: 'newaccount',
          component: Newaccount,
        }]
      }]
    },

    //
    // {
    //   path: '/websitemm',
    //   name: 'Websitemccountmanagement',    //网站账户管理
    //   component: Websitemccountmanagement,
    //   children:[{
    //     path: '/newaccount', //新建账户
    //     component: Newaccount,
    //   }]
    // },{
    //   path: '/roleam',
    //   name: 'Roleauthoritymanagement',    //角色权限管理
    //   component: Roleauthoritymanagement
    // }, {
    //   path: '/forumm',
    //   name: 'Forummanagement',   //论坛管理
    //   component: Forummanagement
    // }, {
    //   path: '/enterprisa',
    //   name: 'Enterprisannouncement', //企业公告
    //   component: Enterprisannouncement
    // }, {
    //   path: '/expertlh',
    //   name: 'Expertlecturehall',   //专家讲堂
    //   component: Expertlecturehall
    // }, {
    //   path: '/vipdm',
    //   name: 'Vipdoctormanagement',    //VIP医生管理
    //   component: Vipdoctormanagement
    // }, {
    //   path: '/doctorm',
    //   name: 'Doctormanagement',    //医生管理
    //   component: Doctormanagement
    // }, {
    //   path: '/vipi',
    //   name: 'Vipinformation',   //VIP信息
    //   component: Vipinformation
    // }, {
    //   path: '/healthr',
    //   name: 'Healthrecords',    //健康记录
    //   component: Healthrecords
    // }, {
    //   path: '/abnormalr',
    //   name: 'Abnormalreport',    //异常报告
    //   component: Abnormalreport
    // }, {
    //   path: '/remoteo',
    //   name: 'Remoteorder',    //远程订单
    //   component: Remoteorder
    // }, {
    //   path: '/datas',
    //   name: 'Datastatistics',    //数据统计
    //   component: Datastatistics
    // }, {
    //   path: '/generalmm',
    //   name: 'Generalmembermanagement',    //普通会员管理
    //   component: Generalmembermanagement
    // }, {
    //   path: '/loginlog',
    //   name: 'Loginlog',    //登录遇到问题
    //   component: Loginlog
    // }
  ]
})
