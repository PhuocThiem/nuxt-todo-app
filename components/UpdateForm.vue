<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css';
import { Ticket } from '~~/store/ticket/ticket';
import TextInput from './TextInput.vue';
import { Tag } from '.';

const prop = defineProps<{
  selectedTicket?: Ticket;
}>();

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
    <TextInput :placeholder="'Input title'" v-model:text="ticket.title" />
    <label for="price" class="block text-sm font-medium text-gray-700 mt-2"> Notice </label>
    <TextInput :placeholder="'Input notice'" v-model:text="ticket.note" />
    <label for="price" class="block text-sm font-medium text-gray-700 mt-2"> Assign to </label>
    <TextInput :placeholder="'Assign this to someone'" v-model:text="ticket.assignTo" />
    <label for="price" class="block text-sm font-medium text-gray-700 mt-2"
      >Status <Tag :isCompleted="ticket.isCompleted"
    /></label>
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
      :required="true"
      :minDate="new Date()"
      ignoreTimeValidation
      :enableTimePicker="false"
      :clearable="false"
    />
  </div>
</template>
