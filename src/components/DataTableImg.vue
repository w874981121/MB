<template>
  <div class="tableCss">
    <el-table :data="dataTable.data" height="400" border stripe style="width: 100%" :row-class-name="tableRowClassName">
      <template v-for="i in dataTable.listname">
          <el-table-column v-if="i.field != 'photoUrl'" align="center" :prop="i.field" :label="i.name" :width="i.width?i.width:'auto'"></el-table-column>
          <el-table-column v-if="i.field == 'photoUrl'" align="center" :prop="i.field" :label="i.name" :width="i.width?i.width:'auto'">
            <template slot-scope="scope">
              <img class="photoUrl_img" :src="scope.row.photoUrl" alt="">
            </template>
          </el-table-column>
      </template>

      <el-table-column v-if="dataTable.soleCode" align="center" label="绑定手机唯一码">
        <template slot-scope="scope">
          <el-button v-if="scope.row.soleCode" size="mini" type="primary" @click="untiePhone(scope.row)">解绑手机</el-button>
          <span v-if="!scope.row.soleCode">未绑定</span>
        </template>
      </el-table-column>

      <el-table-column v-if="dataTable.healthy" align="center" label="健康记录">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="seeHealthy(scope.row)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="" label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="postModify(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="postDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'dataTableImg',
    props: {
      dataTable: {
        type: Object,      //objectl类型
        required: true,    //必传
      }
    },
    data(){
      return{

      }
    },
    methods:{
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
      postModify(row){
        console.log(row)
        this.$emit('modify',row);
      },
      //untiePhone
      untiePhone(row){
        this.$axios.post('/api/back/unbundling', {customerId:row.customerId})
          .then((response)=> {
          console.log(response)
        if (response.data.errcode == 0) {
          this.$message({
            showClose: true,
            type: "success",
            message: '解绑成功！'
          });
        }
      }).catch(function (error) {
          console.log(error);
        });
      },
      postDelete(uid){
        this.$emit('delete',uid);
      },
      //查看健康记录
      seeHealthy(row){
//        console.log(row.customerId)
        this.$emit('healthy',row);
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .tableCss {
    box-sizing: border-box;
    padding: 20px;
  }
  .photoUrl_img{
    width: 80%;
    display: block;
    margin: 0 auto;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
