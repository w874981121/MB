<!--评论 列表-->
<template>
  <div class="comment m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/forumm' }">论坛管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论列表</el-breadcrumb-item>
    </el-breadcrumb>
    <ul class="list_ul">
      <li class="list_ul_li" v-for="tiem in dataForm">
        <el-row>
          <el-col :span="4"><img :src="tiem.photoUrl" alt=""></el-col>
          <el-col :span="20">
            <el-row>
              <el-col :span="20">
                <h3>{{tiem.doctorName}}（回复）</h3>
                <p>{{tiem.content}}</p>
              </el-col>
              <el-col :span="4">
                <el-button size="mini" type="danger" @click="deleteans(tiem.answerId)">删除</el-button>
              </el-col>
            </el-row>

            <el-row class="bak mt10" v-if="tiem.ask">
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="19">
                <h4>{{tiem.ask.customerName}}（追问）</h4>
                <p>{{tiem.ask.content}}</p>
              </el-col>
              <el-col :span="4">
                <el-button size="mini" type="danger" @click="deleteask(tiem.ask.questionId)">删除</el-button>
              </el-col>
            </el-row>

            <el-row class="bak" v-if="tiem.ask && tiem.ask.ans">
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="19">
                <h4>{{tiem.ask.ans.doctorName}}（回复）</h4>
                <p>{{tiem.ask.ans.content}}</p>
              </el-col>
              <el-col :span="4">
                <el-button size="mini" type="danger" @click="deleteans(tiem.ask.ans.answerId)">删除</el-button>
              </el-col>
            </el-row>

          </el-col>
        </el-row>
      </li>
    </ul>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'comment',
    data(){
      return {
        total: '',
        pageSize: '',
        currentPage: '',
        dataForm: [],
      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      getData(){
        let _this = this;
        this.$axios.get('/api/back/questions/answer', {
          params: {
            currentPage: 1,
            questionId: this.$route.query.questionId
          }
        }).then((response)=> {
          let datelist = response.data.data.answers.list;
          console.log(typeof datelist)
          datelist.forEach(function (item, i) {
            datelist[i].photoUrl = 'http://47.104.146.162:8080/' + item.photoUrl;
            datelist[i].ask = item.ask;
//            datelist[i].ans = item.ask.ans;
          })
          this.dataForm = datelist;
          this.total = response.data.data.total;
          this.pageSize = Number(response.data.data.pageSize);
          this.currentPage = response.data.data.pageNum;
        }).catch(function (error) {
          console.log(error);
        })
      },

      deleteask(id){
        this.$axios.post('/api/back/questions', {questionId:id}).then((response)=> {
          console.log(response)
          this.getData();
        }).catch(function (error) {
          console.log(error);
        })
      },

      deleteans(id){
        this.$axios.post('/api/back/questions', {answerId:id}).then((response)=> {
          console.log(response)
          this.getData()
        }).catch(function (error) {
          console.log(error);
        })
      }

    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .list_ul {
    width: 100%;
    min-height: 60px;
    .list_ul_li {
      width: 100%;
      overflow: hidden;
      height: auto;
      margin-top: 10px;
      border: 1px solid #eee;
      padding: 10px;
    }
    p{
      margin-left: 20px;;
    }
.bak{
  background: #eeeeee;
}
  }
  .el-row{
    line-height: 1.4;
  }
</style>
