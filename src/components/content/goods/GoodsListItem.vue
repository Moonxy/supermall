<template>
  <div class="goods-item">
    <img :src="showImg" @load="imgLoad" @click="GoodsItemClick"/>
    <div class="goods-info">
       <p>{{GoodsItem.title}}</p>
       <span class="price">{{GoodsItem.price}}</span>
       <span class="collect">{{GoodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    name:"GoodsListItem",
    props:{
      GoodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
	methods:{
		imgLoad(){
      if(this.$route.path.indexOf('/home') !== -1)
        this.$bus.$emit('homeItemImgLoad')
      else if(this.$route.path.indexOf('/detail') !== -1)
        this.$bus.$emit('detailItemLoad')
		},
    GoodsItemClick(){
      this.$router.push('/detail/' + this.GoodsItem.iid)
    }
	},
  computed:{
    showImg(){
      return this.GoodsItem.image || this.GoodsItem.show.img
    }
  }

  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../.././assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
