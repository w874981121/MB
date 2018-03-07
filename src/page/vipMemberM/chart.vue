<!--图表-->
<template>
  <div class="charts">
    <div class="searchBox">
      <el-form :inline="true" class="demo-form-inline mt10">
        <div class="block fl mr20 mb10">
          <span class="demonstration">选择日期：</span>
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="block fl mr20  mb10">
          <el-form-item class="fr">
            <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div id="myChart" :style="{width:'800px',height: '400px'}"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: 'Chart',
    data(){
      return {
        pickerOptions:{
          shortcuts:[{
              text: '今日',
              onClick(picker) {
                const end = new Date();
                picker.$emit('pick', [end, end]);
              }
            },{
              text: '近7日',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },{
              text: '近30日',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }]
        },
        authour: 'Wrisewrong',
        time:'',
        titleData: '7日数据', //图表title
        webget: { type: 2 },
        chartData:[],
      }
    },
    mounted(){
      this.myChart = echarts.init(document.getElementById('myChart'))
      this.onSubmit(true);
    },
    methods:{
      setTime(){
        this.webget = {};
        let time = new Date();
        let timeA = new Date(this.time[0]);
        let timeB = new Date(this.time[1]);
        let zeroZh = (z)=>{
          return z < 10 ? "0" + z : z;
        }
        let  c = (timeB - timeA)/1000/60/60/24;
        let newDate = String(time.getFullYear()) +"-" +zeroZh(String(time.getMonth() + 1)) + "-" +zeroZh(String(time.getDate()));   //当前日期
        let beginDate = String(timeA.getFullYear())+ "-" +zeroZh(String(timeA.getMonth() + 1)) +"-" +zeroZh(String(timeA.getDate()));   //开始日期
        let endDate = String(timeB.getFullYear()) +"-" +zeroZh(String(timeB.getMonth() + 1)) + "-" +zeroZh(String(timeB.getDate()));   //结束日期
        let state = newDate === endDate;


        if(c === 0 && state ){
          this.webget.type = 1;
          this.titleData = '今日数据';
        }else if(c === 7 && state || this.time.length == 0){
          this.webget.type = 2;
          this.titleData = '7日数据';
        }else if(c === 30 && state){
          this.webget.type = 3;
          this.titleData = '30日数据';
        }else{
          this.webget.beginDate = beginDate;
          this.webget.endDate = endDate;
          this.titleData =beginDate + '~' + endDate + '日数据';
        }
      },
      onSubmit(state){
        let _this = this;
        if(state !== true){
          this.setTime();
        }
        let webget = this.webget;
        this.$axios.get('/api/back/statistics', { params: webget}).then((response)=> {
          if(response.data.errcode === 30007 ){
            this.$message({
              type: 'error',
              message: "查询数据为空!"
            });
            return
          }else if(response.data.errcode !== 0){
            this.$message({
              type: 'error',
              message: "查询失败!"
            });
            return
          }else{
            this.$message({
              type: 'success',
              message: "查询成功!"
            });
          }

          let datelist = response.data.data;
          this.chartData = [];
          this.chartData.push({
            value: datelist.dataCount,
            itemStyle: {
              color: '#c23531'
            }
          });
          this.chartData.push({
            value: datelist.doctorCount,
            itemStyle: {
              color: '#2f4554'
            }
          });
          this.chartData.push({
            value: datelist.vipCount,
            itemStyle: {
              color: '#61a0a8'
            }
          });
          this.chartData.push({
            value: datelist.customerCount,
            itemStyle: {
              color: '#d48265'
            }
          });
          this.chartData.push({
            value: datelist.orderCount,
            itemStyle: {
              color: '#91c7ae'
            }
          });
          this.chartData.push({
            value: datelist.totalPrice,
            itemStyle: {
              color: '#749f83'
            }
          });
          this.myChart.setOption({
            title: {
              text: this.titleData,
              left: 'center',
            },
            tooltip: {},
            xAxis: {
              type:'category',
              data: ["数据异常数", "上报医生数", "异常会员数", "下单会员数", "下单数", "总金额"]
            },
            yAxis: {},
            color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
            series: [{
              label: {
                show:true,
              },
              type: 'bar',
              data: this.chartData
            }]
          });
          console.log(_this.chartData)
        }).catch(function (error) {
          console.log(error);
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">

</style>
