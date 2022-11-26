<script setup lang="ts">
import { ENDPOINT } from '~~/constants/endpoint';
import { useTicketStore } from '~~/store/ticket';
import { Ticket } from '~~/store/models/ticket';
import { PageTitle, Table, Icon, ICON_PATH, Selector, SearchInput } from '~~/components';
import { SORT_TYPE, SORT_FIELD } from '~~/constants/sortType';
import { sortArrAsc, sortArrDsc, sortExpiredAsc, sortExpiredDsc } from '~~/utils/common';

const ticket = useTicketStore();

const config = useRuntimeConfig();
const { baseURL } = config.public;

const tableData = ref<Ticket[]>([]);
const timeoutID = ref<any>(null);

const { data, error } = await getListOfTickets();

async function getListOfTickets() {
  return await useFetch(ENDPOINT.TICKETS, {
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
}

function searchByTitle(searchText: string) {
  clearTimeout(timeoutID.value);
  timeoutID.value = setTimeout(() => {
    if (!searchText) {
      _resetTableData();
      return;
    }
    filterByText(searchText.toString());
  }, 1000);
}

function filterByText(text: string) {
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
  tableData.value = data.value as Ticket[];
}
</script>

<template>
  <div>
    <PageTitle> Dashboard </PageTitle>
    <div class="flex flex-col p-3 w-full h-full">
      <div class="flex flex-row justify-start w-full items-center h-20 gap-2">
        <SearchInput :search-label="'Search'" :placeholder="'Input task title'" @handle-input="searchByTitle" />
        <Selector :input-label="'Sort by title'" :select-type="SORT_FIELD.TITLE" @handle-select="sortByField" />
        <Selector
          :input-label="'Sort by expired date'"
          :select-type="SORT_FIELD.EXPIRED_DATE"
          @handle-select="sortByField"
        />
        <div class="h-[60px] flex flex-row justify-center items-end">
          <button class="w-[100px] hover:bg-slate-200 ml-20 items-center h-[40px] flex justify-center">
            <Icon :icon-path="ICON_PATH.ADDITION" />
          </button>
        </div>
      </div>
      <div class="h-1/2 overflow-auto mt-10">
        <Table :tickets-list="tableData" @handle-sync-data="getListOfTickets" />
      </div>
    </div>
  </div>
</template>
