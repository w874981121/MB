<template>
  <div id="contentbox">
    <div class="top">

    </div>
    <div class="nav">
      <NavList></NavList>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import NavList from '../components/NavList.vue'
  export default {
    name:'contentbox',
    components: {
      NavList
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss" type="text/css">
  #contentbox {
    .top {
      width: 100%;
      height: 60px;
      background: #ccc;
      z-index: 9;
    }
    .nav {
      width: 200px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      padding-top: 60px;
    }
    .content {
      width: 100%;
      box-sizing: border-box;
      padding-left: 200px;
      overflow: hidden;
    }
  }
</style>
