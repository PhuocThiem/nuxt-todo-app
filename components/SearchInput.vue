<script setup lang="ts">
defineProps<{
  searchLabel: string;
  placeholder: string;
  title?: string;
}>();

defineEmits<{
  (e: 'update:title', text: string): void;
}>();
</script>
<template>
  <div class="w-1/3 shadow-sm">
    <label for="price" class="block text-sm font-medium text-gray-700">{{ searchLabel }}</label>
    <input
      :value="title"
      type="text"
      :placeholder="placeholder"
      @input="$emit('update:title', ($event.target as HTMLInputElement).value)"
      class="w-full bg-blend-lighten bg-slate-100 focus:bg-transparent border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px]"
      :class="{ 'bg-transparent': title }"
    />
  </div>
</template>
