<template>
  <div class="page">
   <featured-post/>
   <post-lists/>
    <observer @on-change="onChange">
      </observer>
  </div>
</template>

<script>
import PostLists from '~/components/custom/post-lists.vue'
import featuredPost from '~/components/views/featured-post.vue'
import Observer from 'vue-intersection-observer'
export default {
  components: { featuredPost, PostLists,Observer },
  created(){
    // fetch posts here even before the component is counted 
      this.$store.dispatch("posts/getAllPosts")
   },
   methods: {
     onChange(entry, obv) {
      if(this.$store.state.posts.posts.length > 0 && this.$store.state.posts.posts.length < 100 ){
        this.$store.dispatch('posts/loadMorePosts',this.$store.state.posts.posts.length+1)
      }
     }}

}
</script>

<style lang="scss" scoped>
.page{
  width: 100%;

  @include media-breakpoint-up(sm){
    width: 90%;
    margin: auto;
   
  }
}
</style>