<!--		角色权限管理    -->
<template>
  <div class="m20">
    <template v-if="startview">
      <h4>选择公司</h4>
      <div class="searchBox">
        <el-form :inline="true" class="demo-form-inline mt10">
          <el-form-item class="fr">
            <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item label="公司名称：" class="fr">
            <el-input v-model="name" :placeholder="placeholder"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="tableCss">
        <el-table :data="company_list" height="400" border stripe style="width: 100%">
          <template>
            <el-table-column align="center" prop="registerDate" label="创建时间" width="180"></el-table-column>
            </template>

          <template>
            <el-table-column align="center" prop="truename" label="公司名称">
              <template slot-scope="scope" >
                <router-link class="db mt10 fsz14"
                             :to="{ path: '/roleam/roleamlist', query: { usersid: scope.row.usersid }}">{{scope.row.truename}}
                </router-link>
              </template>
            </el-table-column>
          </template>


        </el-table>
      </div>
      <el-pagination style="padding-left: 0;margin-top: 10px" background layout="total, prev, pager, next" :page-size="pageSize" @current-change="getPage"
                     :total="total"></el-pagination>
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
        name:'',
        placeholder:'',
        pageSize:1,
        total:1,
        currentPage: 1,
        startview: true,
        company_list: [],
      }
    },
    mounted(){
      if(this.cookieFn.get("type") == 1){
        this.$router.push({path: "/roleam/roleamlist", query: {usersid: this.cookieFn.get("usersid")}})
        return
      }
      this.getData();
    },
    methods:{
      getData(){
        let _this = this;
        this.$axios.get('/api/back/users/webSite', { params:{name: this.name,currentPage:this.currentPage}}).then((response)=> {
          console.log(response)

          _this.company_list = [];
          _this.pageSize = response.data.data.pageSize;
          _this.total = response.data.data.total;
          let datelist = response.data.data.list;
          datelist.forEach(function(item,i){
            _this.company_list.push({
              registerDate: _this.$timeonversionC(item.registerDate),
              truename:unescape(item.truename),
              usersid:item.usersid
            })
          })
        }).catch(function (error) {
          console.log(error);
        })
      },
      onSubmit(){
        this.currentPage = 1;
        this.getData();
      },
      //翻页请求
      getPage(a){
        console.log(a)
        this.currentPage = a;
        this.company_list = [];
        this.getData();
      },
    },
  }
</script>

<style>
</style>
