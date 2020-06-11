<template>
  <div class="goods">
    <goods-list-item v-for="item in Goodsdata" :GoodsItem="item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'
  export default{
    name:'GoodsList',
    components:{
      GoodsListItem
    },
    props:{
      Goodsdata:{
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
