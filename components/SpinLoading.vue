<template>
  <div class="flex flex-col justify-center items-center w-full h-full bg-slate-50">
    <div class="w-10 h-10 relative my-24 mx-auto">
      <div
        class="double-bounce1 bg-emerald-300 opacity-60 w-full h-full absolute rounded-full top-0 left-0"
      ></div>
      <div class="double-bounce2"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.double-bounce1,
.double-bounce2 {
  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
