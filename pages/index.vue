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
            v-model="searchText"
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
            v-model="selectedSortTitle"
            class="w-full border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none"
          >
            <!-- <option value="" disabled hidden selected>Select sort type</option> -->
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
      <Table :tickets-list="tableData" />
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

const tableData = ref<Ticket[]>([]);
const searchText = ref<String>("");
const timeoutID = ref<any>(null);
const selectedSortTitle = ref<Number>(SortType[0]?.id);

const { data, error } = await useFetch(baseURL + ENDPOINT.TICKETS, {
  onResponse({ response }) {
    ticket.updateGetTicketsState(response._data);
    tableData.value = response._data;
  },
  onResponseError() {
    ticket.clearGetTasksState();
  },
});

watch(searchText, (newValue, oldValue) => {
  clearTimeout(timeoutID.value);
  timeoutID.value = setTimeout(() => {
    if (!searchText.value) {
      _resetTableData();
      return;
    }
    searchByText(searchText.value.toString());
  }, 1000);
});

watch(selectedSortTitle, () => {
  sortByTitle();
});

function searchByText(text: string) {
  tableData.value = (data.value as Array<Ticket>).filter((ticket: Ticket) =>
    ticket?.title.includes(text)
  );
}

function sortByTitle() {
  switch (selectedSortTitle.value) {
    case SortType[1]?.id:
      tableData.value = _sortArrAsc([...(data.value as Array<Ticket>)]);
      break;
    case SortType[2]?.id:
      tableData.value = _sortArrDsc([...(data.value as Array<Ticket>)]);
      break;
    default:
      _resetTableData();
  }
}

function _resetTableData() {
  tableData.value = data.value as Ticket[];
}

function _sortArrAsc(arr: Ticket[]) {
  return arr.sort((a: Ticket, b: Ticket) => (a?.title > b?.title ? 1 : -1));
}

function _sortArrDsc(arr: Ticket[]) {
  return arr.sort((a: Ticket, b: Ticket) => (a?.title > b?.title ? -1 : 1));
}
</script>
