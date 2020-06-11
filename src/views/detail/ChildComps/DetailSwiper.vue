<template>
  <swiper class = detailSwiper>
    <swiper-item v-for="item in swiperImg">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '../../../components/common/swiper'

  export default{
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      swiperImg:{
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detailSwiper{
    height: 300px;
    overflow: hidden;
  }
</style>
