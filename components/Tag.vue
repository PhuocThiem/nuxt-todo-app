<template>
  <span
    class="flex flex-col justify-center items-center text-white w-fit px-1 rounded font-semibold"
    :class="isCompleted ? 'bg-emerald-500' : 'bg-stone-300'"
    >{{ isCompleted ? "Done" : "Todo" }}</span
  >
</template>

<script setup lang="ts">
defineProps({
  isCompleted: Boolean,
});
</script>
