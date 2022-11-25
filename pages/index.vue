<template>
  <div>
    <PageTitle> Dashboard </PageTitle>
    <div class="flex flex-col p-3 w-full h-full">
      <div class="flex flex-row justify-start w-full items-center h-20 gap-2">
        <div class="w-1/3 shadow-sm">
          <label for="price" class="block text-sm font-medium text-gray-700"
            >Search</label
          >
          <input
            type="text"
            placeholder="Input task title"
            class="w-full border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none"
          />
        </div>
        <div class="w-1/4 shadow-sm border-b-sky-900">
          <label for="price" class="block text-sm font-medium text-gray-700"
            >Sort by title</label
          >
          <select
            name=""
            id=""
            class="w-full border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none"
          >
            <option value="" disabled hidden selected>Select sort type</option>
            <option v-for="type in SortType" :key="type.id" :value="type.id">
              {{ type.type }}
            </option>
          </select>
        </div>
        <div class="w-1/4 shadow-sm border-b-sky-900">
          <label for="price" class="block text-sm font-medium text-gray-700"
            >Sort by expired date</label
          >
          <select
            name=""
            id=""
            class="w-full border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none"
          >
            <option value=" " disabled hidden selected>Select sort type</option>
            <option v-for="type in SortType" :key="type.id" :value="type.id">
              {{ type.type }}
            </option>
          </select>
        </div>
        <button
          class="w-[100px] shadow-sm flex flex-row justify-center ml-20 mt-[22px]"
        >
          <Icon :icon-path="ICON_PATH.ADDITION" />
        </button>
      </div>
      <Table :tickets-list="data as Ticket[]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ENDPOINT } from "~~/constants/endpoint";
import { useTicketStore } from "~~/store/ticket";
import { Ticket } from "~~/store/models/ticket";
import { PageTitle, Table, Icon, ICON_PATH } from "~~/components";
import { SortType } from "~~/constants/sortType";

const ticket = useTicketStore();

const config = useRuntimeConfig();
const { baseURL } = config.public;

const { data, error } = await useFetch(baseURL + ENDPOINT.TICKETS, {
  onResponse({ response }) {
    ticket.updateGetTicketsState(response._data);
  },
  onResponseError() {
    ticket.clearGetTasksState();
  },
});
</script>
