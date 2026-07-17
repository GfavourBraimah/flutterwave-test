<template>
  <div class="page ">
    <div class="post" v-if="post != null">
      <span class="post__author" v-if="author != null">
        By {{ author.name }}</span
      >
      <span class="post__time">{{ fomatTime }}</span>
      <span class="post__title" v-html="post.title"></span>
      <!-- <img class="post-page__image" :src="post.image" alt="" /> -->
      <!-- <div class="post-page__category" v-html="categories.toString()"></div> -->
      <div class="post__content" v-html="content"></div>
      
    </div>
    <more-post-list v-if="post != null" :category="categories" />
  </div>
</template>

<script>
import morePostList from "~/components/custom/more-post-list.vue";
import { formatDistance } from "date-fns";

import { mapGetters } from "vuex";
export default {
  components: { morePostList },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.title
        }
      ]
    };
  },
  created() {
    this.$store.dispatch("posts/getPost", this.$route.params.id);
        this.$store.dispatch("posts/refreshPosts", this.$route.params.id);
  },
  data() {
    return {
      title: "",
      categories: [],
      author: null
    };
  },
  methods: {
    async fetchCategories() {
      if (this.post == null) {
        return;
      }
      const data = await this.$store.dispatch(
        "posts/getCategories",
        this.post.id
      );
      this.categories = data.map(cat => {
        return {
          name: cat.name,
          id: cat.id
        };
      });
    },
    async fetchAuthors() {
      if (this.post == null) {
        return;
      }
      const data = await this.$store.dispatch(
        "posts/getPostAuthors",
        this.post.author
      );
      this.author = data;
    }
  },
  computed: {
    ...mapGetters("posts", ["post"]),
    content() {
      return this.post.content;
    },
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
        this.fetchCategories();
        this.fetchAuthors();
        if (val != null) {
          this.title = val.title;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
img {
  max-width: 100%;
}

.page {
  width: 90%;
  margin: auto;

 .post{
  margin: auto;
  padding: 30px 0;
  overflow: auto;

  @include media-breakpoint-up(sm) {
    width: 70%;
    padding: 50px 0;
  }

  @include media-breakpoint-up(lg) {
    width: 75%;
    overflow: auto;
  }

  &__image {
    margin: 20px 0;
    border-radius: 10px;
  }

  &__category {
    font-weight: 700;
  }

  &__author {
    font-size: 14px;
    color: $black30;
  }
  &__time {
    font-size: 14px;
    color: $black20;
    text-transform: capitalize;
  }

  &__title {
    font-size: 23px;
    font-weight: 700;
    display: block;
    margin-top: pxToRem(12);
    @include media-breakpoint-up(sm) {
      font-size: 30px;
    }
  }

  &__content {
    color: $black20;
    line-height: 21px;
    font-weight: 400;
    word-wrap: break-word;
    margin: pxToRem(10) auto;


    ::selection {
      background: $primary; /* WebKit/Blink Browsers */
      color: #fff;
    }
    ::-moz-selection {
      background: $primary; /* Gecko Browsers */
      color: #fff;
    }
  }
 }
}
</style>
