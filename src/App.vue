<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
	  <main-tabbar/>
  </div>
</template>

<script>
  import MainTabbar from './components/content/MainTabbar/main_tabbar.vue'
  export default{
    name: 'app',
    components:{
      MainTabbar
    }
  }
</script>

<style>
	@import "assets/css/base.css";
</style>
