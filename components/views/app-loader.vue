<template>
  <div v-if="loading"
    style="width: 100vw; height: 100vh"
    class="bg-white flex items-center justify-center"
  >
    <img style="width: 100px" class="apx" src="/images/icon.png" />
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
.apx {
  animation: pulse 1.5s linear infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.1, 1.1);
  }

  100% {
    transform: scale(1, 1);
  }
}
</style>