<template>
  <div>
    <swiper class="swiper">
      <swiper-item v-for="(item,index) in banners" class="swiper-item" v-if="currentIndex === index">
        <a href="#">
          <img :src="item.image" />
          <div>{{item.title}}</div>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import Swiper from '../../../components/common/swiper/Swiper.vue'
  import SwiperItem from '../../../components/common/swiper/SwiperItem.vue'

  export default{
    name: 'Cswiper',
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      banners:{
        type: Array,
        default(){
          return []
        }
      },
    },
    data(){
      return{
        currentIndex: 0
      }
    },
    methods:{
      startInterval(){
        let timer = setInterval(() => {
          if(this.currentIndex >= this.SlideCount)
            this.currentIndex = 0
          else
            this.currentIndex++
        },3000)
      }
    },
    mounted: function(){
      this.startInterval()
    }
  }
</script>

<style>
  .swiper{
    display: flex;
    text-align: center;
    margin: 5px;
    font-size: 12px;
    padding: 10px 0 20px;
  }
  .swiper-item{
  }
  .swiper-item img{
    width: 100%;
  }
</style>
