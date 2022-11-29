<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-teal-600 bg-cyan-500">
    <h1 class="font-bold text-white title">{{ error?.statusCode }}</h1>
    <p class="text-white message">{{ error?.statusMessage }}</p>
    <NuxtLink class="link" to="/">Back to Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: Object,
});
</script>

<style scoped lang="scss">
.title {
  font-size: 160px;
}
.message {
  font-size: 4rem;
}
.link {
  background-color: rgb(59 130 246);
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  font-size: 20px;
  &:hover {
    background-color: rgb(30 58 138);
  }
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
