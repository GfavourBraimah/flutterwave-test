<template>
  <div class="list-container">
    <post-view v-for="post in posts" :post="post" :key="post" />
  </div>
</template>

<script>
import postView from "../views/post-view.vue";
import {mapGetters} from 'vuex'
export default {
  components: { postView },
  computed:{
    ...mapGetters('posts',["posts"])
  }
};
</script>

<style lang="scss" scoped>
.list-container {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  margin: pxToRem(5) auto;

    ::selection {
      background: $primary; /* WebKit/Blink Browsers */
      color: #fff;
    }
    ::-moz-selection {
      background: $primary; /* Gecko Browsers */
      color: #fff;
    }

  @include media-breakpoint-up(sm) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: pxToRem(20);
  }

  @include media-breakpoint-up(lg) {
    gap: pxToRem(40);
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
