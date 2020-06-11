import backTop from '.././components/content/backTop/BackTop.vue'

export const BackTop = {
  components:{
    backTop
  },
  data(){
    return{
      showBackTop: false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    listenShowBackTop(position){
      if(position.y <= -1000)
        this.showBackTop = true
      else
        this.showBackTop = false
    }
  }
}
