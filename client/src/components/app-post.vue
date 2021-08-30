<template>
  <div class="post">
    <div class="post__wrapper">
      <div class="post__top">
        <div class="post__top-left">
          
          <router-link :to="`/profile/${user.username}`">
          <img :src="photo(user.profilePicture)" alt="" class="post__top-img" />
          </router-link>
          <span class="post__top-username">{{ user.username }}</span>
          <span class="post__top-date">{{ post.createdAt }}</span>
        </div>
        <div class="post__top-right">
          <img
            src="../assets/icons/ellipsis.svg"
            alt=""
            class="post__top-right-vertical"
          />
        </div>
      </div>
      <div class="post__center">
        <span class="post__center-text">{{ post?.desc }}</span>
        <img class="post__center-img" :src="postPhoto(post.img)" alt="" />
      </div>
      <div class="post__bottom">
        <div class="post__bottom-left">
          <img
            class="post__bottom-img"
            src="../assets/icons/heart.svg"
            alt=""
          />
          <img
            class="post__bottom-img"
            src="../assets/icons/like.svg"
            alt=""
            @click="likedPost"
          />
          <span class="post__bottom-counter">{{ like }} поставил лайк</span>
        </div>
        <div class="post__bottom-right">
          <span class="post__bottom-right-comment">0 comments</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["post"],
  data() {
    return {
      user: {},
      like: this.post.likes.length,
      isLiked: false,
      likes: this.post.likes,
    };
  },
  methods: {
    photo(user) {
      
      return user ? process.env.VUE_APP_PUBLIC_IMG_VARIABLE : require("../assets/person/nophoto.jpg");
    },
    postPhoto(photo) {
      return photo ? process.env.VUE_APP_PUBLIC_IMG_VARIABLE + photo : "";
    },
    async likedPost() {
      try {
        const res = await axios.put("/posts/" + this.post._id + "/like", {
          userId: this.user.id,
        });
      } catch (e) {
        console.log("error", e);
      }

      if (this.isLiked) {
        this.like -= 1;
      } else {
        this.like += 1;
      }
      this.isLiked = !this.isLiked;
      this.$emit('postupdate');
    },
    async getUsers(){
      const res = await axios.get(`/users/?userId=${this.post.userId}`);
      this.user = res.data;
    }
  },

  async mounted() {
    
    await this.getUsers();
  },
  updated(){
    this.isLiked = this.post.likes.includes(this.user.id);
  },
  watch : {
    async '$route'(to, _){
      this.getUsers();
    }
  }
  
};
</script>

<style lang='scss'>
.post {
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 1px 18px 8px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 1px 18px 8px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 1px 18px 8px rgba(34, 60, 80, 0.2);
  margin: 30px 0px;
  &__wrapper {
    padding: 10px;
  }
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-username {
      font-size: 15px;
      font-weight: 500;
      margin: 0 10px;
    }
    &-date {
      font-size: 12px;
    }
    &-left {
      display: flex;
      align-items: center;
    }
    &-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
    &-right {
      &-vertical {
        width: 19px;
        height: 19px;
      }
    }
  }
  &__center {
    margin: 20px 0;
    &-img {
      margin-top: 20px;
      width: 100%;
      max-height: 500px;
      object-fit: contain;
    }
  }
  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-left {
      display: flex;
      align-items: center;
    }
    &-img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
      cursor: pointer;
    }
    &-counter {
      font-size: 15px;
    }
    &-right {
      &-comment {
        cursor: pointer;
        border-bottom: 1px dashed gray;
        font-size: 15px;
      }
    }
  }
}
</style>