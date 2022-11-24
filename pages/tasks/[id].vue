<template>
  <div>
    <PageTitle> Task Information </PageTitle>
    <div class="flex flex-col items-center w-full py-10">
      <div class="shadow-lg shadow-indigo-500/40 bg-white w-1/2 p-10">
        <p class="text-xl">Title: {{ data?.title }}</p>
        <p class="text-xl">Note: {{ data?.note }}</p>
        <p class="text-xl">
          Status: {{ data?.isCompleted ? "Completed" : "Todo" }}
        </p>
        <p class="text-xl">
          created at: {{ moment(data?.createdAt).format("LL") }}
        </p>
        <p class="text-xl">Assigned to: {{ data?.assignTo }}</p>
        <p class="text-xl">
          Expired date: {{ moment(data?.ExpiredDate).format("LL") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PageTitle } from "~~/components";
import { ENDPOINT } from "~~/constants/endpoint";
import moment from "moment";

const route = useRoute();
const config = useRuntimeConfig();
const { baseURL } = config.public;

const { data, pending, error } = await useFetch(
  `${baseURL}${ENDPOINT.TICKETS}/${route.params?.id}`
);
</script>
