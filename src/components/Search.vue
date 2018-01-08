<template>
	<div class="searchBox">
		<el-form :inline="true" :model="formInline" class="demo-form-inline mt20">
			<el-button class="fl ml10" type="primary">新建账号</el-button>
			<el-form-item label="公司名称">
				<el-input v-model="formInline.user" placeholder="请输入公司名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
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