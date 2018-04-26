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
            <el-input v-model="form.title" :maxlength="maxNumber" placeholder="请填写标题"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="overflow: hidden">
        <div class="fl">上传图片：</div>

        <el-upload
          class="avatar-uploader mb18 fl"
          v-loading="loading"
          :action="upimgUrl"
          name="imagePath"
          :show-file-list="false"
          :on-success="handleAvatarSuccessImg"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUploadImg">
          <img v-if="form.imgUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span style="color: #cccccc">（请上传图片）</span>
      </div>


      <el-upload
        class="upload-demo"
        :action="upimgUrl"
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
        <span style="color: #cccccc">（请上传图片）</span>
        <span style="color: #F56C6C">视频只支持MP4格式</span>
      </el-upload>

      <quill-editor class="mt20" ref="myTextEditor" v-model="form.content" :config="editorOption"></quill-editor>
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
  export default {
    name: 'new-expert-lecture-hall',
    data(){
      return {
        maxNumber: 100,
        upimgUrl: this.$urlapi + '/back/article/image',
        editorOption: {},          // 编辑器的配置
        fileList: [],
        datatext:'',
        loading: false,
        imageUrl:'',
        form: {
          title: '',
          content: '',             // 编辑器的内容
          outUrl:'',
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

    },
    methods: {
      //上传文件之前
      beforeAvatarUploadImg(file) {
        console.log(file.type)
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        this.loading = true;
        if (!isJPG) {
          this.loading = false;
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.loading = false;
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
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
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //保存
      onSubmit(){
        if(this.form.title.length <= 0){
          this.$message({
            type: 'error',
            message: "标题不能为空"
          });
          return
        }

        if(this.form.imgUrl.length <= 0){
          this.$message({
            type: 'error',
            message: "图片不能为空"
          });
          return
        }

        if(this.form.outUrl.length <= 0){
          this.$message({
            type: 'error',
            message: "视频不能为空"
          });
          return
        }
        let formdata = {
          title:this.form.title,
          outUrl: this.form.outUrl,
          content:this.form.content,
          truename: this.cookieFn.get("truename"),
          imgUrl:this.form.imgUrl,
          categoryId: 2,   //专家讲堂
          sortCode: 1,
        }

        this.$axios.post('/api/back/article', formdata).then((response) => {
          if(response.data.errcode === 30004){
            this.$message({
              showClose: true,
              type: "error",
              message: '内容区图片超过限制！'
            });
          return
          }

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
