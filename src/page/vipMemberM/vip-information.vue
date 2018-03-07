<!--vip信息-->

<template>
  <div class="vip-information">
    <Search :searchData="searchData" @response="onSubmit"></Search>
    <DataTable :dataTable="tableData" @modify="postModify" @healthy="seeHealthy"></DataTable>
    <el-pagination background layout="prev, pager, next" :page-size="pageSize" @current-change="getPage" :total="total"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from '../../components/Search.vue'
  import DataTable from '../../components/DataTableImg.vue'
  import qs from 'qs';
  export default {
    name: 'vip-information',
    data() {
      return {
        searchData: {
          path: '/vipi/newvipinformation',
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
            {field: 'photoUrl', name: '头像', width: '100'},
            {field: 'customerName', name: '姓名'},
            {field: 'phone', name: '手机号'},
            {field: 'loginName', name: '账号',},
            {field: 'status', name: '状态',},
          ],  //设置排列顺序
          soleCode:true,
          healthy:true,
          data:[],
        }
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        let _this = this;
        this.$axios.get('/api/back/customers/vip', { params: this.webSitedata}).then((response)=> {
          let datelist = response.data.data.list;
          datelist.forEach(function(item,i){
            datelist[i].customerName = unescape(item.customerName);
            datelist[i].status = item.status == 0 ? "未禁用" : "禁用";
            datelist[i].photoUrl = _this.$api + "/images/" + item.photoUrl;
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
        this.webSitedata.customer = tabletext
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
        this.$router.push({path: "/vipi/revisevipinformation", query: {customerId: row.customerId}})
      },
      //健康记录查看
      seeHealthy(row){
        this.$router.push({path: "/healthr", query: {companyId: row.companyId, customerName:row.customerName}})
      }
    },
    components: {
      Search,
      DataTable

    }
  }
</script>

<style lang="scss">

</style>
