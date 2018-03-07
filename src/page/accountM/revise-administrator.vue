<template>
  <div class="new-account m20 fsz14 por h100">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/roleam' }">角色权限管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/roleam/roleamlist', query: { usersid: form.parentUsersId }}">
        {{truename}}-管理员列表
      </el-breadcrumb-item>
      <el-breadcrumb-item>修改管理员</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="get_form mt20">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="姓名：">
          <el-input v-model="form.truename"></el-input>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="权限：">
          <div>
            <template v-for="name in powerTag">
              <el-tag class="mr10">{{name}}</el-tag>
            </template>
          </div>
        </el-form-item>

        <el-form-item>
          <a href="javascript:void(0);" @click="purviewidsAlert">修改权限</a>
          <a href="javascript:void(0);" class="ml20" @click="disableFn">{{form.lockState ==0 ? '禁用账号':'启用账号'}}</a>
          <!--<a href="javascropt:;" class="ml20" @click="resetFn">重置密码</a>-->
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存修改</el-button>
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
      const generateData = () => {
        const data = [];
        this.$axios.get('/api/back/purview')
          .then((response) => {
            let datalist = response.data.data;
            datalist.forEach(function (item, i) {
              if (item.isleaf === 1) {
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
              } else if (item.isleaf === 0) {
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
      }
      return {
        powerdata: generateData(), //所有权限请求
        purviewids: [],        //选中权限id
        purviewidsstate: false, //权限窗口状态
        powerTag: [],
        truename: this.cookieFn.get("truename"),
        form: {
          parentUsersId: this.$route.query.parentUsersId,  //公司账号id
          usersid: this.$route.query.usersid,     //用户id
          truename: '',  //姓名
          username: '',   //账号
          lockState: '',    //状态
        }
      }
    },
    watch: {
      purviewids(val){
        console.log(val)
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
//      查询
      getData(){
        //用户信息查询
        this.$axios.get('/api/back/users/' + this.form.usersid, {params: {usersid: this.form.usersid}})
          .then((response) => {
            console.log(response)
            let data = response.data.data;
            this.form.truename = decodeURIComponent(data.truename);
            this.form.username = data.username;
            this.form.lockState = data.lockState;
            this.powerShow()
          })
          .catch(function (error) {
            console.log(error);
          });
        //用户权限查询
        this.$axios.get('/api/back/purview/' + this.form.usersid)
          .then((response) => {
            console.log("权限")
            console.log(response)
            let data = response.data.data;
            data.forEach((item, i) => {
              this.purviewids.push(item.purviewid)
            })
            this.powerShow();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //添加权限弹窗
      purviewidsAlert(){
        this.purviewidsstate = !this.purviewidsstate;
      },
      //保存
      preservationFn(){
        this.purviewidsAlert();
        this.powerShow();
      },
      //权限展示
      powerShow(){
        let _this = this;
        this.powerTag = [];
        this.powerdata.forEach(function (item, i) {
          _this.purviewids.forEach(function (tem, s) {
            if (item.key === tem) {
              _this.powerTag.push(item.label)
            }
          })
        })
      },
      //修改提交
      onSubmit() {
        //修改用户信息
        let fromdata = {
          usersid: this.form.usersid,
          parentUsersId: this.form.parentUsersId,
          truename: escape(this.form.truename),
          username: this.form.username,
          type: 2,
        }

        // 修改权限
        let setPurview = {
          purviewids: this.purviewids.join(","),
          usersid: this.form.usersid
        }
        this.$axios.post('/api/back/purview', qs.stringify(setPurview), {
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).then((response) => {

          console.log(response.data.errcode)
          //权限修改成功后
          if (response.data.errcode === 0) {
            this.$axios.post('/api/back/users/role', fromdata).then((response) => {
              console.log(response)
              this.$message({
                type: 'success',
                message: "修改成功"
              });
              history.go(-1)
            }).catch(function (error) {
              console.log(error);
            });
          }
        }).catch(function (error) {
          console.log(error);
        });


      },
      //禁用
      disableFn() {
        let _this = this;
        let messageText = [];
        if (this.form.lockState == 0) {
          messageText[0] = '禁用账号后，本账号的网址、医生账号、会员账号都不可继续使用！';
          messageText[1] = '禁用成功！';
        } else {
          messageText[0] = '启用账号后，本账号的网址、医生账号、会员账号都可继续使用！';
          messageText[1] = '启用成功！';
        }
        this.$confirm(messageText[0], '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/back/users', {usersid: this.$route.query.usersid})
            .then((response) => {
              console.log(response)
              this.$message({
                type: 'success',
                message: messageText[1]
              });
              history.go(-1)
            })
            .catch(function (error) {
              console.log(error);
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });
        })
      },
      //重置密码
      resetFn(){
        this.$confirm('重置密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //  发送请求
          this.$message({
            type: 'success',
            message: '重置成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });
      }
    },
  }
</script>

<style lang="scss">
  .alert_box_transfer {
    background: #eee;
    border: 1px #bbb solid;
    display: block;
    width: 530px !important;
    padding: 30px;
    position: absolute;
    border-radius: 4px;
    top: 34%;
    left: 50%;
    transform: translate(-50%, -50%);

  .preservation_but {
    float: right;
    margin-top: 20px;
  }

  }
</style>
