<!--
复用组件：查询头
功能：1.跳转新建页面
     2.发送查询请求，
接收参数：  searchData   参数类型 object
           参数{
             path：新建页路由地址
             url:  查询地址
           }
           参数向父组件传递定义 "response"
父组件使用定义：<Search :searchData="" @response=""> </Search>
-->

<template>
	<div class="searchBox">
		<el-form :inline="true" class="demo-form-inline mt10">
			<el-button class="fl ml10" type="primary" @click="newAccount">{{searchData.newname ? searchData.newname : '新建账号'}}</el-button>
      <el-form-item class="fr">
        <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
			<el-form-item :label="searchData.name" class="fr">
				<el-input v-model="text" :placeholder="searchData.placeholder"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'searchBox',
    props: {
      searchData: {
        type: Object,      //objectl类型
        required: true,    //必传
      }
    },
    data() {
			return {
         path: this.searchData.path,
         url:this.searchData.url,
         text:''
			}
		},
		methods: {
			onSubmit() {    //绑定查询   向上层返回查询得到的数据
        this.$emit('response', this.text);
			},
      newAccount(){    //跳转至指定新建内容页面
			  console.log(this)
        this.$router.push({path: this.path})
      }
		}
	}
</script>

<style scoped lang="scss">

</style>
