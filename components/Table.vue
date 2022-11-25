<template>
  <table class="table-auto w-full h-full mt-10 bg-gray-100">
    <thead>
      <tr>
        <th>Title</th>
        <th>Assigned to</th>
        <th>Status</th>
        <th>Expired date</th>
        <th class="w-[220px]">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="ticket in ticketsList" :key="ticket?.id" class="items-center">
        <td>
          {{ ticket?.title }}
        </td>
        <td>
          {{ ticket?.assignTo }}
        </td>
        <td class="flex justify-center">
          <Tag :is-completed="ticket?.isCompleted" />
        </td>
        <td class="text-center">
          {{ moment(ticket?.ExpiredDate).format("L") }}
        </td>
        <td class="flex flex-row justify-between p-2 h-full items-center">
          <button
            @click="goToTaskDetail(ticket?.id)"
            class="w-[50px] flex flex-row justify-center"
          >
            <Icon :icon-path="ICON_PATH.INFO" />
          </button>
          <button
            @click="updateTask(ticket?.id)"
            class="w-[50px] flex flex-row justify-center"
          >
            <Icon :icon-path="ICON_PATH.UPDATE" />
          </button>
          <button
            @click="deleteTask(ticket?.id)"
            class="w-[50px] flex flex-row justify-center"
          >
            <Icon :icon-path="ICON_PATH.DELETE" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import moment from "moment";
import { Ticket } from "~~/store/models/ticket";
import { Icon, ICON_PATH, Tag } from "~~/components";

const router = useRouter();

defineProps({
  ticketsList: Array<Ticket>,
});

function goToTaskDetail(id: number) {
  router.push({ path: `tasks/${id}` });
}

function deleteTask(id: number) {}

function updateTask(id: number) {}
</script>
