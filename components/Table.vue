<script setup lang="ts">
import moment from 'moment';

import { Ticket } from '~~/store/models/ticket';
import { Icon, ICON_PATH, Tag } from '~~/components';
import { ENDPOINT } from '~~/constants/endpoint';

const router = useRouter();
const config = useRuntimeConfig();
const { baseURL } = config.public;

defineProps({
  ticketsList: Array<Ticket>,
});

const emit = defineEmits(['handle-sync-data']);

function goToTaskDetail(id: number) {
  router.push({ path: `tasks/${id}` });
}

function deleteTask(id: number) {
  useFetch(ENDPOINT.TICKETS + `/${id}`, {
    method: 'DELETE',
    // query: { id },
    baseURL,
    onResponse({ response }) {
      console.log("response", response)
      emit('handle-sync-data');
    },
  });
}

function updateTask(id: number) {}
</script>
<template>
  <table class="table-auto w-full h-full mt-10 bg-gray-100">
    <thead>
      <tr class="border-b-2 border-white">
        <th class="border-r-2 border-white">Title</th>
        <th class="border-r-2 border-white">Assigned to</th>
        <th class="border-r-2 border-white">Status</th>
        <th class="border-r-2 border-white">Expired date</th>
        <th class="w-[220px]">Action</th>
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
          {{ moment(ticket?.ExpiredDate).format('L') }}
        </td>
        <td class="flex flex-row justify-between p-2 h-full items-center">
          <button @click="goToTaskDetail(ticket?.id)" class="w-[50px] flex flex-row justify-center">
            <Icon :icon-path="ICON_PATH.INFO" />
          </button>
          <button @click="updateTask(ticket?.id)" class="w-[50px] flex flex-row justify-center">
            <Icon :icon-path="ICON_PATH.UPDATE" />
          </button>
          <button @click="deleteTask(ticket?.id)" class="w-[50px] flex flex-row justify-center">
            <Icon :icon-path="ICON_PATH.DELETE" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
