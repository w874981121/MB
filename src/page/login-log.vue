<!--登陆遇到问题-->
<template>
  <div class="login_log m20">

    <el-table :data="tableData.data" height="500" border stripe style="width: 100%">
      <template v-for="i in tableData.listname">
        <el-table-column align="center" :prop="i.field" :label="i.name" :width="i.width?i.width:'auto'"></el-table-column>
      </template>
    </el-table>

    <!--翻页-->
    <el-pagination class="mt20" background layout="total, prev, pager, next" :page-size="pageSize" @current-change="getPage" :total="total"></el-pagination>
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
        currentPage: 1,
        //传递给table的数据
        tableData: {
          listname: [
//            {field: 'problemId', name: '编号', width: '80'},
            {field: 'creatDate', name: '报告时间', width: '180'},
            {field: 'loginName', name: '账号',width: '150'},
            {field: 'question', name: '报告内容',},
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
        this.$axios.get('/api/problem',{params: {currentPage: this.currentPage}}).then((response)=> {
          console.log(response)
          let datelist = response.data.data.list;
          datelist.forEach(function(item,i){
            datelist[i].creatDate = _this.$timeonversionC(item.creatDate);
          })
          this.tableData.data = datelist;
          this.total = response.data.data.total;
          this.pageSize = Number(response.data.data.pageSize);
          this.currentPage = response.data.data.pageNum;
        }).catch(function (error) {
          console.log(error);
        })
      },
      //翻页
      getPage(a){
        console.log(a)
        this.currentPage = a;
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
