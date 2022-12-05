<template>
  <span
    class="flex flex-col justify-center items-center w-fit px-1 rounded-[2px] font-semibold text-black h-fit min-w-[57px]"
    :class="isCompleted ? 'bg-emerald-500' : 'bg-blue-500' "
    >{{ isCompleted ? "Done" : "Todo" }}</span
  >
</template>

<script setup lang="ts">
defineProps<{
  isCompleted?: boolean,
}>();
</script>
