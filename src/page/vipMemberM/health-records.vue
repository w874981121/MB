<!--健康记录-->


<template>
  <div class="m20 fsz14">
    <el-form :inline="true" class="demo-form-inline mt10">
      <div class="block fl">
        <span class="demonstration">选择日期：</span>
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="block fl ml20">
        <span class="demonstration">选择项目：</span>
        <el-select v-model="from.type" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="block fl ml20">
        <el-form-item class="fr">
          <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item :label="姓名" class="fl">
          <el-input v-model="text" placeholder="填写姓名"></el-input>
        </el-form-item>
      </div>

    </el-form>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: "",
    data(){
      return {
        options:[{
          label:'血糖数据',
          value:'BG'
        },{
          label:'血脂数据',
          value:'BLOODFAT'
        },{
          label:'血压数据',
          value:'BLOODPRESSURE'
        },{
          label:'心电图',
          value:'ECGPICTURE'
        },{
          label:'血氧数据',
          value:'SPO'
        },{
          label:'尿常规分析数据',
          value:'UR'
        },{
          label:'体重计数据',
          value:'WEIGHT'
        }],
        from:{
          beginDate:'',
          endDate:'',
          type:'BG',

        }
      }
    }
  }
</script>

<style>
</style>
