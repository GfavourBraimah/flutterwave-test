export const state = () => ({
  posts: [],
  viewingPost: null,
  viewingPostAuthor: null
});

export const getters = {
  posts(state) {
    return state.posts;
  },

  post(state) {
    return state.viewingPost
  }
};

export const mutations = {
  SET_ALL_POSTS(state, payload) {
    state.posts = payload;
  },

   SET_MORE_POSTS(state, payload) {
     payload.forEach(post => {
        state.posts.push(post);
      });
    //  state.posts.concat(payload);
     console.log(state.posts.length);
   },

  SET_VIEWING_POST(state, payload) {
    state.viewingPost = payload
  },

  CLEAR_POST(state) {
    state.viewingPost = null,
      state.viewingPostAuthor = null;
  }
};

export const actions = {
  async getAllPosts({
    commit
  }) {
    try {
      const {
        data
      } = await this.$axios.get(
        "https://techcrunch.com/wp-json/wp/v2/posts/?per_page=20"
      );
      //  console.log(JSON.stringify(data,null,2))
      const posts = data.map(post => {
        return {
          id: post.id,
          date: post.date_gmt,
          slug: post.slug,
          link: post.link,
          title: post.title.rendered,
          description: post.excerpt.rendered,
          author: post.author,
          content: post.content.rendered,
          image: post.jetpack_featured_media_url
        };
      });
      commit("SET_ALL_POSTS", posts);
      return data;
    } catch (err) {
      console.log(JSON.stringify(err));
      return Promise.reject(err);
    }
  },

    async loadMorePosts({
      commit
    },offset) {
      try {
        const {
          data
        } = await this.$axios.get(
          "https://techcrunch.com/wp-json/wp/v2/posts/?per_page=20&offset="+offset
        );
        //  console.log(JSON.stringify(data,null,2))
        const posts = data.map(post => {
          return {
            id: post.id,
            date: post.date_gmt,
            slug: post.slug,
            link: post.link,
            title: post.title.rendered,
            description: post.excerpt.rendered,
            author: post.author,
            content: post.content.rendered,
            image: post.jetpack_featured_media_url
          };
        });
        commit("SET_MORE_POSTS", posts);
        return data;
      } catch (err) {
        console.log(JSON.stringify(err));
        return Promise.reject(err);
      }
    },

  refreshPosts({state,dispatch}){
    if(process.env.NODE_ENV === 'development'){
      console.log('refreshing posts...');
    }
     if(state.posts.length == 0){
       console.log('no posts so refresh');
      dispatch("getAllPosts")
     }else{
       console.log('posts already exist');
     }
  },

  async fetchPostByCategory({},catId) {
    console.log('fetching posts by category'+catId);
     try {
       const {
         data
       } = await this.$axios.get(
         "https://techcrunch.com/wp-json/wp/v2/posts/?categories=" + catId[0]
       );
       //  console.log(JSON.stringify(data,null,2))
       const posts = data.map(post => {
         return {
           id: post.id,
           date: post.date_gmt,
           slug: post.slug,
           link: post.link,
           title: post.title.rendered,
           description: post.excerpt.rendered,
           author: post.author,
           content: post.content.rendered,
           image: post.jetpack_featured_media_url
         };
       });
       return posts;
     } catch (err) {
      //  console.log(JSON.stringify(err));
       return Promise.reject(err);
     }
  },

  async getPost({
    commit
  }, id) {
    try {
      commit('CLEAR_POST');

      const {
        data
      } = await this.$axios.get(
        `https://techcrunch.com/wp-json/wp/v2/posts/${id}`
      );
      //  console.log(JSON.stringify(data,null,2))
      const post = {
        id: data.id,
        date: data.date,
        slug: data.slug,
        link: data.link,
        title: data.title.rendered,
        description: data.excerpt.rendered,
         author: data.author ,
        image: data.jetpack_featured_media_url,
        content: data.content.rendered
       

      };


    //  console.log(JSON.stringify(data, null, 2))
      commit("SET_VIEWING_POST", post);
      return data;
    } catch (err) {
      console.log(JSON.stringify(err));
      return Promise.reject(err);
    }
  },

  async getPostAuthors({
    commit
  }, id) {

    try {
      const {
        data
      } = await this.$axios.get(
        `https://techcrunch.com/wp-json/tc/v1/users/${id}`
      );
      //console.log(JSON.stringify(data,null,2))
      //  console.log(JSON.stringify(data,null,2))
    //   const post = {
    //     id: data.id,
    //     name: data.name,
    //     slug: data.slug,
     
    //   };


    //   console.log(JSON.stringify(data, null, 2))
    //   commit("SET_VIEWING_POST", post);
      return data;
    } catch (err) {
      //console.log(JSON.stringify(err));
      return Promise.reject(err);
    }
  },

  async getCategories({}, post) {
    try {
      const {
        data
      } = await this.$axios.get(
        `https://techcrunch.com/wp-json/wp/v2/categories?post=${post}`
      );

      return data.map((category) => {
        return {
          id: category.id,
          name: category.name,
          slug: category.slug
        }
      });
    } catch (err) {
      return Promise.reject(err)
    }
  }
};
