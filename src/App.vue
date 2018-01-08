<template>
  <div id="app">
    <div class="top">

    </div>
    <div class="nav">
      <NavList></NavList>
    </div>
    <div class="content">
      <!--<router-view/>-->
    </div>
  </div>
</template>

<script>
import NavList from './components/NavList.vue'
export default {
  name: 'app',
  components: {
      NavList
    }
}
</script>

<style scoped lang="scss">
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  *{
  	margin: 0;
  	padding: 0;
  }
}
.top{
  width: 100%;
  height: 80px;
  background: #ccc;
}
</style>
