<script setup lang="ts">
import { PropType } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css';
import { Ticket } from '~~/store/models/ticket';
import UpdateInput from './TextInput/UpdateInput.vue';

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
    <UpdateInput :default-value="ticket?.title" @update-text="(text: string) => ticket.title = text"
      >Title</UpdateInput
    >
    <UpdateInput :default-value="ticket?.note" @update-text="(text: string) => ticket.note = text"
      >Notice</UpdateInput
    >
    <UpdateInput :default-value="ticket?.assignTo" @update-text="(text: string) => ticket.assignTo = text"
      >Assign to</UpdateInput
    >
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
