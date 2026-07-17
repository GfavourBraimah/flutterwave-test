<template>
<div class="more" v-if="posts.length > 0">
   <span class="more__title"  >More Articles</span>
    <div class="more__post-list">
     <more-post-view v-for="(post, index) in posts" :key="index" :post="post"  />
  </div>
</div>
</template>

<script>
import morePostView from "../views/more-post-view.vue";
export default {
  components: { morePostView },
  props:{
    category: {
      required: true,
      default: null
    }
  },
  data(){
    return {
      posts: []
    }
  },
  computed:{
  },
  methods:{
    async fetchPostByCategory(){
      const data = await this.$store.dispatch("posts/fetchPostByCategory", this.category.map(cat => {
        return cat.id;
      }));
      this.posts = data;
    }
  },
  watch:{
    category:{
      deep: true,
      immediate: true,
      handler(val){
        if(val == null) return;
        this.fetchPostByCategory();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.more{
  margin: pxToRem(25) 0;

  &__title{
    font-weight: 700;
    font-size: pxToRem(22);
  }

  &__post-list {
  display: block;
  white-space: nowrap;
  overflow: auto;



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
</style>
