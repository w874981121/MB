import Vue from 'vue'
import Router from 'vue-router'

import Contentbox from '@/page/content.vue'
import Login from '@/page/login.vue'

//账户管理
import Websitemccountmanagement from '@/page/accountM/website-mccount-management'  //网站查询列表
import Reviseaccount from '@/page/accountM/revise-account'   //修改
import Newaccount from '@/page/accountM/new-account'         //新建账户
import Roleauthoritymanagement from '@/page/accountM/role-authority-management'
import Roleauthoritylist from '@/page/accountM/role-authority-list'
import Newadministrator from '@/page/accountM/new-administrator'
import Reviseadministrator from '@/page/accountM/revise-administrator'

//网站管理
import Forummanagement from '@/page/websiteM/forum-management'
import Webaccount from '@/page/websiteM/web-account'

import Enterprisannouncement from '@/page/websiteM/enterpris-announcement'
import Expertlecturehall from '@/page/websiteM/expert-lecture-hall'
import Newannouncement from '@/page/websiteM/new-announcement'
import Newexpertlecturehall from '@/page/websiteM/new-expert-lecture-hall'
import Reviseexpertlecturehall from '@/page/websiteM/revise-expert-lecture-hall'
import Comment from '@/page/websiteM/comment'
import Reviseannouncement from '@/page/websiteM/revise-announcement.vue'




//vip 医生管理

import Vipdoctormanagement from '@/page/vipDoctorM/vip-doctor-management'
import Newdoctorinformation from '@/page/vipDoctorM/new-doctor-information'
import Revisedoctorinformmation from '@/page/vipDoctorM/revise-doctor-informmation'


//医生管理
import Doctormanagement from '@/page/doctorM/doctor-management'
import Revisedoctormanagement from '@/page/doctorM/revise-doctor-management'
import Newdoctormanagement from '@/page/doctorM/new-doctor-management'


//vip会员管理
import Vipinformation from '@/page/vipMemberM/vip-information'
import Newvipinformation from '@/page/vipMemberM/new-vip-regular-member-management'
import Revisevipinformation from '@/page/vipMemberM/revise-vip-regular-member-management'

import Healthrecords from '@/page/vipMemberM/health-records'
import Abnormalreport from '@/page/vipMemberM/abnormal-report'
import Remoteorder from '@/page/vipMemberM/remote-order'
import Datastatistics from '@/page/vipMemberM/data-statistics'




//普通会员管理
import Regularmembermanagement from '@/page/regularmemberM/regular-member-management'
import Newregularmembermanagement from '@/page/regularmemberM/new-regular-member-management'
import Reviseregularmembermanagement from '@/page/regularmemberM/revise-regular-member-management'


import Loginlog from '@/page/login-log'


