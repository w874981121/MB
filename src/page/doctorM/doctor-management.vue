<!--医生管理-->

<template>
  <div class="website-mccount-management">
    <Search :searchData="searchData" @response="onSubmit"></Search>
    <DataTable :dataTable="tableData" @modify="postModify" @delete="postDelete"></DataTable>
    <img src="" alt="">
    <el-pagination background layout="total, prev, pager, next" :page-size="pageSize" @current-change="getPage" :total="total"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from '../../components/Search.vue'
  import DataTable from '../../components/DataTableImg.vue'
  export default {
    name: 'doctor-management',
    data() {
      return {
        searchData: {
          path: '/doctorm/newdoctormanagement',
          url: '',
          placeholder: '输入姓名',
        },
        total: 0,
        pageSize:0,
        webSitedata:{
          currentPage: 1,
          customer:''
        },
        //传递给table的数据
        tableData: {
          listname: [
//            {field: 'customerId', name: '编号', width: '50'},
            {field: 'creatDate', name: '创建时间', width: '100'},
            {field: 'photoUrl', name: '头像', width: '100'},
            {field: 'customerName', name: '姓名'},
            {field: 'phone', name: '手机号'},
            {field: 'hospital', name: '医院',},
            {field: 'department', name: '科室',},
            {field: 'title', name: '职称',},
            {field: 'loginName', name: '账号',},
            {field: 'status', name: '是否禁用',},
          ],  //设置排列顺序
          data: []
        }
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      getData(){
        let _this = this;
        this.$axios.get('/api/back/doctor', { params: this.webSitedata}).then((response)=> {
          let datelist = response.data.data.list;
          datelist.forEach(function(item,i){
            datelist[i].customerName = unescape(item.customerName);
            datelist[i].creatDate = _this.$timeonversionC(item.creatDate);
            datelist[i].hospital = unescape(item.hospital);
            datelist[i].department = unescape(item.department);
            datelist[i].title = unescape(item.title);
            datelist[i].status = item.status == 0 ? "未禁用" : "禁用";
            datelist[i].photoUrl = !!item.photoUrl ? _this.$api + "/images/" + item.photoUrl : _this.$api +'/images/customerPhoto/20180424/2018042422430000147261.png';
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
        this.webSitedata.customer = tabletext;
        this.getData()
      },
      //翻页请求
      getPage(a){
        this.webSitedata.currentPage = a;
        this.getData();
      },
      postDelete(row){
        console.log(row.usersid)
        this.$confirm('确认删除医生账号？', '提示', {
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
      postModify(row){
        console.log(row.customerId)
        this.$router.push({path: "/doctorm/revisedoctormanagement", query: {customerId: row.customerId}})
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
