<template>
  <div class="feed">
    <div class="feed__wrapper">
      <app-share
        v-if="username"
        :posts="posts"
        @updatePost="updatePost"
      ></app-share>
      <div class="div" v-for="post in posts" :key="post._id">
        <app-post :post="post" @postupdate="updatePost"></app-post>
      </div>
    </div>
  </div>
</template>

<script>
import appShare from "@/components/app-share";
import appPost from "@/components/app-post";
import axios from "axios";
export default {
  components: { appShare, appPost },
  data() {
    return {
      posts: [],
    };
  },
  props: ["username"],
  mounted() {
    const resalt = async () => {
      const res = this.username
        ? await axios.get("/posts/profile/" + this.username)
        : await axios.get("posts/timeline/" + this.$store.state.users.id);
      this.posts = res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      });
    };
    resalt();
  },
  methods: {
    updatePost() {
      const resalt = async () => {
        const res = this.username
          ? await axios.get("/posts/profile/" + this.username)
          : await axios.get("posts/timeline/" + this.$store.state.users.id);
        this.posts = res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        });
      };
      resalt();
    },
  },
  computed: {
    username: {
      get() {
        return !this.username || this.username === this.$store.state.users.username;
      },
    },
  },
  watch: {
    async $route(to, _) {
      if (!Object.keys(to.params).length) {
        
        const res = await axios.get(
          "posts/timeline/" + this.$store.state.users.id
        );
        this.posts = res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        });
        
      } else {
        const res = await axios.get("/posts/profile/" + to.params.username);
        this.posts = res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        });
      }
    },
  },
};
</script>

<style lang='scss'>
.feed {
  flex: 5.5;
  &__wrapper {
    padding: 20px;
  }
}
</style>