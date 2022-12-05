<script setup lang="ts">
import { STATUS } from '~~/constants';
defineProps<{
  status: string;
  message: string;
  isVisible: boolean;
}>();
</script>

<template>
  <div v-show="isVisible" class="flex flex-row justify-end w-full">
    <div
      class="flex flex-col h-[60px] border-l-4 bg-slate-100 border-l-emerald-500 w-1/3 bg-gray- absolute top-[85px] z-9999 px-2 py-2 justify-center shadow-lg shadow-gray-400"
      :class="{ 'border-l-red-500': status === STATUS.ERROR }"
    >
      <p
        class="font-bold"
        :class="{ 'text-red-500': status === STATUS.ERROR, 'text-emerald-500': status === STATUS.SUCCESS }"
      >
        {{ status }}
      </p>
      <p>{{ message }}</p>
    </div>
  </div>
</template>
