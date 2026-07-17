<template>
  <nuxt-link :to="`/${post.id}/${post.slug}`" v-if="post != null">
    <div class="more-post-view">
      <div class="more-post-view__image">
        <img v-if="isLoaded" ref="image" alt="" />
        <app-shimmer v-else class="shimmer"></app-shimmer>
      </div>
      <div class="more-post-view-cover">
        <div class="more-post-view__cat">
          <span class="category">{{ category }}</span>
          <app-dot-divider />
          <span class="time">{{ fomatTime }}</span>
        </div>
        <div class="more-post-view__title" v-html="post.title"></div>
        <div class="more-post-view__article" v-html="post.description"></div>
        <div class="more-post-view__action">
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
      try {
        const data = await this.$store.dispatch(
          "posts/getCategories",
          this.post.id
        );

        //console.log(JSON.stringify(data, null, 2));
        this.category = data.map(cat => {
          return cat.name;
        })[0];
      } catch (err) {
        console.log(JOSN.stringify(err, null, 2));
      }
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
      } catch (e) {}
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
.more-post-view {
  background-color: #fff;
  width: 85%;
  width: pxToRem(200);
  padding: pxToRem(10);
  border-radius: pxToRem(5);
  display: inline-block;
  margin: 10px 20px 10px 0px;
  cursor: pointer;
  box-shadow: 0px 1px 3px #e5e5e5;
  white-space: normal;

  @include media-breakpoint-up(sm) {
    width: pxToRem(280);
  }

  &__image {
    width: 100%;
    height: pxToRem(150);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: pxToRem(5);
    }

    @include media-breakpoint-up(sm) {
      height: pxToRem(180);
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: pxToRem(5);
        &:hover {
          transition: 0.6s all;
          transform: scale(1.1);
        }
      }
    }
  }

  &__cat {
    margin-top: pxToRem(10);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .category {
      color: $black30;
      font-weight: 700;
      font-size: pxToRem(14);
    }

    .time {
      color: $black20;
      font-size: pxToRem(12);
      text-transform: capitalize;
    }
  }

  &__title {
    font-weight: 600;
    font-size: pxToRem(18);
    color: $black;
    margin-top: pxToRem(5);
    @include max-line(2);

    @include media-breakpoint-up(sm) {
      margin-top: pxToRem(10);
      @include max-line(1);
    }
  }

  &__article {
    color: $black20;
    display: none;

    @include media-breakpoint-up(sm) {
      display: block;
      line-height: 21px;
      @include max-line(1);
    }
  }

  &__action {
    display: flex;
    justify-content: space-between;
    font-size: pxToRem(14);
    margin-top: pxToRem(10);

    .read-time {
      color: $black20;
    }

    .read-full {
      display: none;
      color: $primary;
      font-weight: 600;

      @include media-breakpoint-up(sm) {
        display: block;
      }
    }
  }
}
</style>
