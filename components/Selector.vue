<script setup lang="ts">
import { SORT_TYPE } from '~~/constants/sortType';

const selectValue = ref<Number>(SORT_TYPE[0]?.id);

const prop = defineProps({
  selectType: String,
  inputLabel: String,
});

const emit = defineEmits(['handle-select']);

watch(selectValue, () => {
  emit('handle-select', selectValue.value, prop.selectType);
});

defineExpose({
  clearSelected,
});

function clearSelected() {
  selectValue.value = SORT_TYPE[0]?.id;
}
</script>

<template>
  <div class="w-1/4 shadow-sm border-b-sky-900">
    <label for="price" class="block text-sm font-medium text-gray-700">{{ inputLabel }}</label>
    <select
      v-model="selectValue"
      class="w-full border-solid border-b-[2px] border-neutral-400 bg-slate-100 focus:bg-transparent focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px]"
      :class="{ 'bg-transparent': selectValue !== 0 }"
    >
      <option v-for="type in SORT_TYPE" :key="type.id" :value="type.id">
        {{ type.type }}
      </option>
    </select>
  </div>
</template>
