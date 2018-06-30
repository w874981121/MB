<template>
  <div class="new-account m20 fsz14 por h100">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/roleam' }">角色权限管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/roleam/roleamlist', query: { usersid: form.parentUsersId }}">管理员列表</el-breadcrumb-item>
      <el-breadcrumb-item>新建管理员</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="get_form mt20">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="姓名：" prop="truename" :rules="[{required: true, message: '请输入姓名', trigger: 'blur'}]">
          <el-input v-model="form.truename"></el-input>
        </el-form-item>
        <el-form-item label="账号：" prop="username" :rules="[{required: true, message: '请输入账号', trigger: 'blur'}]">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="权限：">
          <div>
            <template v-for="name in powerTag">
                <el-tag class="mr10">{{name}}</el-tag>
            </template>
          </div>
          <el-button type="primary" @click="purviewidsAlert" >添加权限</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <template>
      <div class="alert_box_transfer" v-show="purviewidsstate">
        <h3>权限设置：</h3>
        <el-transfer v-model="purviewids" :button-texts="['删除', '添加']" :titles="['所有权限', '选中权限']" :data="powerdata">
        </el-transfer>
          <el-button class="preservation_but" type="primary" @click="preservationFn">保存</el-button>
          <el-button class="preservation_but mr20" @click="purviewidsAlert">关闭</el-button>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  export default {
    name: 'new-account',
    data(){
      const generateData = _ => {
        const data = [];
        this.$axios.get('/api/back/purview')
          .then((response)=> {
            let datalist = response.data.data;
            datalist.forEach(function (item, i) {
              if(item.isleaf === 1){
                data.push({
                  key: item.purviewid,
                  label: item.purviewname,
                  disabled: true
                });
                item.childPurview.forEach(function (tem, i) {
                  data.push({
                    key: tem.purviewid,
                    label: tem.purviewname,
                    disabled: false
                  });
                })
              }else if(item.isleaf === 0){
                data.push({
                  key: item.purviewid,
                  label: item.purviewname,
                  disabled: false
                });
              }
            })
          })
          .catch((error) => {
            console.log(error);
          })
        console.log(data)
        return data;
      };
      return {
        powerdata: generateData(), //所有权限请求
        purviewids:[],        //选中权限id
        purviewidsstate: false, //权限窗口状态
        powerTag:[],
        form: {
          parentUsersId: this.$route.query.parentUsersId,
          truename: '',
          username: '',
          type: 2
        }
      }
    },
    watch: {

    },
    methods: {
      //添加权限弹窗
      purviewidsAlert(){
        this.purviewidsstate = !this.purviewidsstate;
      },
      //保存
      preservationFn(){
        this.purviewidsAlert();
        console.log("0")
        let _this = this;
        this.powerdata.forEach(function (item, i) {
          console.log(item)
          _this.purviewids.forEach(function (tem, s) {
            console.log("2")
            if(item.key === tem){
              _this.powerTag.push(item.label)
            }
          })
        })
        console.log(this.powerTag)
      },
      //创建提交
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          console.log("=====")
        if (!valid) {
          throw new Error('参数错误'); //验证判断
        }
      });

        let form = {
          parentUsersId: this.form.parentUsersId,
          truename: this.form.truename,
          username: this.form.username,
          purviewids: this.purviewids.join(","),
          type: 2
        }
        this.$axios.post('/api/back/users/role', form).then((response)=> {
          if(response.data.errcode === 30012){
          this.$message({
            type: "error",
            message: '账号名重复！！'
          });
          return
        }
            if (response.data.errcode === 0) {
              this.$message({
                showClose: true,
                type: "success",
                message: '创建成功！'
              });
              history.go(-1)
            }else{
          this.$message({
            showClose: true,
            type: "error",
            message: '创建失败！'
          });
        }
          })
          .catch(function (error) {
          this.$message({
            showClose: true,
            type: "error",
            message: '创建失败！'
          });
            console.log(error);
          });
      }
    },
    mounted(){
      console.log("来了")
      console.log(this.$route.query)
    }
  }
</script>

<style lang="scss">
  .alert_box_transfer {
    background: #eee;
    border: 1px #bbb solid;
    display: block;
    width: 524px;
    padding: 30px;
    position: absolute;
    border-radius: 4px;
    top: 34%;
    left: 50%;
    transform: translate(-50%, -50%);
    .preservation_but{
      float: right;
      margin-top:20px;
    }
  }
</style>
