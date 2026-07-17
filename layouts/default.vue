<template>
  <div class="app font-sf-pro">
    <app-nav-bar />
    <div class="app app__content">
      <Nuxt />
    </div>
    <app-footer />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  overflow: auto;

  &__content {
    margin-top: pxToRem(70);
    overflow: auto;
    @include media-breakpoint-up(sm) {
      margin-top: pxToRem(80);
    }
  }
}
</style>
