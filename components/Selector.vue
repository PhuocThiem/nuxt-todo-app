<script setup lang="ts">
import { SORT_TYPE } from '~~/constants/sortType';

defineProps<{
  inputLabel: string;
  value?: number;
}>();

defineEmits<{ (e: 'update:value', sortType: number): void }>();
</script>

<template>
  <div class="w-1/4 shadow-sm border-b-sky-900">
    <label for="price" class="block text-sm font-medium text-gray-700">{{ inputLabel }}</label>
    <select
      :value="value"
      @change="$emit('update:value', Number(($event.target as HTMLInputElement).value))"
      class="w-full border-solid border-b-[2px] border-neutral-400 bg-slate-100 focus:bg-transparent focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px]"
      :class="{ 'bg-transparent': value !== 0 }"
    >
      <option v-for="type in SORT_TYPE" :key="type.id" :value="type.id">
        {{ type.type }}
      </option>
    </select>
  </div>
</template>
