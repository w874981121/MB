<!--网站账号管理-->

<template>
  <div class="website-mccount-management">
    <Search :searchData="searchData" @response="onSubmit"></Search>
    <DataTable :dataTable="tableData" @modify="postModify" @delete="postDelete"></DataTable>
    <el-pagination background layout="total, prev, pager, next" :page-size="pageSize" @current-change="getPage"
                   :total="total"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from '../../components/Search.vue'
  import DataTable from '../../components/DataTable.vue'
  import qs from 'qs';
  export default {
    name: 'website-mccount-management',
    data() {
      return {
        searchData: {
          path: '/websitemm/newaccount',
          name: '',
          placeholder: '输入公司名称'
        },
        total: 0,
        pageSize: 0,
        webSitedata: {
          currentPage: 1,
          name: ''
        },
        //传递给table的数据
        tableData: {
          listname: [
//            {field: 'usersid', name: '编号', width: '50'},
            {field: 'registerDate', name: '创建时间', width: '90'},
            {field: 'truename', name: '公司名称'},
            {field: 'weburl', name: '网站地址'},
//            {field: 'username', name: '账号'},
//            {field: 'password', name: '初始密码',},
            {field: 'linkName', name: '联系人',},
            {field: 'lockState', name: '状态',},
            {field: 'phone', name: '联系人手机号',},
          ],  //设置排列顺序
          data: [],
        }
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        let _this = this;
        this.$axios.get('/api/back/users/webSite', {params: this.webSitedata}).then((response)=> {
          let datelist = response.data.data.list;
          datelist.forEach(function (item, i) {
            datelist[i].registerDate = _this.$timeonversionC(item.registerDate);
            datelist[i].truename = decodeURIComponent(item.truename);
            datelist[i].linkName = decodeURIComponent(item.linkName);
            datelist[i].lockState = item.lockState == 0 ? "未禁用" : "已禁用";
          })
          this.tableData.data = datelist;
          this.total = response.data.data.total;
          this.pageSize = Number(response.data.data.pageSize);
          this.webSitedata.currentPage = response.data.data.pageNum;
        }).catch(function (error) {
          console.log(error);
        })
      },
      //接受seach 查询参数
      onSubmit(tabletext) {
        this.webSitedata.name = tabletext;
        this.getData();
      },
      //翻页请求
      getPage(a){
        console.log(a)
        this.webSitedata.currentPage = a;
        this.getData();
      },
      //接收操作栏回传id//修改
      postModify(row){
        this.$router.push({path: "/websitemm/reviseaccount", query: {usersid: row.usersid}})
      },
      postDelete(row){
        this.$confirm('确认删除网站账号？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/users/delete', {usersId: row.usersid})
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
