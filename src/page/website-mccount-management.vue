<template>
	<div>
		<Search></Search>
		<div class="tableCss">
			<el-table :data="tableData3" height="600" border stripe style="width: 100%" :row-class-name="tableRowClassName">
				<el-table-column align="center" prop="date" label="编号" width="180">
				</el-table-column>
				<el-table-column align="center" prop="date" label="创建日期" width="180">
				</el-table-column>
				<el-table-column align="center" prop="name" label="公司名称" width="180">
				</el-table-column>
				<el-table-column align="center" prop="address" label="网站地址地址">
				</el-table-column>
				<el-table-column align="center" prop="address" label="账号">
				</el-table-column>
				<el-table-column align="center" prop="address" label="初始密码">
				</el-table-column>
				<el-table-column align="center" prop="address" label="联系人">
				</el-table-column>
				<el-table-column align="center" prop="address" label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-pagination background layout="prev, pager, next" @current-change="getPage" :total="100"></el-pagination>
	</div>

</template>

<script type="text/javascript">
	import Search from '../components/Search.vue'
	export default {
		name: 'website-mccount-management',
		data() {
			return {
				tableData3: [{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}]
			}
		},
		methods: {
			tableRowClassName({
				row,
				rowIndex
			}) {
				if(rowIndex === 1) {
					return 'warning-row';
				} else if(rowIndex === 3) {
					return 'success-row';
				}
				return '';
			},
			getPage(a){
				console.log(a)
			}
		},
		components: {
			Search
		}
	}
</script>

<style>
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