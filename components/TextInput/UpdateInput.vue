<template>
  <label for="price" class="block text-sm font-medium text-gray-700 mt-2">
    <slot />
  </label>
  <input
    v-model="text"
    type="text"
    placeholder="Input title"
    class="w-full border-solid border-b-[2px] border-neutral-400 bg-slate-100 focus:bg-transparent focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px]"
    :class="{ 'bg-transparent': text }"
  />
</template>

<script setup lang="ts">
const prop = defineProps({
  defaultValue: String,
});

const emit = defineEmits(['update-text']);

const text = ref(prop.defaultValue as string);

watch(text, () => {
  emit('update-text', text);
});
</script>
