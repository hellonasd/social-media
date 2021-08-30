<template>
  <div class="conversation" v-if="frinedUser">
    <img
      class="conversation__img"
      :src="avatar()"
      alt=""
    />
    <span class="conversation__name">{{frinedUser.username}}</span>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["conversation", "user"],
  data(){
    return {
      frinedUser : null,
    }
  },
  async mounted() {
    if (this.user) {
      const friendId = this.conversation.members.find(
        (m) => m !== this.user.id
      );
      await this.getUser(friendId);
    }
  },
  methods: {
    async getUser(friendId) {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        this.frinedUser = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    avatar(){
      const PB_URL = process.env.VUE_APP_PUBLIC_IMG_VARIABLE;
      return this.frinedUser.profilePicture ? PB_URL + this.frinedUser.profilePicture   : require('../assets/person/nophoto.jpg')
    }
  },
};
</script>

<style lang='scss' scoped >
.conversation {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: rgb(197, 194, 194);
  }
  &__img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }
  &__name {
    font-weight: 500;
  }
}
</style>