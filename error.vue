<script setup lang="ts">
useHead({
  titleTemplate: 'Error',
  htmlAttrs: {
    lang: 'en',
  },
});

defineProps({
  error: Object,
});
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-teal-600 bg-cyan-500">
    <h1 class="text-9xl font-bold text-white">{{ error?.statusCode }}</h1>
    <p class="text-6xl text-white">{{ error?.statusMessage }}</p>
    <NuxtLink class="bg-blue-500 px-5 py-1 text-white rounded text-2xl hover:bg-blue-900 shadow-xl mt-2" to="/"
      >Back to Home</NuxtLink
    >
  </div>
</template>
