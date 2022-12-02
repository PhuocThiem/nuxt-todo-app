<script setup lang="ts">
const prop = defineProps<{
  placeholder: string;
  text?: string;
}>();

const isValid = ref<boolean>(true);

watch(
  () => prop.text,
  () => {
    validateInput();
  }
);

function validateInput() {
  isValid.value = !!prop.text?.trim() ?? false;
}

defineEmits<{
  (e: 'update:text', text: string): void;
}>();
</script>

<template>
  <input
    type="text"
    :value="text"
    @blur="validateInput"
    @input="$emit('update:text', ($event.target as HTMLInputElement).value)"
    :placeholder="placeholder"
    class="w-full border-solid border-b-[2px] border-neutral-400 bg-slate-100 blur:focus:bg-transparent focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px] my-2"
    :class="{ 'border-red-600': !isValid, 'bg-transparent': text }"
  />
</template>
