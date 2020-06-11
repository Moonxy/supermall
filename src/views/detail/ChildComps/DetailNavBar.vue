<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" />
      </div>
      <div slot="center" class="center">
        <div v-for="(item, index) in titles" :key="index" @click="ItemClick(index)" :class="{isActive: currentIndex === index}"  class="centerItem">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '../../../components/common/navbar/Navbar.vue'

  export default{
    components:{
      NavBar
    },
    data(){
      return{
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods:{
      ItemClick(index){
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .center{
    display: flex;
    font-size: 14px;
  }
  .centerItem{
    flex: 1;
  }
  .isActive{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 12px;
  }
</style>
