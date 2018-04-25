<!--网站账号管理-->

<template>
  <div class="website-mccount-management m20">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/roleam' }">角色权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="searchBox">
      <el-form :inline="true" class="demo-form-inline mt10">
        <el-button class="fl ml10 mb18" type="primary" @click="newAccount">新建账号</el-button>
      </el-form>
    </div>
    <DataTable :dataTable="tableData" @modify="postModify" @delete="postDelete"></DataTable>
    <el-pagination background layout="total, prev, pager, next" @current-change="getPage" :total="total"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import DataTable from '../../components/DataTable.vue'
  export default {
    name: 'website-mccount-management',
    data() {
      return {
        total:0,
        pageSize:20,
        parentUsersId: this.$route.query.usersid,
        currentPage: 1,
        truename: this.cookieFn.get("truename"),
        tableData: {
          listname:[
//            {field:'usersid',name:'编号',width:'200'},
            {field:'truename',name:'姓名',width:'200'},
            {field:'username',name:'账号',width:'200'},
            {field:'password',name:'密码',width:'200'},
            {field:'lockState',name:'是否禁用'},
            {field:'registerDate',name:'添加时间', width: '90'},
          ],  //设置排列顺序
          data:[]
        }
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        let _this = this;
        let data = {
          currentPage:this.currentPage,  //页码
          users:this.parentUsersId       //公司id
        }
        this.$axios.get('/api/back/users/role', { params: data}).then((response)=> {
          console.log(response)
        let datelist = response.data.data.list;
        datelist.forEach(function(item,i){
          datelist[i].registerDate = _this.$timeonversionC(item.registerDate);
          datelist[i].truename = unescape(item.truename);
          datelist[i].lockState = item.lockState == 0 ? "未禁用" : "已禁用";
        })
        this.tableData.data = datelist;
        this.total = response.data.data.total;
        this.pageSize = Number(response.data.data.pageSize);
        }).catch(function (error) {
          console.log(error);
        })
      },
      //翻页请求
      getPage(a){
        this.webSitedata.currentPage = a;
        this.getData();
      },
      //接收table ---  操作栏回传id
      postModify(id){
        //传递 用户(usersid)id 公司(parentUsersId)id
        this.$router.push({path: "/roleam/reviseadministrator", query: {usersid: id.usersid,parentUsersId: this.parentUsersId}})
      },
      //跳转新建页
      newAccount(){
        this.$router.push({path: "/roleam/newadministrator", query: {parentUsersId: this.parentUsersId}})
      },
      //删除
      postDelete(row){
        console.log(row.usersid)
        this.$confirm('确认删除角色账号？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/users/delete', {usersId: row.usersid})
            .then((response) => {

              if(response.data.errcode === 30015){
              this.$message({
                type: 'info',
                message: '当前登录账号不可删除！',
               });
                  return
              }

            this.$message({
              type: 'success',
              message: '删除成功！',
            });
            this.getData();
          }).catch(function (error) {
            console.log(error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
    },
    components: {
      DataTable
    }
  }
</script>

<style lang="scss">
  .tableCss {
    box-sizing: border-box;
    padding: 20px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
