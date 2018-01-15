<!--		角色权限管理    -->


<template>
  <div class="m20">
    <template v-if="startview">
      <h4>选择公司</h4>
      <router-link class="db mt10 fsz14" v-for="(i, index) in company_list" :key="index"
                   :to="{ path: '', query: { plan: i.parameter }}">{{i.name}}
      </router-link>
    </template>

    <template v-else-if="startview">
      <router-view/>
    </template>
  </div>
</template>

<script>
  export default{
    name: '',
    data(){
      return {
        startview: true,
        company_list: [
          {
            name: '精益天成医疗科技有限公司',
            parameter: '132467689',
          }, {
            name: '和偕健康医疗有限公司',
            parameter: '797987736',
          }, {
            name: '北京大爱惠民医疗科技有限公司',
            parameter: '35412',
          },
        ]
      }
    }
  }
</script>

<style>
</style>
