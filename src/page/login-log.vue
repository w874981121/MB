<!--登陆遇到问题-->
<template>
  <div class="login_log m20">
    <!--查询-->
    <el-form :inline="true" class="demo-form-inline searchBox">
      <el-form-item class="fr">
        <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item class="fr">
        <el-input v-model="seach_text" placeholder="输入手机号/姓名"></el-input>
      </el-form-item>
    </el-form>
    <!--&lt;!&ndash;table列表&ndash;&gt;-->
    <!--<el-table class="mt30" :data="tableData.data" height="400" border stripe style="width: 100%" :row-class-name="tableRowClassName">-->
      <!--<el-table-column align="center" prop="questionId" label="编号"></el-table-column>-->
      <!--<el-table-column align="center" prop="creatDate" label=报告" width="90"></el-table-column>-->
      <!--&lt;!&ndash;<el-table-column align="center" prop="customerName" label="姓名">&ndash;&gt;-->
        <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;0 普通  1 VIP&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;<router-link v-if="scope.row.type == 0" :to="{ path: '/regularmm/reviseregularmembermanagement', query: { customerId: scope.row.customerId}}">&ndash;&gt;-->
            <!--&lt;!&ndash;{{scope.row.customerName}}&ndash;&gt;-->
          <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
          <!--&lt;!&ndash;<router-link v-if="scope.row.type == 1" :to="{ path: '/vipi', query: { customerId: scope.row.customerId}}">&ndash;&gt;-->
            <!--&lt;!&ndash;{{scope.row.customerName}}&ndash;&gt;-->
          <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
      <!--<el-table-column align="center" prop="title" label="手机号"></el-table-column>-->
      <!--<el-table-column align="center" prop="count" label="账号"></el-table-column>-->
      <!--<el-table-column align="center" prop="count" label="密码"></el-table-column>-->
      <!--<el-table-column align="center" prop="count" label="报告内容"></el-table-column>-->

    <!--翻页-->
    <el-pagination background layout="prev, pager, next" :page-size="pageSize" @current-change="getPage" :total="total"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'login_log',
    data(){
      return{
        seach_text: '',
        total: 0,
        pageSize: 0,
        webSitedata:{
//          currentPage: 1,
//          usersname:'',
//          question:'',
        },
        //传递给table的数据
        tableData: {
          listname: [
            {field: 'usersid', name: '编号', width: '50'},
            {field: 'registerDate', name: '创建时间', width: '90'},
            {field: 'truename', name: '公司名称'},
            {field: 'comments', name: '网站地址'},
            {field: 'username', name: '账号'},
            {field: 'password', name: '初始密码',},
            {field: 'linkName', name: '联系人',},
            {field: 'lockState', name: '状态',},
            {field: 'phone', name: '联系人手机号',},
          ],  //设置排列顺序
          data:[],
        }
      }
    },
    mounted(){
      this.getData();
    },
    methods:{
      getData(){
        let _this = this;
        this.$axios.get('/api/problem').then((response)=> {
//          let datelist = response.data.data.list;
          console.log(response)
//          datelist.forEach(function(item,i){
//            datelist[i].creatDate = _this.$timeonversionC(item.creatDate);
//            datelist[i].truename = unescape(item.truename);
//            datelist[i].linkName = unescape(item.linkName);
//          })
//          this.tableData.data = datelist;
//          this.total = response.data.data.total;
//          this.pageSize = Number(response.data.data.pageSize);
//          this.webSitedata.currentPage = response.data.data.pageNum;
        }).catch(function (error) {
          console.log(error);
        })
      },
      //翻页
      getPage(a){
        console.log(a)
        this.webSitedata.currentPage = a;
        this.getData();
      },
      //查询
      onSubmit(){
        this.getData()
      },
      //下线
      postModify(){

      },



      tableRowClassName({
        row,
        rowIndex
      }) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">

</style>
