<!-- 修改上传视频-->
<template>
  <div class="new-announcement m20 fsz14">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/expertlh' }">专家讲堂</el-breadcrumb-item>
      <el-breadcrumb-item>修改上传视频</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="edit mt20">
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="标题：">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-form>
      <div style="overflow: hidden">
        <div class="fl">上传图片：</div>
        <el-upload
          class="avatar-uploader mb18 fl"
          :action="upimgUrl"
          v-loading="loading"
          name="imagePath"
          :show-file-list="false"
          :on-success="handleAvatarSuccessImg"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUploadImg">
          <img v-if="form.imgUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        <span style="color: #F56C6C">视频只支持MP4格式</span>
      </el-upload>
      <div v-loading="imageLoading" element-loading-text="请稍等，图片上传中">

        <quill-editor class="mt20" ref="newEditor" v-model="form.content" :config="editorOption"></quill-editor>

        <el-upload style="display:none" :action="upimgUrl" name="imagePath" :show-file-list="false" :before-upload='newEditorbeforeupload' :on-success='newEditorSuccess'
                   ref="uniqueId" id="uniqueId">
        </el-upload>
      </div>

    </div>

    <el-form ref="form" class="mt20">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import { VueEditor } from 'vue2-editor'
  import * as Quill from 'quill'
  export default {
    name: 'new-expert-lecture-hall',
    data(){
      return {
        imageLoading: false,
        upimgUrl: this.$urlapi + '/back/article/image',
        datatext: '',
        loading:false,
        content: '',             // 编辑器的内容
        editorOption: {},          // 编辑器的配置
        fileList:[],
        imageUrl:'',
        form: {
          title: '',
          content:'',
          imgUrl:'',
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
      var imgHandler = async function(state){
        if (state) {
          var fileInput = document.querySelector('#uniqueId input') //隐藏的file元素
          fileInput.click() //触发事件
        }
      }
      this.$refs.newEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
    },
    methods: {
      getData(){
        console.log(this.$route.query.articleId)
        this.$axios.get('/api/back/article/' + this.$route.query.articleId).then((response)=> {
          console.log(response)
          let data = response.data.data;
          this.form.title = data.title;
          this.form.content = data.content;
        this.imageUrl = this.$api + "/images/" + data.imgUrl
        this.form.imgUrl = data.imgUrl
        if(!!data.outUrl){
          this.fileList.push({
            name:'视频文件',
            outUrl: data.outUrl,
          })
        }

        }).catch(function (error) {
          console.log(error);
        });
      },


      newEditorbeforeupload(file){
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (! isJPG) {
          this.$message.error('上传图片只能是 JPG或PNG 格式!');
        }
        if (! isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        if (isJPG && isLt2M) this.imageLoading = true
        return isJPG && isLt2M;
      },
      //上传图片回调
      newEditorSuccess(response, file, fileList){
        if (response.errcode === 0) {
          console.log(this.$refs.newEditor)
          this.addImgRange = this.$refs.newEditor.quill.getSelection()
          this.$refs.newEditor.quill.insertEmbed(this.addImgRange != null ? this.addImgRange.index : 0, 'image', this.$api + "/images/" + response.data, Quill.sources.USER)
        }
        this.imageLoading = false
      },

//上传文件之前
      beforeAvatarUploadImg(file) {
        console.log(file.type)
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.loading = false;
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.loading = false;
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        this.loading = true;
        return isJPG && isLt2M;
      },

      //文件上传成功
      handleAvatarSuccessImg(res, file) {
        if(res.errcode === 0){
          this.$message({
            type: 'success',
            message: "上传成功"
          });
          this.imageUrl = this.$api + "/images/" + res.data;
          this.form.imgUrl = res.data;
        }else{
          this.$message({
            type: 'error',
            message: "上传失败"
          });
        }
        this.loading = false;

      },
      //上传文件失败
      handleAvatarError(res, file){
        this.loading = false;
        this.$message({
          type: 'error',
          message: "上传失败"
        });
      },
      //视频
      beforeAvatarUpload(file, fileList){
        console.log(file)
      },
      handleAvatarSuccess(file, fileList){
        if(file.errcode == 0 ){
          this.form.outUrl  = file.data
        }
      },
      handleRemove(file, fileList) {
        this.form.outUrl = ''
        console.log(file, fileList);
      },
      handlePreview(file) {
        window.open(this.$api +"/images/"+ file.outUrl);
        console.log(file.outUrl);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

      //保存
      onSubmit(){
        let formdata = {
          articleId: this.$route.query.articleId,
          title:this.form.title,
          outUrl: this.form.outUrl,
          content:this.form.content,
          imgUrl:this.form.imgUrl,
          categoryId: 2,
          sortCode: 1,
        }
        this.$axios.post('/api/back/article', formdata).then((response) => {
          if(response.data.errcode === 0){
            this.$message({
              showClose: true,
              type: "success",
              message: '保存成功！'
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
