<template>
  <div class="home">
    <navbar class="home-nav">
      <div slot="left"></div>
      <div slot="center">购物街</div>
      <div slot="right"></div>
    </navbar>
    <tab-control ref="tabControl1" class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" @scroll="contentScroll" @initMore="initMore" :probe-type=3 :pullUpLoad="true">
      <!-- <Cswiper :banners=banners></Cswiper> -->
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature></feature>
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <good-list :Goodsdata="showGoods"></good-list>
    </scroll>

    <!-- 监听组件的原生事件时,需要加上.native才能监听-->
    <back-top @click.native="backClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
  import RecommendView from './childComps/RecommendView.vue'
  import Feature from './childComps/feature.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  /* import Cswiper from './childComps/Cswiper.vue' */

  import Navbar from '../../components/common/navbar/Navbar.vue'
  import GoodList from '../../components/content/goods/GoodsList.vue'
  import TabControl from '../../components/content/tabControl/TabControl.vue'
  import Scroll from '../../components/common/scroll/Scroll.vue'

  import {getHomeMutidata, getHomeGoods} from '../../network/home.js'
  import {debounce} from '../../common/utils.js'
  import {BackTop} from '../../common/mixin.js'

  export default{
    name: 'Home',
    mixins:[BackTop],
    components:{
      Navbar,
      RecommendView,
      Feature,
      TabControl,
      HomeSwiper,
      GoodList,
      Scroll,
    },
    mounted(){
      /* 请求多个数据*/
      this.getHomeMutidata()

      /* 请求商品数据*/
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      /* 事件总线*/
      /* console.log(this.$refs.scroll.scroll) */
     const refresh = debounce(this.$refs.scroll.refresh, 100)
     refresh()
      this.$bus.$on('homeItemImgLoad', () => {
        refresh()
      })
    },

    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      },
    },

    methods:{
      /* 事件监听相关*/
      tabClick(index){
        if(index === 0)
          this.currentType = 'pop'
        else if(index === 1)
          this.currentType = 'new'
        else if(index === 2)
          this.currentType = 'sell'

        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      backClick(){
        this.$refs.scroll.scrollTo(0, 0, 500)
      },

      contentScroll(position){
        this.listenShowBackTop(position)

        if(-position.y >= this.tabOffsetTop)
          this.isTabFixed = true
        else
          this.isTabFixed = false
      },

      initMore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },

      /* tabControl吸顶效果*/
        swiperImgLoad(){
        /* 所有的组件都有一个属性$el: 用于获取组件中的元素*/
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        /* console.log(this.tabOffsetTop) */
      },

      /* 网络请求相关*/
      getHomeMutidata(){
        getHomeMutidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res =>{
           this.goods[type].list.push(...res.data.list)
           this.goods[type].page += 1
        })
      }
    },

    data(){
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        setY: 0
      }
    },

    /* 保存离开时的状态*/
    activated(){
      this.$refs.scroll.scroll.refresh()
      this.$refs.scroll.scroll.scrollTo(0, this.setY, 0)
    },
    deactivated(){
      this.setY = this.$refs.scroll.scroll.y
      /* console.log(this.setY) */
    }
  }
</script>

<style scoped>
   .home{
      /* padding-top: 44px; */
      height: 100vh;
      position: relative;
    }
    .home-nav{
      background-color: var(--color-tint);
      color: #fff;
    }
  .content{
     position: absolute;
     top: 44px;
     bottom: 49px;
     left: 0;
     right: 0;
     overflow: hidden;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
