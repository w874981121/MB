<!-- 上传视频-->
<template>
  <div class="new-announcement m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/expertlh' }">专家讲堂</el-breadcrumb-item>
      <el-breadcrumb-item>上传视频</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="edit mt20">
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="标题：">
          <el-input v-model="form.truename"></el-input>
        </el-form-item>
      </el-form>
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
        form: {
          datatext: '',
          truename: '',
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
      onSubmit(){
        let formdata = {
          title:'',
          content:'',
        }
        this.$axios.post('/api/back/article', formdata).then((response) => {

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
