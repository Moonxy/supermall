<template>
  <div class="cart-list">
    <cart-list-item v-for="(item, index) in cartlist" :key="index" :item-info="item"></cart-list-item>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import CartListItem from './CartListItem.vue'

  export default{
    name: "CartList",
    computed:{
      ...mapGetters({
        cartlist: 'cartlist'
      })
    },
    components:{
      CartListItem
    }
  }
</script>

<style scoped>
</style>
