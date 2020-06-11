<template>
  <div class="swiper">
    <div>
      <slot></slot>
    </div>

    <div class="indicator">
      <slot name="indicator">
        <div v-for="(item, index) in SlideCount" :key="index" class="indi-item"></div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Swiper',
    data(){
      return{
        SlideCount: 0
      }

    },
    methods:{
    	GetNumber(){
    		this.SlideCount = document.getElementsByClassName('swiper-item').length
    	}
    },
    mounted: function(){
      this.GetNumber()
    }
  }
</script>

<style>
  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }
</style>
