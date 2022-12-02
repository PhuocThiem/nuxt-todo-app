<template>
  <div>
    <PageTitle> Task Information </PageTitle>
    <div class="flex flex-col items-center w-full py-10">
      <div class="shadow-lg shadow-gray-400 bg-white w-1/2 p-10">
        <h1 v-if="error" class="text-3xl text text-rose-600">Cant get info of task id {{ route.params?.id }}</h1>
        <div v-else>
          <p class="text-xl">Title: {{ data?.title }}</p>
          <p class="text-xl">Note: {{ data?.note }}</p>
          <p class="text-xl flex">Status: <Tag :is-completed="data?.isCompleted" /></p>
          <p class="text-xl">created at: {{ moment(data?.createdAt).format('LL') }}</p>
          <p class="text-xl">Assigned to: {{ data?.assignTo }}</p>
          <p class="text-xl">Expired date: {{ moment(data?.ExpiredDate).format('LL') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PageTitle, Tag } from '~~/components';
import { ENDPOINT } from '~~/constants/endpoint';
import moment from 'moment';

useHead({
  titleTemplate: 'Task detail',
  meta: [
    { name: 'description', content: 'Display ticket information' },
  ],
});

const route = useRoute();
const config = useRuntimeConfig();
const { baseURL } = config.public;

const { data, error } = await useFetch(`${baseURL}${ENDPOINT.TICKETS}/${route.params?.id}`);
</script>
