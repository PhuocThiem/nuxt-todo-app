<script setup lang="ts">
const page: string = 'page';
</script>

<template>
  <div class="flex flex-col items-start justify-center border-b-2 h-16">
    <h1 class="text-2xl font-bold pl-3">
      <slot :page="page"></slot>
    </h1>
  </div>
</template>
