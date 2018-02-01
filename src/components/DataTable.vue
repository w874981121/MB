<template>
  <div class="tableCss">
    <el-table :data="dataTable.data" height="400" border stripe style="width: 100%" :row-class-name="tableRowClassName">
      <template v-for="i in dataTable.listname">
          <el-table-column align="center" :prop="i.field" :label="i.name" :width="i.width?i.width:'auto'"></el-table-column>
      </template>
      <el-table-column align="center" prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="postModify(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'dataTable',
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
      postModify(uid){
        console.log(uid)
        this.$emit('modify',uid);
      },   //

      newAccount(){     //跳转操作
        console.log(this)
        this.$router.push({path: ""})
      },
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
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
