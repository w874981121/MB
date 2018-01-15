<template>
	<div id="app">
			<router-view/>
	</div>
</template>

<script>
	import NavList from './components/NavList.vue'
	export default {
		name: 'app',
	}
</script>

<style scoped lang="scss">
	#app {
		height: 100%;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/*text-align: center;*/
		color: #2c3e50;
	}
</style>
