<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
</script>

<style>
  #tabbar{
    display: flex;
    text-align: center;
    background-color: #f6f6f6;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0 -1px 1px rgba(100,100,100,0.1);
  }
</style>
