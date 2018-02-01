<!--		角色权限管理    -->


<template>
  <div class="m20">
    <template v-if="startview">
      <h4>选择公司</h4>
      <router-link class="db mt10 fsz14" v-for="(i, index) in company_list" :key="index"
                   :to="{ path: '/roleam/roleamlist', query: { usersid: i.usersid }}">{{i.truename}}
      </router-link>
    </template>

    <template v-else-if="startview">
      <router-view/>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: '',
    data(){
      return {
        startview: true,
        company_list: []
      }
    },
    mounted(){
      this.getData();
    },
    methods:{
      getData(){
        let _this = this;
        this.$axios.get('/api/back/users/webSite', { params:{currentPage:1}}).then((response)=> {
          console.log(response)
          let datelist = response.data.data.list;
          datelist.forEach(function(item,i){
            _this.company_list.push({
              truename:unescape(item.truename),
              usersid:item.usersid
            })
          })
        }).catch(function (error) {
          console.log(error);
        })
      },
    },
  }
</script>

<style>
</style>