Vue.use(Router)

 const routes = [
    {
      path: '/', redirect: '/login'
    },{
      path: '/login',
      name: '登陆',
      component: Login,
    }, {
      path: '/contentbox',
      redirect: '/websitemm',
      name: '管理平台入口',
      meta: {
        requireAuth: true,
      },
      component: Contentbox,
      children: [{
        path: '/websitemm',
        name: '网站账号管理',
        meta: {
          requireAuth: true,
        },
        component: Websitemccountmanagement,
      }, {
        path: '/websitemm/newaccount',
        name: '新建账户',
        meta: {
          requireAuth: true,
        },
        component: Newaccount,
      }, {
        path: '/websitemm/reviseaccount',
        name: '修改账户',
        meta: {
          requireAuth: true,
        },
        component: Reviseaccount,
      },{
        path: '/roleam',
        name: '角色权限管理',
        meta: {
          requireAuth: true,
        },
        component: Roleauthoritymanagement,
      }, {
        path: '/roleam/roleamlist',
        name: '角色权限管理表',
        meta: {
          requireAuth: true,
        },
        component: Roleauthoritylist,
      }, {
        path: '/roleam/newadministrator',
        name: '新建管理',
        meta: {
          requireAuth: true,
        },
        component: Newadministrator,
      },{
        path: '/roleam/reviseadministrator',
        name: '修改管理员',
        meta: {
          requireAuth: true,
        },
        component: Reviseadministrator,
      }, {
        path: '/webaccount',
        name: '网站账号',
        meta: {
          requireAuth: true,
        },
        component: Webaccount
      }, {
        path: '/forumm',
        name: '论坛管理',
        meta: {
          requireAuth: true,
        },
        component: Forummanagement  //
      }, {
        path: '/forumm/comment',
        name: '评论',
        meta: {
          requireAuth: true,
        },
        component: Comment
      }, {
        path: '/enterprisa',
        name: '企业公告',
        meta: {
          requireAuth: true,
        },
        component: Enterprisannouncement   //
      }, {
        path: '/enterprisa/newannouncement',
        name: '新建公告',
        meta: {
          requireAuth: true,
        },
        component: Newannouncement
      },{
        path: '/enterprisa/reviseannouncement',
        name: '修改公告',
        meta: {
          requireAuth: true,
        },
        component: Reviseannouncement
      },{
        path: '/expertlh',
        name: '专家讲堂',
        meta: {
          requireAuth: true,
        },
        component: Expertlecturehall
      },{
        path: '/expertlh/newexpertlecturehall',
        name: '专家讲堂-上传视频',
        meta: {
          requireAuth: true,
        },
        component: Newexpertlecturehall
      }, {
        path: '/expertlh/reviseexpertlecturehall',
        name: '专家讲堂-修改视频',
        meta: {
          requireAuth: true,
        },
        component: Reviseexpertlecturehall
      },{
        path: '/vipdm',
        name: 'VIP医生管理',
        meta: {
          requireAuth: true,
        },
        component: Vipdoctormanagement
      }, {
        path: '/vipdm/newdoctorinformation',
        name: '新建VIP医生',
        meta: {
          requireAuth: true,
        },
        component: Newdoctorinformation
      }, {
        path: '/vipdm/revisedoctorinformmation',
        name: '修改VIP医生',
        meta: {
          requireAuth: true,
        },
        component: Revisedoctorinformmation
      }, {
        path: '/doctorm',
        name: '医生管理',
        meta: {
          requireAuth: true,
        },
        component: Doctormanagement //
      }, {
        path: '/doctorm/newdoctormanagement',
        name: '新建VIP信息',
        meta: {
          requireAuth: true,
        },
        component: Newdoctormanagement
      }, {
        path: '/doctorm/Revisedoctormanagement',
        name: '修改VIP信息',
        meta: {
          requireAuth: true,
        },
        component: Revisedoctormanagement
      }, {
        path: '/vipi',
        name: 'VIP信息',
        meta: {
          requireAuth: true,
        },
        component: Vipinformation
      }, {
        path: '/vipi/newvipinformation',
        name: '新建vip会员',
        meta: {
          requireAuth: true,
        },
        component: Newvipinformation
      },{
        path: '/vipi/revisevipinformation',
        name: '修改vip会员',
        meta: {
          requireAuth: true,
        },
        component: Revisevipinformation
      }, {
        path: '/healthr',
        name: '健康记录',
        meta: {
          requireAuth: true,
        },
        component: Healthrecords
      }, {
        path: '/abnormalr',
        name: '异常报告',
        meta: {
          requireAuth: true,
        },
        component: Abnormalreport
      }, {
        path: '/remoteo',
        name: '远程订单',
        meta: {
          requireAuth: true,
        },
        component: Remoteorder
      }, {
        path: '/datas',
        name: '数据统计',
        meta: {
          requireAuth: true,
        },
        component: Datastatistics
      }, {
        path: '/regularmm',
        name: '普通会员管理',
        meta: {
          requireAuth: true,
        },
        component: Regularmembermanagement
      },{
        path: '/regularmm/newregularmembermanagement',
        name: '新建普通会员管理',
        meta: {
          requireAuth: true,
        },
        component: Newregularmembermanagement
      },{
        path: '/regularmm/reviseregularmembermanagement',
        name: '修改普通会员管理',
        meta: {
          requireAuth: true,
        },
        component: Reviseregularmembermanagement
      }, {
        path: '/loginlog',
        name: '登录遇到问题',
        meta: {
          requireAuth: true,
        },
        component: Loginlog
      }]
    }]

//路径配置项    设置为固定量，在main文件引入注入全局
export const router = new Router({  mode: 'history',routes })

router.beforeEach((to, from, next) => {
  let instart = to.path.split("/")
  if (to.name == null) {
    next({path: "/" + instart[instart.length - 1]})
  }
  next()
})
