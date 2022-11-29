<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css';
import { TicketForm } from '~~/store/models/ticket';
import CreateInput from './TextInput/CreateInput.vue';

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
    <CreateInput :placeHolder="'Input title'" @onChange-text="(text: string) => ticket.title = text" />
    <CreateInput :placeHolder="'Input notice'" @onChange-text="(text: string) => ticket.note = text" />
    <CreateInput :placeHolder="'Assign this to someone'" @onChange-text="(text: string) => ticket.assignTo = text" />
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
