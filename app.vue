<template>
  <div class="flex flex-col justify-between h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ENDPOINT } from "./constants/endpoint";
import { useTicketStore } from "~~/store/ticket";
import { Ticket } from "./store/models/ticket";

const ticket = useTicketStore();

const config = useRuntimeConfig();
const { baseURL } = config.public;

const { data, pending, error } = await useFetch(baseURL + ENDPOINT.TICKETS, {
  onResponse({ response }) {
    ticket.updateGetTicketsState(response._data);
  },
  onResponseError() {
    ticket.clearGetTasksState();
  },
});
</script>
