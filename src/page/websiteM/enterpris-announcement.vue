<!--企业公告-->
<template>
  <div class="enterpris_announcement m20">
    <!--查询-->
      <Search :searchData="searchData" @response="onSubmit"></Search>
    <!--table列表-->
    <el-table class="mt30" :data="tableData.data" height="400" border stripe style="width: 100%"
              :row-class-name="tableRowClassName">
      <!--<el-table-column align="center" prop="articleId" label="编号"  width="120"></el-table-column>-->
      <el-table-column align="center" prop="updateTime" label="创建时间" width="90"></el-table-column>
      <el-table-column align="center" prop="title" label="公告名称"></el-table-column>
      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" v-show="scope.row.isPass == 0" @click="postnline(scope.row)">上线
          </el-button>
          <el-button size="mini" type="primary" v-show="scope.row.isPass == 1" @click="postOffline(scope.row)">下线
          </el-button>
          <el-button size="mini" type="primary" v-show="scope.row.isPass == 0" @click="postModify(scope.row)">修改
          </el-button>
          <el-button size="mini" type="danger" v-show="scope.row.isPass == 0" @click="postDalete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="modifyUser" label="备注"></el-table-column>
    </el-table>
    <!--翻页-->
    <el-pagination class="mt20" background layout="total, prev, pager, next" :page-size="pageSize" @current-change="getPage"
                   :total="total"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from '../../components/Search.vue'
  export default {
    name: 'enterpris_announcement',
    data(){
      return {
        searchData: {
          path: '/enterprisa/newannouncement',
          name:'',
          placeholder:'输入公告名称',
          newname: '新建公告',
        },
        total: 0,
        pageSize: 0,
        webSitedata: {
          currentPage: 1,
          categoryId: 1,   //分类公告
          title:'',
        },
        tableData: {
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
        this.tableData.data = [];
        this.$axios.get('/api/back/article', {params: this.webSitedata}).then((response)=> {
          let datelist = response.data.data.list;
          datelist.forEach(function (item, i) {
            datelist[i].updateTime = _this.$timeonversionC(item.updateTime);
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
        this.webSitedata.currentPage = a;
        this.getData();
      },
      //查询
      onSubmit(textdata){
        this.webSitedata.title = textdata
        this.getData()
      },
      //上线
      postnline(val){
        let formdata = {
          articleId: val.articleId
        }
        this.$axios.post('/api/back/article/pass', formdata).then((response) => {
          console.log(response)
          if (response.data.errcode == 0) {
            this.getData();
            this.$message({
              type: 'success',
              message: '上线成功!'
            });
          }else{
            this.$message({
              type: 'error',
              message: '上线失败!'
            });
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      //下线
      postOffline(row){
        this.$axios.post('/api/back/article/pass', {articleId: row.articleId}).then((response) => {
          console.log(response)
          if (response.data.errcode == 0) {
            this.getData();
            this.$message({
              type: 'success',
              message: '下线成功!'
            });
          }else{
            this.$message({
              type: 'error',
              message: '下线失败!'
            });
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      //删除
      postDalete(row){
        this.$confirm('确认删除企业公告？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/article/delete', {articleId: row.articleId})
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

      //修改
      postModify(row){
        this.$router.push({path: "/enterprisa/reviseannouncement", query: {articleId: row.articleId}})
      },


      newAccount(){
        this.$router.push({path: '/enterprisa/newannouncement'})
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
    },
    components: {
      Search,
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">

</style>
