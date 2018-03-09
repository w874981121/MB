<!--异常报告-->
<template>
  <div class="m20 fsz14">
    <div class="searchBox">
      <el-form :inline="true" class="demo-form-inline mt10">
        <div class="block fl mr20 mb10">
          <span class="demonstration">选择日期：</span>
          <el-date-picker
            v-model="webSitedata.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="block fl mr20  mb10">
          <span class="demonstration">选择项目：</span>
          <el-select v-model="webSitedata.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="block fl mr20  mb10">
          <el-form-item class="fr">
            <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item label="姓名:" class="fl">
            <el-input v-model="webSitedata.customerName" placeholder="填写姓名"></el-input>
          </el-form-item>
        </div>
      </el-form>

    </div>
    <div class="tableCss">
      <el-table :data="tableData.data" height="400" border stripe style="width: 100%">
        <template v-for="i in tableData.title">
          <el-table-column align="center" :prop="i.field" :label="i.name"
                           :width="i.width?i.width:'auto'"></el-table-column>
        </template>
      </el-table>
    </div>
    <el-pagination background layout="prev, pager, next" :page-size="webSitedata.pageSize" @current-change="getPage"
                   :total="webSitedata.total"></el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "remote-order",
    data(){
      return {
        options: [{
          label: '血糖数据',
          value: 'BG'
        }, {
          label: '血脂数据',
          value: 'BLOODFAT'
        }, {
          label: '血压数据',
          value: 'BLOODPRESSURE'
        }, {
          label: '心电图',
          value: 'ECGPICTURE'
        }, {
          label: '脂肪数据',
          value: 'FAT'
        }, {
          label: '血氧数据',
          value: 'SPO'
        }, {
          label: '尿常规分析数据',
          value: 'UR'
        }, {
          label: '体重计数据',
          value: 'WEIGHT'
        }],
        webSitedata: {
          time: '',
          type: 'BG',
          customerName: '',
          currentPage: 1,
          total: 1,
          pageSize: 1,
        },
        tableData: {
          title: [
            {field: 'creatDate', name: '异常上报时间', width: '200'},
            {field: 'customerName', name: '会员', width: '100'},
            {field: 'doctorName', name: '家庭医生', width: '100'},
            {field: 'abnormalDataText', name: '异常数据'},
            {field: 'abnormal', name: '医生建议'},
            {field: 'state', name: '远程会诊订单状态'},
          ],
          data: [],
        }
      }
    },
    watch: {},
    mounted(){
      this.getData()
    },
    methods: {
      getData(){
        let _this = this;
        let fromData = {
          beginDate: '',  //开始时间
          endDate: '',    //结束时间
          customerName: this.webSitedata.customerName,  //姓名
          companyId: this.cookieFn.get("usersid"),   //公司id
          currentPage: this.webSitedata.currentPage, //页码
          type: this.webSitedata.type,      //数据类型
        }
        if (this.webSitedata.time != '') {
          let timeA = new Date(this.webSitedata.time[0]);
          let timeB = new Date(this.webSitedata.time[1]);

          let zeroZh = (z)=>{
            return z < 10 ? "0" + z : z;
          }
          fromData.beginDate = String(timeA.getFullYear())+ "-" +zeroZh(String(timeA.getMonth() + 1)) +"-" +zeroZh(String(timeA.getDate()));  //开始时间
          fromData.endDate = String(timeB.getFullYear()) +"-" +zeroZh( String(timeB.getMonth() + 1)) + "-" +zeroZh(String(timeB.getDate()));    //结束时间
        }
        this.$axios.get('/api/back/customers/abnormal', {params: fromData}).then((response) => {
          console.log(response)
        if (response.data.data == null) {
          console.log("数据为空")
          return
        }
        let datelist = response.data.data.list;
        datelist.forEach(function (item, i) {
          datelist[i].customerName = decodeURIComponent(item.customerName);
          let titleText = " ";
          switch (item.state) {
            case 0:
              titleText = "无状态"
              break;
            case 1:
              titleText = "会员发起远程会诊,未支付"
              break;
            case 2:
              titleText = "发起会诊已支付未结束"
              break;
            case 3:
              titleText = "会诊结束"
              break;
          }

          console.log(datelist[i].creatDate)
          datelist[i].creatDate = _this.$timeonversionC(item.creatDate)
          console.log(datelist[i].creatDate)
          datelist[i].abnormalDataText = []
          datelist[i].abnormalData.forEach(function (a, b) {
            datelist[i].abnormalDataText.push(a.name + ":" + a.value)
          })
          datelist[i].abnormalDataText = datelist[i].abnormalDataText.join("  ")
          datelist[i].state = titleText;
        })
        console.log(datelist)
        this.tableData.data = datelist;
        this.webSitedata.total = response.data.data.total;
        this.webSitedata.pageSize = Number(response.data.data.pageSize);
        this.webSitedata.currentPage = response.data.data.pageNum;
      }).catch(function (error) {
          console.log(error);
        })
      },
      onSubmit(){
        this.getData()
      },
      getPage(a){
        this.webSitedata.currentPage = a;
        this.getData();
      },
    },
  }
</script>

<style>
  .tableCss {
    box-sizing: border-box;
    padding: 10px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
