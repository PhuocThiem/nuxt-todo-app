<script setup lang="ts">
import moment from 'moment';

import { Ticket } from '~~/store/ticket/ticket';
import { Icon, ICON_PATH, Tag } from '~~/components';

const tableHeaders: string[] = ['Title', 'Assigned to', 'Status', 'Expired date', 'Action'];

const router = useRouter();

defineProps<{
  ticketsList: Ticket[];
}>();

defineEmits<{ (e: 'open-modal', ticket: Ticket): void; (e: 'on-delete', id: number): void }>();

function goToTaskDetail(id?: number): void {
  router.push({ path: `tasks/${id}` });
}
</script>
<template>
  <div class="h-[550px] overflow-auto mt-10">
    <table class="table-auto bg-gray-100 w-full h-fit relative">
      <thead>
        <tr class="border-b-2 border-white sticky bg-gray-100 top-0">
          <th
            v-for="(item, index) in tableHeaders"
            :key="index"
            class="border-r-2 border-white"
            :class="{ 'w-[220]': item === 'Action' }"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in ticketsList" :key="ticket?.id" class="items-center border-b-2 border-white">
          <td class="p-2 border-r-2 border-white">
            {{ ticket?.title }}
          </td>
          <td class="p-2 border-r-2 border-white">
            {{ ticket?.assignTo }}
          </td>
          <td class="border-r-2 border-white">
            <div class="flex justify-center">
              <Tag :is-completed="ticket?.isCompleted" />
            </div>
          </td>
          <td class="text-center border-r-2 border-white">
            {{ moment(ticket?.expiredDate).format('L') }}
          </td>
          <td class="flex flex-row justify-between p-2 h-full items-center">
            <button
              @click="goToTaskDetail(ticket?.id)"
              class="w-[50px] flex flex-row justify-center"
              :title="`Go to detail task ${ticket?.title}`"
            >
              <Icon :icon-path="ICON_PATH.INFO" />
            </button>
            <button
              @click="$emit('open-modal', ticket)"
              class="w-[50px] flex flex-row justify-center"
              :title="`Edit task ${ticket?.title}`"
            >
              <Icon :icon-path="ICON_PATH.UPDATE" />
            </button>
            <button
              @click="$emit('on-delete', ticket?.id)"
              class="w-[50px] flex flex-row justify-center"
              :title="`Delete task ${ticket?.title}`"
            >
              <Icon :icon-path="ICON_PATH.DELETE" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
