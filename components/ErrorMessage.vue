<template>
  <div class="w-full py-10 text-center">
    <h1 class="text-red-500 font-semibold font text-2xl">{{ errMsg }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  errMsg: string;
}>();
</script>
