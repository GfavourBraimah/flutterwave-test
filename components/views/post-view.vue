<template>
  <nuxt-link :to="`/${post.id}/${post.slug}`" v-if="post != null">
    <div class="post-view">
      <div class="post-view__image">
        <img v-if="isLoaded" ref="image" alt="" />
        <app-shimmer v-else class="shimmer"></app-shimmer>
      </div>

      <div class="post-view-cover">
        <div class="post-view__cat">
          <span class="category">{{ category }}</span>
          <app-dot-divider />
          <span class="time">{{ fomatTime }}</span>
        </div>
        <div class="post-view__title" v-html="post.title"></div>
        <div class="post-view__article" v-html="post.description"></div>
        <div class="post-view__action">
          <span class="read-time">
            {{ getReadTime(post.content) }} min Read</span
          >

          <button class="read-full button">
            Read Full
            <span class="mdi mdi-arrow-right"></span>
          </button>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { formatDistance } from "date-fns";
export default {
  props: {
    post: {
      required: true,
      default: null
    }
  },
  data() {
    return {
      category: "",
      isLoaded: false
    };
  },
  methods: {
    async fetchCategory() {
      const data = await this.$store.dispatch(
        "posts/getCategories",
        this.post.id
      );

      // console.log(JSON.stringify(data, null, 2));
      this.category = data.map(cat => {
        return cat.name;
      })[0];
    },

    setImage() {
      const image = new Image();
      try {
        image.onload = () => {
          this.isLoaded = true;
          this.$nextTick(() => {
            this.$refs.image.src = image.src;
          });
        };
        image.src = this.post.image;
      } catch (err) {}
    }
  },
  computed: {
    fomatTime() {
      return formatDistance(new Date(this.post.date), new Date(), {
        addSuffix: true
      });
    }
  },
  watch: {
    post: {
      deep: true,
      immediate: true,
      handler(val) {
        // console.log(JSON.stringify(val, null, 2));
        if (val == null) return;
        this.fetchCategory();
        this.setImage();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.post-view {
  background-color: #fff;
  padding: pxToRem(10);
  border-radius: pxToRem(5);
  gap: pxToRem(10);
  cursor: pointer;
  display: flex;

  .post-view-cover {
    flex: 1;
  }

  @include media-breakpoint-up(sm) {
    box-shadow: 0px 1px 3px #e5e5e5;
    display: block;
  }

  &__image {
    max-width: 100%;
    width: pxToRem(110);
    height: pxToRem(110);
    border-radius: pxToRem(5);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: pxToRem(5);
    }

    @include media-breakpoint-up(sm) {
      // @include aspect-ratio(16,9);
      width: auto;
      min-width: pxToRem(200);
      height: pxToRem(220);

      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        &:hover {
          transition: 0.6s all;
          transform: scale(1.1);
        }
      }
    }
  }

  &__cat {
    margin-top: pxToRem(5);

    .category {
      color: $black30;
      font-weight: 700;
      font-size: pxToRem(14);

      @include media-breakpoint-up(sm) {
        margin-top: pxToRem(5);
        color: $black30;
        font-weight: 700;
        font-size: pxToRem(14);
      }
    }

    .time {
      color: $black20;
      font-size: pxToRem(14);
      text-transform: capitalize;

      @include media-breakpoint-up(sm) {
        color: $black20;
        font-size: pxToRem(14);
      }
    }
  }

  &__title {
    font-weight: 600;
    font-size: pxToRem(18);
    color: $black;
    @include max-line(3);
    margin-top: pxToRem(5);
  }

  &__article {
    display: none;

    @include media-breakpoint-up(sm) {
      color: $black20;
      display: block;
      margin: pxToRem(0) auto pxToRem(20) auto;
      line-height: 21px;
      @include max-line(2);
    }
  }

  &__action {
    display: none;

    @include media-breakpoint-up(sm) {
      margin-top: pxToRem(10);
      display: flex;
      justify-content: space-between;
      font-size: pxToRem(14);
      margin-top: pxToRem(10);

      .read-time {
        color: $black20;
      }

      .read-full {
        display: block;
        color: $primary;
        font-weight: 600;
      }
    }
  }
}
</style>
