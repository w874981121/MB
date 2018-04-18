<!--健康记录-->
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
      <!--  BG table 血糖数据-->
      <el-table v-show="tableData.BG.state" :data="tableData.BG.data" height="400" border stripe style="width: 100%">
        <template v-for="i in tableData.BG.title">
          <el-table-column align="center" :prop="i.field" :label="i.name"
                           :width="i.width?i.width:'auto'"></el-table-column>
        </template>
      </el-table>
      <!--  BLOODFAT table 血脂数据-->
      <el-table v-show="tableData.BLOODFAT.state" :data="tableData.BLOODFAT.data" height="400" border stripe
                style="width: 100%">
        <template v-for="i in tableData.BLOODFAT.title">
          <el-table-column align="center" :prop="i.field" :label="i.name"
                           :width="i.width?i.width:'auto'"></el-table-column>
        </template>
      </el-table>
      <!--  BLOODPRESSURE table 血压数据-->
      <el-table v-show="tableData.BLOODPRESSURE.state" :data="tableData.BLOODPRESSURE.data" height="400" border stripe
                style="width: 100%">
        <template v-for="i in tableData.BLOODPRESSURE.title">
          <el-table-column align="center" :prop="i.field" :label="i.name"
                           :width="i.width?i.width:'auto'"></el-table-column>
        </template>
      </el-table>
      <!--  ECGPICTURE table 心电图-->
      <el-table v-show="tableData.ECGPICTURE.state" :data="tableData.ECGPICTURE.data" height="400" border stripe
                style="width: 100%">
        <template v-for="i in tableData.ECGPICTURE.title">

          <el-table-column v-if="i.field != 'pictureDataUrl'" align="center" :prop="i.field" :label="i.name" :width="i.width?i.width:'auto'"></el-table-column>
          <el-table-column v-if="i.field == 'pictureDataUrl'" align="center" :prop="i.field" :label="i.name" :width="i.width?i.width:'auto'">
            <template slot-scope="scope">
                <img class="cell_img" :src="scope.row.pictureDataUrl" alt="">
            </template>
          </el-table-column>
        </template>
      </el-table>
      <!--  FAT table 脂肪数据-->
      <el-table v-show="tableData.FAT.state" :data="tableData.FAT.data" height="400" border stripe style="width: 100%">
        <template v-for="i in tableData.FAT.title">
          <el-table-column align="center" :prop="i.field" :label="i.name"
                           :width="i.width?i.width:'auto'"></el-table-column>
        </template>
      </el-table>
      <!--  SPO table 血氧数据-->
      <el-table v-show="tableData.SPO.state" :data="tableData.SPO.data" height="400" border stripe style="width: 100%">
        <template v-for="i in tableData.SPO.title">
          <el-table-column align="center" :prop="i.field" :label="i.name"
                           :width="i.width?i.width:'auto'"></el-table-column>
        </template>
      </el-table>
      <!--  UR table 尿常规分析数据-->
      <el-table v-show="tableData.UR.state" :data="tableData.UR.data" height="400" border stripe style="width: 100%">
        <template v-for="i in tableData.UR.title">
          <el-table-column align="center" :prop="i.field" :label="i.name"
                           :width="i.width?i.width:'auto'"></el-table-column>
        </template>
      </el-table>
      <!--  WEIGHT table 体重计数据-->
      <el-table v-show="tableData.WEIGHT.state" :data="tableData.WEIGHT.data" height="400" border stripe
                style="width: 100%">
        <template v-for="i in tableData.WEIGHT.title">
          <el-table-column align="center" :prop="i.field" :label="i.name"
                           :width="i.width?i.width:'auto'"></el-table-column>
        </template>
      </el-table>

    </div>
    <el-pagination background layout="total, prev, pager, next" :current-page.sync="webSitedata.total" :page-size="webSitedata.pageSize" @current-change="getPage"
                   :total="webSitedata.total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "health-records",
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
          total: 0,
          pageSize: 0,
          companyId:'',
        },
        tableData: {
          BG: {
            name: '血糖数据',
            state: true,
            value: 'BG',
            currentPage: 1,
            total: 0,
            title: [
              {field: 'dataKey', name: '用户设备编号', width: '200'},
              {field: 'addDate', name: '添加时间', width: '90'},
              {field: 'customerName', name: '用户姓名'},
              {field: 'bloodSugarDataId', name: '血糖数据编号'},
              {field: 'bloodSugar', name: '血糖值(mmol(1mmol=18mg/dl))', width: '220'},  //mmol(1mmol=18mg/dl)
            ],
            data: [],
          },
          BLOODFAT: {
            name: '血脂数据',
            state: false,
            value: 'BLOODFAT',
            currentPage: 1,
            total: 0,
            title: [
              {field: 'dataKey', name: '用户设备编号', width: '200'},
              {field: 'addDate', name: '添加时间', width: '90'},
              {field: 'customerName', name: '用户姓名'},
              {field: 'bloodFatDataId', name: '血糖数据编号'},
              {field: 'chol', name: '胆固醇含量	（mmol/L）'},
              {field: 'hdlchol', name: '高密度脂蛋白胆固醇含量（mmol/L）'},
              {field: 'trig', name: '甘油三酯含量（mmol/L）'},
              {field: 'calcldl', name: '低密度脂蛋白胆固醇含量（mmol/L）',},
              {field: 'tchdl', name: '总胆固醇和高密度胆固醇的比值'},
            ],
            data: [],
          },
          BLOODPRESSURE: {
            name: '血压数据',
            state: false,
            value: 'BLOODPRESSURE',
            currentPage: 1,
            total: 0,
            title: [
              {field: 'dataKey', name: '用户设备编号', width: '200'},
              {field: 'addDate', name: '添加时间', width: '90'},
              {field: 'customerName', name: '用户姓名'},
              {field: 'bloodPressureDataId', name: '血压数据编号'},
              {field: 'diastolicPressure', name: '舒张压'},
              {field: 'systolicPressure', name: '收缩压'},
              {field: 'pulse', name: '脉率'},
            ],
            data: [],
          },
          ECGPICTURE: {
            name: '心电图',
            state: false,
            value: 'ECGPICTURE',
            currentPage: 1,
            total: 0,
            title: [
              {field: 'dataKey', name: '用户设备编号', width: '200'},
              {field: 'addDate', name: '添加时间', width: '200'},
              {field: 'customerName', name: '用户姓名'},
              {field: 'ecgPictureDataId', name: '心电数据编号'},
              {field: 'pictureDataUrl', name: '心电图',width: '220'},
            ],
            data: [],
          },
          FAT: {
            name: '脂肪数据',
            state: false,
            value: 'FAT',
            currentPage: 1,
            total: 0,
            title: [
              {field: 'dataKey', name: '用户设备编号', width: '200'},
              {field: 'addDate', name: '添加时间', width: '90'},
              {field: 'customerName', name: '用户姓名'},
              {field: 'fatDataId', name: '脂肪数据编号'},
              {field: 'height', name: '身高(cm)'},
              {field: 'weight', name: '体重(kg)'},
              {field: 'age', name: '年龄'},
              {field: 'sex', name: '性别'},
              {field: 'fatContent', name: '脂肪含量'},
              {field: 'bmi', name: '体质指数'},
              {field: 'bmr', name: '基础代谢值'},
              {field: 'bmiResult', name: '体质指数判断结果'},
              {field: 'bt', name: '体型类型'},
            ],
            data: [],
          },
          SPO: {
            name: '血氧数据',
            state: false,
            value: 'SPO',
            currentPage: 1,
            total: 0,
            title: [
              {field: 'dataKey', name: '用户设备编号', width: '200'},
              {field: 'addDate', name: '添加时间', width: '90'},
              {field: 'customerName', name: '用户姓名'},
              {field: 'spoDataId', name: '血氧数据编号'},
              {field: 'pulse', name: '脉率'},
              {field: 'oxygen', name: '血氧值'},
            ],
            data: [],
          },
          UR: {
            name: '尿常规分析数据',
            state: false,
            value: 'UR',
            currentPage: 1,
            total: 0,
            title: [
              {field: 'dataKey', name: '用户设备编号', width: '200'},
              {field: 'addDate', name: '添加时间', width: '90'},
              {field: 'customerName', name: '用户姓名'},
              {field: 'urDataId', name: '尿常规数据编号'},
              {field: 'leu', name: '白细胞值'},
              {field: 'nit', name: '亚硝酸盐值'},
              {field: 'ubg', name: '尿胆原值'},
              {field: 'pro', name: '蛋白质值'},
              {field: 'ph', name: '酸碱度值'},
              {field: 'bld', name: '红细胞值'},
              {field: 'sg', name: '比重'},
              {field: 'ket', name: '酮体值'},
              {field: 'bil', name: '胆红素值'},
              {field: 'glu', name: '葡萄糖值'},
              {field: 'vc', name: '维生素值'},
            ],
            data: [],
          },
          WEIGHT: {
            name: '体重计数据',
            state: false,
            value: 'WEIGHT',
            currentPage: 1,
            total: 0,
            title: [
              {field: 'dataKey', name: '用户设备编号', width: '200'},
              {field: 'addDate', name: '添加时间', width: '90'},
              {field: 'customerName', name: '用户姓名'},
              {field: 'weightDataId', name: '体重计数据编号'},
              {field: 'weight', name: '体重数据(kg)'},
            ],
            data: [],
          },

        }
      }
    },
    watch: {
      "webSitedata.type"(val){
        let _this = this;
        Object.keys(this.tableData).forEach(function (tem, s) {
          if (_this.tableData[tem].value == val) {
            _this.tableData[tem].state = true;
            _this.webSitedata.total = _this.tableData[tem].total
            _this.webSitedata.pageSize = _this.tableData[tem].pageSize
            _this.webSitedata.currentPage = _this.tableData[tem].currentPage
          } else {
            _this.tableData[tem].state = false
          }
        })
      },
    },
    mounted(){
      this.webSitedata.customerName = this.$route.query.customerName
      this.webSitedata.companyId = this.$route.query.companyId
      this.getData();
    },
    methods: {
      getData(){
        let _this = this;
        let fromData = {
          companyId: this.webSitedata.companyId,   //公司id
          currentPage: this.webSitedata.currentPage, //页码
          type: this.webSitedata.type,      //数据类型
          customerName: this.webSitedata.customerName,
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
        this.modifytateS(fromData.type);
        this.$axios.get('/api/back/customers/data', {params: fromData}).then((response)=> {
          console.log(response)
          if (response.data.data == null) {
            this.tableData[fromData.type].data = []
          } else {
            let datelist = response.data.data.list;
            datelist.forEach(function (item, i) {
              datelist[i].customerName = decodeURIComponent(item.customerName);
              if(item.pictureDataUrl){
                datelist[i].pictureDataUrl = _this.$api + "/images/" + item.pictureDataUrl
              }
            })
            this.tableData[fromData.type].data = datelist;
            this.webSitedata.total = response.data.data.total;
            this.webSitedata.pageSize = Number(response.data.data.pageSize);
            this.webSitedata.currentPage = response.data.data.pageNum;
            //存储对应页码信息
            this.tableData[fromData.type].total = response.data.data.total;
            this.tableData[fromData.type].pageSize = Number(response.data.data.pageSize);
            this.tableData[fromData.type].currentPage = response.data.data.pageNum;
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      onSubmit(){
        this.getData()
      },
      getPage(a){
        this.tableData[this.webSitedata.type].currentPage = a;
        this.getData();
      },
      modifytateS(val){
        this.tableData.listname = [];
        this.tableData.listname = this.tableData[val].title;
        this.tableData.data = [];
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .tableCss {
    box-sizing: border-box;
    padding: 10px;
    .cell_img{
      width: 100%;
      display: block;
    }
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
