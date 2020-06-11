<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imgload">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '../../.././components/common/swiper'
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    data(){
      return {
        isLoad: true
      }
    },
    methods:{
      imgload(){
        if(this.isLoad){
          this.$emit('swiperImgLoad')
          this.isLoad = !this.isLoad
        }
      }
    }
  }
</script>

<style scoped>

</style>
