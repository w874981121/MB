<!-- 上传视频-->
<template>
  <div class="new-announcement m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/expertlh' }">专家讲堂</el-breadcrumb-item>
      <el-breadcrumb-item>上传视频</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="edit mt20">
      <div class="edit mt20">
        <el-form ref="form" :model="form" label-width="60px">
          <el-form-item label="标题：">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <el-upload
        class="upload-demo"
        action="/api/back/article/video"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        name="imagePath"
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传视频</el-button>
      </el-upload>
      <quill-editor class="mt20" ref="myTextEditor" v-model="form.content" :config="editorOption"></quill-editor>
    </div>

    <div class="block mt20">
      <span class="demonstration">上线时间：</span>
      <el-date-picker v-model="datatext" type="datetime" placeholder="选择上线时间"></el-date-picker>
    </div>
    <el-form ref="form" class="mt20">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import { VueEditor } from 'vue2-editor'
  export default {
    name: 'new-expert-lecture-hall',
    data(){
      return {
        fileList: [],
        datatext:'',
        form: {
          title: '',
          content: '',             // 编辑器的内容
          truename: '',
          outUrl:'',
        },
      }
    },
    watch: {
      content(val){
        console.log(val)
      }
    },
    mounted(){

    },
    methods: {
      beforeAvatarUpload(file, fileList){
        console.log(file)
      },
      handleAvatarSuccess(file, fileList){
        if(file.errcode == 0 ){
          this.form.outUrl  = file.data
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //保存
      onSubmit(){
        let formdata = {
          title:this.form.title,
          outUrl: this.form.outUrl,
          content:this.form.content,
          categoryId: 2,   //专家讲堂
          sortCode: 1,
        }
        this.$axios.post('/api/back/article', formdata).then((response) => {
          console.log(response)
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
    content: "输入培训讲解内容" !important;
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
