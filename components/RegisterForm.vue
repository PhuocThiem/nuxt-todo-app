<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css';
import { TicketForm } from '~~/store/models/ticket';
import TextInput from './TextInput.vue';

const ticket: TicketForm = reactive({
  title: '',
  note: '',
  assignTo: '',
  expiredDate: new Date(),
  isCompleted: false,
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
    <TextInput :placeHolder="'Input title'" v-model:text="ticket.title" />
    <TextInput :placeHolder="'Input notice'" v-model:text="ticket.note" />
    <TextInput :placeHolder="'Assign this to someone'" v-model:text="ticket.assignTo" />
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
