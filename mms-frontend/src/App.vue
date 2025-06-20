<script setup>
const props = defineProps({
  movies: {
    type: Array,
    default: []
  }
})
</script>
<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
