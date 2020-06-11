<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content">
      <cart-list></cart-list>
    </scroll>
  </div>
</template>

<script>
  import NavBar from '../.././components/common/navbar/Navbar.vue'
  import CartList from './ChildComps/CartList.vue'
  import Scroll from '../.././components/common/scroll/Scroll.vue'

  /* store中的getters映射到computed中*/
  import {mapGetters} from 'vuex'

  export default{
    name: "Cart",
    components:{
      NavBar,
      CartList,
      Scroll
    },
    computed:{
      ...mapGetters({
        cartLength: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  
  .cart{
    height: 100vh;
  }
  
  .content{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
  }
</style>
