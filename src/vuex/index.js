/**
 * Created wangyanqi
 * Date 2018/1/21
 * GitHub w874981121 ——小小疯
 */
'use strict';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const state = {
  username: '',
  truename: '',
  type: ''
}

export const mutations = {
  //设置   用户名
  set_username (state, name) {
    state.username = name;
  },
  //删除   用户名
  delete_username (state){
    state.username = '';
  },
  //设置   用户角色
  set_truename (state, name){
    state.truename = name;
  },
  //删除  用户角色信息
  delete_truename (state){
    state.truename = '';
  },
  //设置   用户类型
  set_type (state, name){
    state.type = name;
  },
  //删除  用户类型
  delete_type (state){
    state.type = '';
  },


}

export const actions = {
  //登录
  signIn (context, text) {
    context.commit('set_username',text.username)
    context.commit('set_truename',text.truename)
    context.commit('set_type',text.type)
  },
  signOut (context){
    context.commit('delete_username')
    context.commit('delete_truename')
    context.commit('delete_type')
  }

}


export default new Vuex.Store({
  state,
  mutations,
  actions
})
