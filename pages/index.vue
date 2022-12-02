<script setup lang="ts">
import { Modal } from 'usemodal-vue3';

import { ENDPOINT } from '~~/constants/endpoint';
import { useTicketStore } from '~~/store/ticket';
import { TicketForm, Ticket } from '~~/store/models/ticket';
import { PageTitle, Table, Icon, ICON_PATH, Selector, SearchInput, RegisterForm, UpdateForm } from '~~/components';
import { SORT_TYPE, SORT_FIELD, MODAL_TYPE } from '~~/constants';
import { sortTitleAsc, sortTitleDsc, sortExpiredAsc, sortExpiredDsc } from '~~/utils/common';

const ticket = useTicketStore();

const config = useRuntimeConfig();
const { baseURL } = config.public;

const tableData = ref<Ticket[]>([]);
const timeoutID = ref<any>(null);
const isVisible = ref<boolean>(false);
const errMsg = ref<string>('');
const searchText = ref<string>('');
const createFormRef = ref<any>(null);
const updateFormRef = ref<any>(null);
const modal_type = ref<string>('');
const selectedTicket = ref<Ticket>();
const selectTitleValue = ref<number>(SORT_TYPE[0]?.id);
const selectExpiredValue = ref<number>(SORT_TYPE[0]?.id);

const { data } = await getListOfTickets();

async function getListOfTickets() {
  return await useFetch(ENDPOINT.TICKETS, {
    method: 'GET',
    baseURL,
    onResponse({ response }) {
      if (response?.ok) {
        ticket.updateGetTicketsState(response._data);
        tableData.value = response._data;
      }
    },
    onResponseError({ response }) {
      errMsg.value = response.statusText;
      ticket.clearGetTasksState();
    },
  });
}

watch(searchText, () => {
  searchByTitle(searchText.value);
});

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

watch(selectTitleValue, () => {
  sortByField(selectTitleValue.value, SORT_FIELD.TITLE);
});

watch(selectExpiredValue, () => {
  sortByField(selectExpiredValue.value, SORT_FIELD.EXPIRED_DATE);
});

function filterByText(text: string) {
  tableData.value = (data.value as Array<Ticket>).filter((ticket: Ticket) => ticket?.title.includes(text));
}

function sortByField(sortType: number, sortField: string) {
  const newArr: Ticket[] = [...tableData.value];
  switch (sortType) {
    case SORT_TYPE[1]?.id:
      tableData.value = sortField === SORT_FIELD.TITLE ? sortTitleAsc(newArr) : sortExpiredAsc(newArr);
      break;
    case SORT_TYPE[2]?.id:
      tableData.value = sortField === SORT_FIELD.TITLE ? sortTitleDsc(newArr) : sortExpiredDsc(newArr);
      break;
    default:
      _resetTableData();
  }
}

function _resetTableData() {
  searchText.value = '';
  tableData.value = data.value as Ticket[];
}

async function handleCreateTicket() {
  const data: TicketForm = toRaw(createFormRef.value.ticket);
  await useFetch(ENDPOINT.TICKETS, {
    method: 'POST',
    baseURL,
    body: { ...data, expiredDate: data.expiredDate.toISOString() },
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

async function handleUpdateTicket() {
  const data: TicketForm = toRaw(updateFormRef.value.ticket);
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

function openModal(typeOfModal: string) {
  modal_type.value = typeOfModal;
  errMsg.value = '';
  isVisible.value = true;
}

function onEditTicket(ticket: Ticket) {
  selectedTicket.value = toRaw(ticket);
  openModal(MODAL_TYPE.UPDATE);
}

function deleteTask(id: number) {
  useFetch(ENDPOINT.TICKETS + `/${id}`, {
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

function _isRegisterModal(modal_type: string) {
  return modal_type === MODAL_TYPE.CREATE;
}
</script>

<template>
  <div>
    <PageTitle> Dashboard </PageTitle>
    <div class="flex flex-col p-3 w-full h-full">
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
          >
            <Icon :icon-path="ICON_PATH.ADDITION" />
          </button>
        </div>
      </div>
      <Table
        :tickets-list="tableData"
        @handle-sync-data="getListOfTickets"
        @open-modal="onEditTicket"
        @on-delete="deleteTask"
      />
    </div>
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
