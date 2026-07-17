<template>
  <nuxt-link :to="`/${post.id}/${post.slug}`" v-if="post !== false">
    <div class="featured-post">
      <div class="featured-post__loader" v-if="!isLoaded">
        <app-shimmer></app-shimmer>
      </div>
      <img class="featured-post__image" v-else ref="image" alt="" />
      <div class="featured-post__details">
        <div class="featured-post__details__head">
          <span class="category">{{ category }}</span>
          <app-dot-divider />
          <span class="time">{{ fomatTime }}</span>
        </div>
        <div class="featured-post__details__body">
          <div class="title" v-html="post.title"></div>
          <div class="article" v-html="post.description"></div>
        </div>
        <div class="featured-post__details__footer">
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
import { mapGetters } from "vuex";
import { formatDistance } from "date-fns";
export default {
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
    ...mapGetters("posts", ["posts"]),
    post() {
      if (this.posts.length == 0) {
        return false;
      }
      return this.posts[Math.floor(Math.random() * this.posts.length - 1) + 0];
    },
    desc() {
      if (!this.post) {
        return "";
      } else {
        if (this.post.content.length > 400) {
          return this.post.content.substring(0, 400) + "...";
        }

        return this.post.content;
      }
    },

    fomatTime() {
      if (!this.post) {
        return "";
      }
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
        if (val !== null) {
          this.fetchCategory();
          this.setImage();
        }
      }
    }
  }
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}
.featured-post {
  margin: pxToRem(20) auto;
  width: 90%;
  max-width: pxToRem(500);
  display: flex;
  flex-direction: column;
  gap: pxToRem(10);

  &__image {
    max-width: 100%;
    border-radius: pxToRem(5);

    @include media-breakpoint-up(lg) {
      width: 40%;
      height: pxToRem(300);
      object-fit: cover;
      border-radius: pxToRem(5);
    }
  }

  &__loader {
    width: 100%;
    height: 30vh;
    border-radius: pxToRem(5);

    @include media-breakpoint-up(lg) {
      width: 40%;
      height: 300px;
    }
  }

  &__details {
    flex: 1;
    &__head {
      .category {
        color: $black30;
        font-weight: 700;
        font-size: pxToRem(14);
      }

      .time {
        color: $black20;
        font-size: pxToRem(14);
        text-transform: capitalize;
      }
    }
    &__body {
      .title {
        margin-top: 10px;
        font-weight: 800;
        font-size: pxToRem(22);
        color: $black;
      }
      .article {
        display: none;
      }
    }
    &__footer {
      display: flex;
      justify-content: space-between;
      font-size: pxToRem(14);
      margin-top: pxToRem(10);

      .read-time {
        color: $black20;
      }
      .read-full {
        display: none;
      }
    }
  }
  @include media-breakpoint-up(sm) {
    margin: pxToRem(40) auto;
    width: 100%;
    max-width: none;
    &__details {
      &__body {
        flex: 1;
        .title {
          font-weight: 900;
          font-size: pxToRem(22);
          color: $black;
        }

        .article {
          color: $black20;
          display: block;
          @include max-line(10);
        }
      }

      &__footer {
        margin: none;
        .read-full {
          display: none;
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    padding: pxToRem(10);
    box-shadow: 0px 1px 2px #e5e5e5;
    border-radius: pxToRem(5);
    max-width: none;
    flex-direction: row;

    ::selection {
      background: $primary; /* WebKit/Blink Browsers */
      color: #fff;
    }
    ::-moz-selection {
      background: $primary; /* Gecko Browsers */
      color: #fff;
    }

    &__details {
      display: flex;
      flex-direction: column;

      &__body {
        flex: 1;
        .title {
          font-weight: 900;
          font-size: pxToRem(22);
          color: $black;
        }

        .article {
          color: $black20;
          display: block;
        }
      }
      &__footer {
        margin: none;
        .read-full {
          display: block;
          color: $primary;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
