<script setup lang="ts">
import { PropType } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css';
import { Ticket } from '~~/store/models/ticket';
import TextInput from './TextInput.vue';

const prop = defineProps({
  selectedTicket: {
    type: Object as PropType<Ticket>,
  },
});

const { selectedTicket } = prop;

const ticket = reactive({
  title: selectedTicket?.title,
  note: selectedTicket?.note,
  assignTo: selectedTicket?.assignTo,
  expiredDate: selectedTicket?.expiredDate,
  isCompleted: selectedTicket?.isCompleted,
});

function format(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `Expired date: ${day}/${month}/${year}`;
}

defineExpose({ ticket });
</script>

<template>
  <div>
    <label for="price" class="block text-sm font-medium text-gray-700 mt-2"> Title </label>
    <TextInput :placeHolder="'Input title'" v-model:text="ticket.title" />
    <label for="price" class="block text-sm font-medium text-gray-700 mt-2"> Notice </label>
    <TextInput :placeHolder="'Input notice'" v-model:text="ticket.note" />
    <label for="price" class="block text-sm font-medium text-gray-700 mt-2"> Assign to </label>
    <TextInput :placeHolder="'Assign this to someone'" v-model:text="ticket.assignTo" />
    <label for="price" class="block text-sm font-medium text-gray-700 mt-2">Status</label>
    <input
      type="checkbox"
      class="checked:bg-blue-500"
      v-model="ticket.isCompleted"
      :true-value="true"
      :false-value="false"
    />
    <label for="price" class="block text-sm font-medium text-gray-700 mt-2">Expired date</label>
    <Datepicker
      v-model="ticket.expiredDate"
      :format="format"
      autoApply
      required
      :minDate="new Date()"
      ignoreTimeValidation
      :enableTimePicker="false"
    />
  </div>
</template>
