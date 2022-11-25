<template>
  <span
    class="flex flex-col justify-center items-center text-white w-fit px-1 rounded font-semibold h-fit min-w-[57px]"
    :class="isCompleted ? 'bg-emerald-500' : 'bg-stone-300'"
    >{{ isCompleted ? "Done" : "Todo" }}</span
  >
</template>

<script setup lang="ts">
defineProps({
  isCompleted: Boolean,
});
</script>
