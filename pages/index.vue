<script setup lang="ts">
import { ENDPOINT } from '~~/constants/endpoint';
import { useTicketStore } from '~~/store/ticket';
import { Ticket } from '~~/store/models/ticket';
import { PageTitle, Table, Icon, ICON_PATH } from '~~/components';
import { SORT_TYPE, SORT_FIELD } from '~~/constants/sortType';
import { sortArrAsc, sortArrDsc, sortExpiredAsc, sortExpiredDsc } from '~~/utils/common';

const ticket = useTicketStore();

const config = useRuntimeConfig();
const { baseURL } = config.public;

const tableData = ref<Ticket[]>([]);
const searchText = ref<String>('');
const timeoutID = ref<any>(null);
const selectedSortTitle = ref<Number>(SORT_TYPE[0]?.id);
const selectedSortExpired = ref<Number>(SORT_TYPE[0]?.id);

const { data, error } = await useFetch(ENDPOINT.TICKETS, {
  method: 'GET',
  baseURL,
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
  sortByField(selectedSortTitle.value as number, SORT_FIELD.TITLE);
});

watch(selectedSortExpired, () => {
  sortByField(selectedSortExpired.value as number, SORT_FIELD.EXPIRED_DATE);
});

function searchByText(text: string) {
  tableData.value = (data.value as Array<Ticket>).filter((ticket: Ticket) => ticket?.title.includes(text));
}

function sortByField(sortType: number, sortField: string) {
  const newArr: Ticket[] = [...tableData.value];
  switch (sortType) {
    case SORT_TYPE[1]?.id:
      tableData.value = sortField === SORT_FIELD.TITLE ? sortArrAsc(newArr) : sortExpiredAsc(newArr);
      break;
    case SORT_TYPE[2]?.id:
      tableData.value = sortField === SORT_FIELD.TITLE ? sortArrDsc(newArr) : sortExpiredDsc(newArr);
      break;
    default:
      _resetTableData();
  }
}

function _resetTableData() {
  searchText.value = ""
  selectedSortTitle.value = SORT_TYPE[0]?.id
  selectedSortExpired.value = SORT_TYPE[0]?.id
  tableData.value = data.value as Ticket[];
}
</script>

<template>
  <div>
    <PageTitle> Dashboard </PageTitle>
    <div class="flex flex-col p-3 w-full h-full">
      <div class="flex flex-row justify-start w-full items-center h-20 gap-2">
        <div class="w-1/3 shadow-sm">
          <label for="price" class="block text-sm font-medium text-gray-700">Search</label>
          <input
            v-model="searchText"
            type="text"
            placeholder="Input task title"
            class="w-full border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px]"
          />
        </div>
        <div class="w-1/4 shadow-sm border-b-sky-900">
          <label for="price" class="block text-sm font-medium text-gray-700">Sort by title</label>
          <select
            v-model="selectedSortTitle"
            class="w-full border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px]"
          >
            <option v-for="type in SORT_TYPE" :key="type.id" :value="type.id">
              {{ type.type }}
            </option>
          </select>
        </div>
        <div class="w-1/4 shadow-sm border-b-sky-900">
          <label for="price" class="block text-sm font-medium text-gray-700">Sort by expired date</label>
          <select
            v-model="selectedSortExpired"
            class="w-full border-solid border-b-[2px] border-neutral-400 focus:border-b-[2px] focus:border-sky-600 focus:outline-none h-[40px]"
          >
            <option v-for="type in SORT_TYPE" :key="type.id" :value="type.id">
              {{ type.type }}
            </option>
          </select>
        </div>
        <div class="h-[60px] flex flex-row justify-center items-end">
          <button class="w-[100px] hover:bg-slate-200 ml-20 items-center h-[40px] flex justify-center">
            <Icon :icon-path="ICON_PATH.ADDITION" />
          </button>
        </div>
      </div>
      <Table :tickets-list="tableData" />
    </div>
  </div>
</template>
