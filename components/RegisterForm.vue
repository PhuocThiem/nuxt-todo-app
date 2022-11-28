<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css';
import { TicketForm } from '~~/store/models/ticket';

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
    <input
      v-model="ticket.title"
      type="text"
      placeholder="Input title"
      class="w-full border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px]"
    />
    <input
      v-model="ticket.note"
      type="text"
      placeholder="Input notice"
      class="w-full border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px]"
    />
    <input
      v-model="ticket.assignTo"
      type="text"
      placeholder="Assign this to someone"
      class="w-full border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px] mb-5"
    />
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
