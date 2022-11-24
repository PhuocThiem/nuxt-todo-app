<template>
  <div>
    <h1 v-if="pending">Loading.........</h1>
    <div v-else>
      <h1 v-if="error">Error</h1>
      <div v-else>
        <li v-for="ticket in data as Ticket[]" :key="ticket.id">
          {{ ticket.title }}
        </li>
      </div>
    </div>
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
