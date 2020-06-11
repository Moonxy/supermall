<template>
  <div class="detail">
    <detailNavBar @titleClick="titleClick" ref="detailNavBar"></detailNavBar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type=3>
      <detailSwiper :swiperImg="swiperImg"></detailSwiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <shop-info :shop="shop"></shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="detailParamInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="detailCommentInfo"></detail-comment-info>
      <goods-list :Goodsdata="detailRecommands" ref="detailRecommands"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="showBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import detailNavBar from './ChildComps/DetailNavBar.vue'
  import detailSwiper from './ChildComps/DetailSwiper.vue'
  import detailBaseInfo from './ChildComps/DetailBaseInfo.vue'
  import shopInfo from './ChildComps/DetailShopInfo.vue'
  import detailGoodsInfo from './ChildComps/DetailGoodsInfo.vue'
  import detailParamInfo from './ChildComps/DetailParamInfo.vue'
  import detailCommentInfo from './ChildComps/DetailCommentInfo.vue'
  import goodsList from '../.././components/content/goods/GoodsList.vue'
  import detailBottomBar from './ChildComps/DetailBottomBar.vue'

  import scroll from '../.././components/common/scroll/Scroll.vue'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from '../.././network/detail.js'
  import {debounce} from '../.././common/utils.js'
  import {BackTop} from '../.././common/mixin.js'

  export default{
    name:"Detail",
    mixins:[BackTop],
    data(){
      return{
        id: null,
        swiperImg: null,
        goods: {},
        shop: {},
        detailInfo: {},
        refresh: function(){},
        paramInfo: {},
        commentInfo: {},
        detailRecommands: [],
        titleTipYs: [],
        getTitleYs: function(){}
      }
    },
    mounted(){
      this.id = this.$route.params.id

      /* 请求详情数据*/
      getDetail(this.id).then(res => {
        /* console.log(res) */
        const data = res.result
        this.swiperImg = data.itemInfo.topImages

        /* 获取商品信息*/
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        /* 获取店铺信息*/
        this.shop = new Shop(data.shopInfo)

        /*  保存商品详情数据*/
        this.detailInfo = data.detailInfo

        /* 保存参数信息*/
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        /* 取出评论信息*/
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })

        /* 请求推荐数据*/
        getRecommend().then(res => {
          this.detailRecommands = res.data.list
        })

        this.refresh1 = debounce(this.$refs.scroll.refresh, 100)

        this.refresh2 = debounce(this.$refs.scroll.refresh, 100)

        this.$bus.$on('detailItemLoad', () => {
          this.refresh2()
        })

        this.getTitleYs = debounce(() => {
          this.titleTipYs = []
          this.titleTipYs.push(0)
          this.titleTipYs.push(-this.$refs.detailParamInfo.$el.offsetTop)
          this.titleTipYs.push(-this.$refs.detailCommentInfo.$el.offsetTop)
          this.titleTipYs.push(-this.$refs.detailRecommands.$el.offsetTop)
        }, 100)
    },

    components:{
      detailNavBar,
      detailSwiper,
      detailBaseInfo,
      shopInfo,
      scroll,
      detailGoodsInfo,
      detailParamInfo,
      detailCommentInfo,
      goodsList,
      detailBottomBar
    },
    methods:{
      imageLoad(){
        this.refresh1()
        this.getTitleYs()
      },

      titleClick(index){
        this.$refs.scroll.scrollTo(0, this.titleTipYs[index], 300)
      },

      contentScroll(position){
        if(position.y > this.titleTipYs[1])
            this.$refs.detailNavBar.currentIndex = 0
        else if(position.y <= this.titleTipYs[1] && position.y > this.titleTipYs[2])
            this.$refs.detailNavBar.currentIndex = 1
        else if(position.y <= this.titleTipYs[2] && position.y > this.titleTipYs[3])
            this.$refs.detailNavBar.currentIndex = 2
        else if(position.y <= this.titleTipYs[3])
            this.$refs.detailNavBar.currentIndex = 3

        this.listenShowBackTop(position)
      },

      addToCart(){
        const product = {}
        product.image = this.swiperImg[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        /* 商品标识iid*/
        product.iid = this.id
        /* console.log(product) */
        this.$store.dispatch('addCart', product)
      }
    }

  }
</script>

<style scoped>
  .detail{
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }

  .content{
     position: absolute;
     top: 44px;
     bottom: 51px;
     left: 0;
     right: 0;
     overflow: hidden;
  }
</style>
