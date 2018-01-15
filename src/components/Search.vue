<template>
	<div class="searchBox">
		<el-form :inline="true" :model="formInline" class="demo-form-inline mt10">
			<el-button class="fl ml10" type="primary" @click="newAccount">新建账号</el-button>
      <el-form-item class="fr">
        <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
			<el-form-item label="公司名称" class="fr">
				<el-input v-model="formInline.user" placeholder="请输入公司名称"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'searchBox',
		data() {
			return {
				inputName: '',
				formInline: {
					user: '',
					region: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
      newAccount(){
			  console.log(this)
        this.$router.push({name: "newaccount"})
      }
		}
	}
</script>

<style scoped lang="scss">
	.searchBox {
		margin: 10px;
		/*background: #ccc;*/
		border-bottom: 1px dashed #ccc;
		overflow: hidden;
		.box {
			overflow: hidden;
		}
	}
</style>
