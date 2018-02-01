<!--论坛管理-->

<template>
	<div class="forum_manage m20">
    <!--查询-->
    <el-form :inline="true" class="demo-form-inline searchBox">
      <el-form-item class="fr">
        <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item class="fr">
        <el-input v-model="seach_text" placeholder="发布人/医生"></el-input>
      </el-form-item>
    </el-form>
    <!--table列表-->
    <el-table class="mt30" :data="tableData.data" height="400" border stripe style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column align="center" prop="questionId" label="编号"></el-table-column>
      <el-table-column align="center" prop="creatDate" label="创建时间" width="90"></el-table-column>
      <el-table-column align="center" prop="customerName" label="发布人">
        <template slot-scope="scope">
          <!--0 普通  1 VIP-->
          <router-link v-if="scope.row.type == 0" :to="{ path: '/regularmm/reviseregularmembermanagement', query: { customerId: scope.row.customerId}}">
            {{scope.row.customerName}}
          </router-link>
          <router-link v-if="scope.row.type == 1" :to="{ path: '/vipi', query: { customerId: scope.row.customerId}}">
            {{scope.row.customerName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="发布内容"></el-table-column>
      <el-table-column align="center" prop="count" label="评论列表"></el-table-column>
      <el-table-column align="center" prop="doctors" label="回复的医生">
        <template slot-scope="scope">

          <span v-for="i in scope.row.doctors">
           <!--0 普通  1 VIP-->
          <router-link v-if="scope.row.type == 0" :to="{ path: '/doctorm/revisedoctormanagement', query: { customerId: i.customerId}}">
            {{i.customerName}}
          </router-link>
          <router-link v-if="scope.row.type == 1" :to="{ path: '/vipdm/revisedoctorinformmation', query: { customerId: i.customerId}}">
            {{i.customerName}}
          </router-link>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="postModify(scope.row)">下线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--翻页-->
    <el-pagination background layout="prev, pager, next" :page-size="pageSize" @current-change="getPage" :total="total"></el-pagination>
	</div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'forum_manage',
    data(){
      return{
        seach_text: '',
        total: 0,
        pageSize: 0,
        webSitedata:{
          currentPage: 1,
          name:''
        },
        tableData: {
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
        this.$axios.get('/api/back/questions', { params: this.webSitedata}).then((response)=> {
          let datelist = response.data.data.list;
          console.log(datelist)
          datelist.forEach(function(item,i){
            datelist[i].creatDate = _this.$timeonversionC(item.creatDate);
            datelist[i].truename = unescape(item.truename);
            datelist[i].linkName = unescape(item.linkName);
          })
          this.tableData.data = datelist;
          this.total = response.data.data.total;
          this.pageSize = Number(response.data.data.pageSize);
          this.webSitedata.currentPage = response.data.data.pageNum;
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
