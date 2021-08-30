<template>
  <div class="chat">
    <div class="chat__online-friend" 
    v-for="onlineFriend in onlineFriends" 
    :key="onlineFriend?._id"
    @click="handelClick(onlineFriend)"
    >
      <div class="chat__online-img-c" >
        <img
          class="chat__online-img"
          src="https://img.freepik.com/free-vector/man-shows-gesture-great-idea_10045-637.jpg?size=338&ext=jpg&ga=GA1.2.2140585734.1629504000"
          alt=""
        />
        <div class="chat__online-badge"></div>
      </div>
      
      <span class="chat__online-name">{{onlineFriend?.username}}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props : ['users', 'currentId', 'currentChat'],
  data(){
    return {
      friends : [],
      onlineFriends : [],
      chat : this.currentChat
    }
  },
  async mounted(){
    await this.getFriends();
    
    this.onlineFriends = this.friends.filter(f => this.users.includes(f._id));
  },
  methods : {
    async getFriends(){
      try {
        const res = await axios.get('/users/friends/'+ this.currentId);
        this.friends = res.data;
      } catch (error) { 
        console.log('error', error);
      }
    },
    async handelClick(f){
      try {
        const res = await axios.get(`/conversations/find/${this.currentId}/${f._id}`);
        this.chat = res.data;
        this.$emit('currentChats', this.chat);
      } catch (error) { 
        console.log('error', error);
      }
    }
  },
  watch : {
    users(){
      this.onlineFriends = this.friends.filter(f => this.users.includes(f._id));
    }
  }
};
</script>

<style lang='scss' scoped>
.chat {
  &__online-friend {
    display: flex;
    align-items: center;
    font-weight: 500;
    cursor: pointer;
    margin-top: 10px;
  }
  &__online-img-c{
      position: relative;
      margin-right: 10px;
  }
  &__online-badge{
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: limegreen;
      top: 2px;
      right: 2px;
  }
  &__online-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid white;

  }
}
</style>