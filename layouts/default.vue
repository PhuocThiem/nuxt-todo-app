<template>
  <SpinLoading v-if="isLoading" />
  <template v-else>
    <div
      class="flex flex-row bg-gradient-to-r from-teal-600 bg-cyan-500 min-w-full h-20 items-center pl-2 z-10"
    >
      <h1
        class="text-3xl text-white font-bold hover:cursor-pointer"
        @click="goToHomePage"
      >
        Nuxt todo app
      </h1>
    </div>
    <div class="flex flex-col w-full h-[calc(100vh-160px)]">
      <slot />
    </div>
    <div
      class="flex flex-row justify-center bg-gradient-to-r from-teal-600 bg-cyan-500 min-w-full h-20 items-center z-10"
    >
      <h1 class="text-3xl text-white font-bold">MGI Solution</h1>
    </div>
  </template>
</template>

<script setup lang="ts">
import { SpinLoading } from "~~/components";
const router = useRouter();
function goToHomePage() {
  router.push({ path: "/" });
}

const isLoading = ref<boolean>(true);

onMounted(() => {
  isLoading.value = false;
});
</script>
