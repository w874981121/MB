<!--专家讲堂-->
<template>
  <div class="enterpris_announcement m20">
    <!--查询-->
    <div class="searchBox">
      <el-form :inline="true" class="demo-form-inline mt10">
        <el-button class="fl ml10" type="primary" @click="newAccount">上传视频</el-button>
        <el-form-item class="fr">
          <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item label="" class="fr">
          <el-input v-model="text" placeholder="请输入公司名称"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!--table列表-->
    <el-table class="mt30" :data="tableData.data" height="400" border stripe style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column align="center" prop="articleId" label="编号"></el-table-column>
      <el-table-column align="center" prop="updateTime" label="创建时间" width="90"></el-table-column>
      <el-table-column align="center" prop="modifyUser" label="创建人名称"></el-table-column>
      <el-table-column align="center" prop="title" label="视频标题"></el-table-column>
      <el-table-column align="center" label="图片" width="160">
        <template slot-scope="scope">
          <img style="width:100%;display: block" :src="scope.row.imgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" v-show="scope.row.isPass == 0" @click="postnline(scope.row)">上线</el-button>
          <el-button size="mini" type="primary" v-show="scope.row.isPass == 1" @click="postOffline(scope.row)">下线</el-button>
          <el-button size="mini" type="primary" v-show="scope.row.isPass == 0" @click="postRevise(scope.row)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="" label="备注"></el-table-column>
    </el-table>
    <!--翻页-->
    <el-pagination class="mt20" background layout="prev, pager, next" :page-size="pageSize" @current-change="getPage" :total="total"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from '../../components/Search.vue'
  export default {
    name:'enterpris_announcement',
    data(){
      return{
        text:'',
        total: 0,
        pageSize: 0,
        webSitedata:{
          currentPage: 1,
          categoryId:2
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
        this.$axios.get('/api/back/article', { params: this.webSitedata}).then((response)=> {
          let datelist = response.data.data.list;
          console.log(datelist)
          datelist.forEach(function(item,i){
            datelist[i].updateTime = _this.$timeonversionC(item.updateTime);
            datelist[i].truename = unescape(item.truename);
            datelist[i].linkName = unescape(item.linkName);
            datelist[i].imgUrl = _this.$api + "/images/" + item.imgUrl
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
            message: '下线失败!'
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

      //修改
      postRevise(row){
        this.$router.push({path: "/expertlh/reviseexpertlecturehall", query: {articleId: row.articleId}})
      },

      //跳转
      newAccount(){
        this.$router.push({path: '/expertlh/newexpertlecturehall'})
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
