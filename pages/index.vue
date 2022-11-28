<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from 'usemodal-vue3';

import { ENDPOINT } from '~~/constants/endpoint';
import { useTicketStore } from '~~/store/ticket';
import { TicketForm, Ticket } from '~~/store/models/ticket';
import { PageTitle, Table, Icon, ICON_PATH, Selector, SearchInput, RegisterForm } from '~~/components';
import { SORT_TYPE, SORT_FIELD } from '~~/constants/sortType';
import { sortArrAsc, sortArrDsc, sortExpiredAsc, sortExpiredDsc } from '~~/utils/common';

const ticket = useTicketStore();

const config = useRuntimeConfig();
const { baseURL } = config.public;

const tableData = ref<Ticket[]>([]);
const timeoutID = ref<any>(null);
const isVisible = ref<boolean>(false);
const errMsg = ref<string>('');
const createFormRef = ref<any>(null);

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

async function handleCreateTicket() {
  const data: TicketForm = toRaw(createFormRef.value.ticket);
  await useFetch(ENDPOINT.TICKETS, {
    method: 'POST',
    baseURL,
    body: { ...data, expiredDate: data.expiredDate.toISOString() },
    onResponse() {
      getListOfTickets();
      isVisible.value = false;
    },
    onResponseError({ request, response, options }) {
      errMsg.value = response.statusText;
    },
  });
}
</script>

function create

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
          <button
            class="w-[100px] hover:bg-slate-200 ml-20 items-center h-[40px] flex justify-center"
            @click="isVisible = true"
          >
            <Icon :icon-path="ICON_PATH.ADDITION" />
          </button>
        </div>
      </div>
      <Table :tickets-list="tableData" @handle-sync-data="getListOfTickets" />
    </div>
    <Modal
      v-model:visible="isVisible"
      :maskClosable="false"
      :offsetTop="200"
      title="Create new ticket"
      :okButton="{ text: 'Create', onclick: handleCreateTicket }"
      :closable="false"
    >
      <p v-if="errMsg" class="text-red-600">{{ errMsg }}</p>
      <RegisterForm ref="createFormRef" />
    </Modal>
  </div>
</template>
