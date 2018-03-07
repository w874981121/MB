<!--修改公告-->
<template>
  <div class="new-announcement m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/enterprisa' }">企业公告</el-breadcrumb-item>
      <el-breadcrumb-item>修改公告</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="edit mt20">
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="标题：">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-form>
      <quill-editor ref="myTextEditor" v-model="form.content" :config="editorOption"></quill-editor>
    </div>
    <!--<div class="block mt20">-->
      <!--<span class="demonstration">上线时间：</span>-->
      <!--<el-date-picker v-model="form.datatext" type="datetime" placeholder="选择上线时间"></el-date-picker>-->
    <!--</div>-->
    <el-form ref="form" class="mt20">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  import { VueEditor } from 'vue2-editor'
  export default {
    name: 'new-announcement',
    data(){
      return {
        editorOption: {},          // 编辑器的配置
        form: {
          title: '',
          content: '',             // 编辑器的内容
          datatext: '',
        },
      }
    },
    watch: {
      content(val){
        console.log(val)
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        console.log(this.$route.query.articleId)
        this.$axios.get('/api/back/article/' + this.$route.query.articleId).then((response)=> {
          console.log(response)
          let data = response.data.data;
          this.form.title = data.title;
          this.form.content = data.content;
        }).catch(function (error) {
          console.log(error);
        });
      },

      onSubmit(){
        let formdata = {
          articleId: this.$route.query.articleId,
          title: this.form.title,
          content: this.form.content,
          sortCode:1,
        }
        this.$axios.post('/api/back/article', formdata).then((response) => {
          console.log(response)
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          history.go(-1)
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    components: {
      VueEditor
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" type="text/css">
  .edit {
    width: 660px;
    height: auto;
  }

  .quill-editor {
    height: 300px;

    .ql-container {
      height: 234px;
    }
  }
  .ql-snow .ql-tooltip{
    position: absolute;
  }
  .ql-editor.ql-blank::before {
    content: "编辑公告内容" !important;
  }

  .limit {
    height: 30px;
    border: 1px solid #ccc;
    line-height: 30px;
    text-align: right;
    span {
      color: #ee2a7b;
    }
  }

  .ql-snow .ql-editor img {
    max-width: 480px;
  }

  .ql-editor .ql-video {
    max-width: 480px;
  }
</style>
