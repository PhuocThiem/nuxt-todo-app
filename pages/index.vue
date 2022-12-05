<script setup lang="ts">
import { Modal } from 'usemodal-vue3';

import { ENDPOINT } from '~~/constants/endpoint';
import { useTicketStore } from '~~/store/ticket';
import { TicketForm, Ticket } from '~~/store/ticket/ticket';
import {
  PageTitle,
  Table,
  Icon,
  ICON_PATH,
  Selector,
  SearchInput,
  RegisterForm,
  UpdateForm,
  ErrorMessage,
} from '~~/components';
import { SORT_TYPE, SORT_FIELD, MODAL_TYPE } from '~~/constants';

useHead({
  titleTemplate: 'Todo list',
  meta: [{ name: 'description', content: 'Manage tickets' }],
  htmlAttrs: {
    lang: 'en',
  },
});

const ticket = useTicketStore();

const config = useRuntimeConfig();
const { baseURL } = config.public;

const tableData = ref<Ticket[]>([]);
const searchData = ref<Ticket[]>([]);
const timeoutID = ref<any>(null);
const isVisible = ref<boolean>(false);
const errMsg = ref<string>('');
const searchText = ref<string>('');
const createFormRef = ref<any>(null);
const updateFormRef = ref<any>(null);
const modal_type = ref<string>('');
const selectedTicket = ref<Ticket>();
const selectTitleValue = ref<number>(SORT_TYPE['Choose type']);
const selectExpiredValue = ref<number>(SORT_TYPE['Choose type']);

const { $sortTitleAsc, $sortExpiredAsc, $sortTitleDsc, $sortExpiredDsc } = useNuxtApp();

const delayMilliseconds: number = 1000;

const { data, error } = await getListOfTickets();

async function getListOfTickets(): Promise<any> {
  return await useFetch(ENDPOINT.TICKETS, {
    method: 'GET',
    baseURL,
    onResponse({ response }) {
      if (response?.ok) {
        ticket.updateGetTicketsState(response._data);
        tableData.value = response._data;
        searchData.value = response._data;
      }
    },
    onResponseError() {
      ticket.clearGetTasksState();
    },
  });
}

watch(searchText, () => {
  _clearSorting();
  searchByTitle(searchText.value);
});

function searchByTitle(searchText: string): void {
  clearTimeout(timeoutID.value);
  timeoutID.value = setTimeout(() => {
    if (!searchText) {
      _resetTableData();
      return;
    }
    filterByText(searchText.toString());
  }, delayMilliseconds);
}

watch(selectTitleValue, () => {
  sortByField(selectTitleValue.value, SORT_FIELD.TITLE);
});

watch(selectExpiredValue, () => {
  sortByField(selectExpiredValue.value, SORT_FIELD.EXPIRED_DATE);
});

function filterByText(text: string): void {
  searchData.value = (data.value as Array<Ticket>).filter((ticket: Ticket) => ticket?.title.includes(text));
  tableData.value = [...searchData.value];
}

function sortByField(sortType: number, sortField: number): void {
  const newArr: Ticket[] = [...searchData.value];
  switch (true) {
    case sortType === SORT_TYPE.Ascending && sortField === SORT_FIELD.TITLE:
      selectExpiredValue.value = SORT_TYPE['Choose type'];
      tableData.value = $sortTitleAsc(newArr);
      break;
    case sortType === SORT_TYPE.Ascending && sortField === SORT_FIELD.EXPIRED_DATE:
      selectTitleValue.value = SORT_TYPE['Choose type'];
      tableData.value = $sortExpiredAsc(newArr);
      break;
    case sortType === SORT_TYPE.Descending && sortField === SORT_FIELD.TITLE:
      selectExpiredValue.value = SORT_TYPE['Choose type'];
      tableData.value = $sortTitleDsc(newArr);
      break;
    case sortType === SORT_TYPE.Descending && sortField === SORT_FIELD.EXPIRED_DATE:
      selectTitleValue.value = SORT_TYPE['Choose type'];
      tableData.value = $sortExpiredDsc(newArr);
      break;
    default:
      tableData.value = [...searchData.value];
  }
}

