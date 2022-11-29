<script setup lang="ts">
defineProps({
  placeHolder: String,
  text: String,
});

defineEmits(['update:text']);
</script>

<template>
  <input
    type="text"
    :value="text"
    @input="$emit('update:text', ($event.target as HTMLInputElement).value)"
    :placeholder="placeHolder"
    class="w-full border-solid border-b-[2px] border-neutral-400 bg-slate-100 blur:focus:bg-transparent focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px] my-2"
    :class="{ 'bg-transparent': text }"
  />
</template>
