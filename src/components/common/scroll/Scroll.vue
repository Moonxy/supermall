<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'

  export default{
    name: 'Scroll',
    mounted(){
      this.scroll = new Bscroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      /* 滚动位置*/
      if(this.probeType === 2 || this.probeType ===3){
        this.scroll.on('scroll', (position) => {
          /* console.log(position) */
          this.$emit('scroll', position)
        })
      }

      /* 上拉加载更多*/
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          this.$emit('initMore')
        })
      }
    },
    props:{
      /* 是否监听滚动*/
      probeType:{
        type: Number,
        default: 0
      },
      /* 是否上拉加载更多*/
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll: null,
      }
    },
    methods:{
      /* 回到顶部*/
      scrollTo(x, y, time=300){
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        /* console.log('-----') */
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      }
    }
  }
</script>

<style>
</style>