function _clearSorting(): void {
  selectTitleValue.value = SORT_TYPE['Choose type'];
  selectExpiredValue.value = SORT_TYPE['Choose type'];
}

function _resetTableData(): void {
  searchText.value = '';
  _clearSorting();
  searchData.value = [...(data.value as Ticket[])];
  tableData.value = [...searchData.value];
}

async function handleCreateTicket(): Promise<void> {
  const data: Ticket = toRaw(createFormRef.value.ticket);
  await useFetch(ENDPOINT.TICKETS, {
    method: 'POST',
    baseURL,
    // body: { ...data, expiredDate: data.expiredDate.toISOString() },
    body: data,
    onResponse({ response }) {
      if (response?.ok) {
        getListOfTickets();
        isVisible.value = false;
      }
    },
    onResponseError({ response }) {
      errMsg.value = response.statusText;
    },
  });
}

async function handleUpdateTicket(): Promise<void> {
  const data: Ticket = toRaw(updateFormRef.value.ticket);
  await useFetch(ENDPOINT.TICKETS + `/${toRaw(selectedTicket.value)?.id}`, {
    method: 'PUT',
    baseURL,
    body: data,
    onResponse({ response }) {
      if (response?.ok) {
        getListOfTickets();
        isVisible.value = false;
      }
    },
    onResponseError({ response }) {
      errMsg.value = response.statusText;
    },
  });
}

function openModal(typeOfModal: string, ticket?: Ticket): void {
  if (ticket) {
    selectedTicket.value = toRaw(ticket);
  }
  modal_type.value = typeOfModal;
  errMsg.value = '';
  isVisible.value = true;
}

async function deleteTask(id: number): Promise<void> {
  await useFetch(ENDPOINT.TICKETS + `/${id}`, {
    method: 'DELETE',
    baseURL,
    onResponse({ response }) {
      if (response?.ok) {
        getListOfTickets();
      }
    },
    onResponseError({ response }) {
      errMsg.value = response.statusText;
    },
  });
}

function _isRegisterModal(modal_type: string): boolean {
  return modal_type === MODAL_TYPE.CREATE;
}
</script>

<template>
  <div>
    <PageTitle v-slot="{ page }">Home {{ page }}</PageTitle>
    <div class="flex flex-col p-3 w-full h-full" v-if="!error">
      <div class="flex flex-row justify-start w-full items-center h-20 gap-2">
        <SearchInput
          v-model:title="searchText"
          :search-label="'Search'"
          :placeholder="'Input task title'"
          @handle-input="searchByTitle"
        />
        <Selector v-model:value="selectTitleValue" :input-label="'Sort by title'" />
        <Selector v-model:value="selectExpiredValue" :input-label="'Sort by expired date'" />
        <div class="h-[60px] flex flex-row justify-center items-end">
          <button
            class="w-[100px] hover:bg-slate-200 ml-20 items-center h-[40px] flex justify-center"
            @click="openModal(MODAL_TYPE.CREATE)"
            title="Add new task"
          >
            <Icon :icon-path="ICON_PATH.ADDITION" />
          </button>
        </div>
      </div>
      <Table
        :tickets-list="tableData"
        @handle-sync-data="getListOfTickets"
        @open-modal="(ticket: Ticket) => openModal(MODAL_TYPE.UPDATE, ticket)"
        @on-delete="deleteTask"
      />
    </div>
    <ErrorMessage v-else :err-msg="'Failed to get data from server!'" />
    <Modal
      v-model:visible="isVisible"
      :maskClosable="false"
      :offsetTop="200"
      :title="_isRegisterModal(modal_type) ? MODAL_TYPE.CREATE : MODAL_TYPE.UPDATE"
      :okButton="{
        text: _isRegisterModal(modal_type) ? 'Create' : 'Update',
        onclick: _isRegisterModal(modal_type) ? handleCreateTicket : handleUpdateTicket,
      }"
      :closable="false"
    >
      <p v-if="errMsg" class="text-red-600">{{ errMsg }}</p>
      <RegisterForm v-if="_isRegisterModal(modal_type)" ref="createFormRef" />
      <UpdateForm v-else ref="updateFormRef" :selected-ticket="selectedTicket" />
    </Modal>
  </div>
</template>
