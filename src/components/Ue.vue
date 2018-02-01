<template>
  <div class="ue">
    <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
    <button>
      打印
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
  import {quillEditor} from 'vue-quill-editor'
  export default {
    data: function () {
      return {
        content: '',
        editorOption: {
//          status: false,          // 禁用底部状态栏
//          initialValue: 'Hello BBK',      // 设置初始值
//          renderingConfig: {
//            codeSyntaxHighlighting: true,   // 开启代码高亮
//            highlightingTheme: 'atom-one-light' // 自定义代码高亮主题
//          }
        }
      }
    },
    methods: {
      gets(){
        console.log(content)
        console.log()
      }
    },
    components: {
      quillEditor
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  .ue{
    width: 500px;
  }
</style>
