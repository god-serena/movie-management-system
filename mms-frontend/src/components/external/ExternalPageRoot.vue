<script setup>
</script>

<template>
  <div class="container-fluid p-0 vh-100 position-relative">
    <div class="bg position-absolute w-100 h-100"></div>
    <div class="container-fluid position-relative w-100 h-100">
        <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
  .bg {
    background-image: url('assets/home_page_bg.jpg');
    filter: brightness(0.3);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
