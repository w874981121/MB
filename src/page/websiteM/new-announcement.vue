<!--新建公告-->

<template>
  <div class="new-announcement m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/enterprisa' }">公司公告</el-breadcrumb-item>
      <el-breadcrumb-item>新建公告</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="edit mt20">
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="标题：">
          <el-input v-model="form.truename" :maxlength="maxNumber"></el-input>
        </el-form-item>
      </el-form>

      <div  v-loading="imageLoading" element-loading-text="请稍等，图片上传中">
        <quill-editor class="mt20" ref="newEditor" v-model="form.content" :config="editorOption"></quill-editor>

        <el-upload style="display:none"  :action="upimgUrl" name="imagePath" :show-file-list="false" :before-upload='newEditorbeforeupload'  :on-success='newEditorSuccess'
                   ref="uniqueId" id="uniqueId">
        </el-upload >
      </div>
      <span style="color: #cccccc">（内容图片总大小不超过15M）</span>
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
  import * as Quill from 'quill'
  export default {
    name: 'new-announcement',
    data(){
      return {
        imageLoading:false,
        upimgUrl: this.$urlapi + '/back/article/image',
        maxNumber: 100,
        editorOption: {},          // 编辑器的配置
        form: {
          truename: '',
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
      var imgHandler = async function(state) {
        if (state) {
          var fileInput =document.querySelector('#uniqueId input') //隐藏的file元素
          fileInput.click() //触发事件
        }
      }
      this.$refs.newEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
    },
    methods: {
      newEditorbeforeupload(file){

        const isJPG = file.type === 'image/jpeg' ||file.type ===  'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        if(isJPG && isLt2M)this.imageLoading =true
        return isJPG && isLt2M;
      },

      //上传图片回调
      newEditorSuccess(response, file, fileList){
        if(response.errcode===0){
          console.log(this.$refs.newEditor)
          this.addImgRange = this.$refs.newEditor.quill.getSelection()
          this.$refs.newEditor.quill.insertEmbed(this.addImgRange != null?this.addImgRange.index:0, 'image',this.$api + "/images/" +response.data, Quill.sources.USER)
        }
        this.imageLoading =false
      },

      onSubmit(){
        let formdata = {
          categoryId:1,
          title: this.form.truename,
          content:  this.form.content.toString(),
          sortCode:1,
        }



        if(formdata.title.length <= 0){
          this.$message({
            type: 'error',
            message: "标题不能为空"
          });
          return
        }

        if(formdata.content.length <= 0){
          this.$message({
            type: 'error',
            message: "内容不能为空"
          });
          return
        }

        this.$axios.post('/api/back/article', formdata).then((response) => {

          if(response.data.errcode === 0){
            this.$message({
              showClose: true,
              type: "success",
              message: '创建成功！'
            });
            history.go(-1)
          }

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
