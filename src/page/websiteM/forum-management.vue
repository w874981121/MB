<!--论坛管理-->

<template>
	<div class="forum_manage m20">
    <!--查询-->
    <el-form :inline="true" class="demo-form-inline searchBox">
      <el-form-item class="fr">
        <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item class="fr">
        <el-input v-model="webSitedata.customerName" placeholder="请输入发布人"></el-input>
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
          <router-link v-if="scope.row.type == 1" :to="{ path: '/vipi/revisevipinformation', query: { customerId: scope.row.customerId}}">
            {{scope.row.customerName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="标题">
        <template slot-scope="scope">
          <a href="javascript:void(0);" @click="openText(scope.row)">{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="count" label="评论条数">
        <template slot-scope="scope">
          <router-link :to="{ path: '/forumm/comment', query: { questionId: scope.row.questionId}}">
            {{scope.row.count}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="doctors" label="回复的医生">
        <template slot-scope="scope">
          <span v-for="i in scope.row.doctors">
           <!--0 普通  1 VIP-->
          <router-link v-if="i.type == 0" :to="{ path: '/doctorm/revisedoctormanagement', query: { customerId: i.customerId}}">
            {{i.customerName}}，
          </router-link>
          <router-link v-if="i.type == 1" :to="{ path: '/vipdm/revisedoctorinformmation', query: { customerId: i.customerId}}">
            {{i.customerName}}
          </router-link>
            <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="isShow" label="状态">
        <template slot-scope="scope" >
          {{scope.row.isShow == 0 ? '已上线':'已下线'}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope" >
            <el-button size="mini" v-if="scope.row.isShow == 0" type="primary" @click="postOffline(scope.row)">下线</el-button>
          <el-button size="mini"  v-if="scope.row.isShow == 1"  type="primary" @click="goOnline(scope.row)">上线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--翻页-->
    <el-pagination class="mt20" background layout="prev, pager, next" :page-size="pageSize" @current-change="getPage" :total="total"></el-pagination>
	</div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  export default {
    name:'forum_manage',
    data(){
      return{
        total: 0,
        pageSize: 0,
        webSitedata:{
          currentPage: 1,
          customerName:'',
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
      postOffline(row){
        let _this = this;
        this.$confirm('下线后，健康管理网站将看不到本条提问？', '提示', {
          confirmButtonText: '知道了',
          cancelButtonText: '暂不下线',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/questions', {questionId: row.questionId})
            .then((response)=> {
              console.log(response)
              this.getData()
              this.$message({
                type: 'success',
                message: '下线成功!'
              });
            }).catch(function (error) {
              console.log(error);
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消下线'
          });
        });
      },
      //上线
      goOnline(row){
        let _this = this;
        this.$confirm('上线后，健康管理网站会展示本条提问。', '提示', {
          confirmButtonText: '知道了',
          cancelButtonText: '暂不上线',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/questions', {questionId: row.questionId}).then((response)=> {
              console.log(response)
              this.getData()
              this.$message({
                type: 'success',
                message: '上线成功!'
              });
            })
            .catch(function (error) {
              this.$message.error('上线失败');
              console.log(error);
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消上线'
          });
        });
      },
      //文章窗口
      openText(row){
        this.$alert(row.content, row.title, {
          confirmButtonText: '确定',
//          callback: action => {
//
//          }
        });
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
