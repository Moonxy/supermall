<template>
  <div class="tab-bar-item" @click="ItemClick">
    <div v-if="!isActive">
      <slot name="item-img"></slot>
    </div>
    <div v-else>
      <slot name="item-img-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default{
    name:'TabBarItem',
    props:{
      path: String,
      activeColor:{
        type: String,
        default: 'deepPink'
      }
    },
    data(){
      return {
        /* isActive: true */
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods:{
      ItemClick(){
        this.$router.push(this.path)
      }
    }
  }
</script>

<style>
  .tab-bar-item{
    flex: 1;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-top: 2px;
  }
  .active{
    color: orangered;
  }
</style>
