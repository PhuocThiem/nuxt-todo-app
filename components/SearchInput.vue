<script setup lang="ts">
const searchText = ref<String>('');

defineProps({
  searchLabel: String,
  placeholder: String,
});

const emit = defineEmits(['handle-input']);

watch(searchText, () => {
  emit('handle-input', searchText.value);
});

defineExpose({
  clearSelected,
});

function clearSelected() {
  searchText.value = '';
}
</script>
<template>
  <div class="w-1/3 shadow-sm">
    <label for="price" class="block text-sm font-medium text-gray-700">{{ searchLabel }}</label>
    <input
      v-model="searchText"
      type="text"
      :placeholder="placeholder"
      class="w-full bg-blend-lighten bg-slate-100 focus:bg-transparent border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px]"
    />
  </div>
</template>
