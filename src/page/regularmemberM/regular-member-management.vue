<!--普通会员管理-->

<template>
  <div class="website-mccount-management">
    <Search :searchData="searchData" @response="onSubmit"></Search>
    <DataTable :dataTable="tableData" @modify="postModify"  @delete="postDelete"></DataTable>
    <el-pagination background layout="total, prev, pager, next" :page-size="pageSize" @current-change="getPage" :total="total"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from '../../components/Search.vue'
  import DataTable from '../../components/DataTableImg.vue'
  export default {
    name: 'regular-member-management',
    data() {
      return {
        searchData: {
          path: '/regularmm/newregularmembermanagement',
          name:'',
          placeholder:'输入姓名'
        },
        total: 0,
        pageSize: 0,
        webSitedata:{
          currentPage: 1,
          customer:''
        },
        //传递给table的数据
        tableData: {
          listname: [
            {field: 'customerId', name: '编号', width: '50'},
            {field: 'creatDate', name: '创建时间', width: '90'},
            {field: 'photoUrl', name: '头像', width: '100'},
            {field: 'customerName', name: '姓名'},
            {field: 'phone', name: '手机号'},
            {field: 'loginName', name: '账号'},
//            {field: 'passWord', name: '密码',},
            {field: 'status', name: '状态',},
          ],  //设置排列顺序
          data: []
        }
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        let _this = this;
        this.$axios.get('/api/back/customers', { params:this.webSitedata}).then((response)=> {
          console.log(response,"-------")
          let datelist = response.data.data.list;
          datelist.forEach(function(item,i){
            datelist[i].creatDate = _this.$timeonversionC(item.creatDate);
            datelist[i].customerName = unescape(item.customerName);
            datelist[i].status = item.status == 0 ? "未禁用" : "禁用";
            datelist[i].photoUrl = _this.$api + "/images/" + item.photoUrl;
          })
          this.tableData.data = datelist;
          this.total = response.data.data.total;
          this.pageSize = Number(response.data.data.pageSize);
          this.webSitedata.currentPage = response.data.data.pageNum;
        console.log(this.tableData.data)

        }).catch(function (error) {
          console.log(error);
        })
      },
      //接受seach 查询参数
      onSubmit(tabletext) {
        this.webSitedata.customer = tabletext
        this.getData()
      },
      //翻页请求
      getPage(a){
        this.webSitedata.currentPage = a;
        this.getData();
      },
      postDelete(row){
        console.log(row.usersid)
        this.$confirm('确认删除用户账号？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/customer/delete', {customerId: row.customerId})
            .then((response) => {
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
      //接收操作栏回传id
      postModify(rom){
        console.log(rom.customerId)
        this.$router.push({path: "/regularmm/reviseregularmembermanagement", query: {customerId: rom.customerId}})
      }
    },
    components: {
      Search,
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
