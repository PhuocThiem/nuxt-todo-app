<template>
  <input
    v-model="text"
    type="text"
    :placeholder="placeHolder"
    class="w-full border-solid border-b-[2px] border-neutral-400 bg-slate-100 blur:focus:bg-transparent focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px] my-2"
    :class="{ 'bg-transparent': text }"
  />
</template>

<script setup lang="ts">
defineProps({
  placeHolder: String,
});

const emit = defineEmits(['onChange-text']);

const text = ref<string>('');

watch(text, () => {
  emit('onChange-text', text);
});
</script>
