<template>
  <div class="rightbar">
    <div v-if="!user" class="rightbar__wrapper">
      <div class="rightbar__container">
        <img src="../assets/icons/gift-box.svg" alt="" class="rightbar__img" />
        <span class="rightbar__container-txt">
          <b>Dwayn Rock</b> и <b>3 других друга</b> сегодня день рождения
        </span>
      </div>
      <img src="../assets/posts/post4.jpg" alt="" class="rightbar__add" />
      <h4 class="rightbar__title">Онлайн друзья</h4>
      <ul class="rightbar__list">
        <li class="rightbar__item">
          <div class="rightbar__img-container">
            <img
              class="rightbar__profile-img"
              src="../assets/person/person4.jpg"
              alt=""
            />
            <span class="rightbar__online"></span>
          </div>
          <span class="rightbar__username">Olivia tacker</span>
        </li>
      </ul>
    </div>
    <div v-else class="rightbar__wrapper">
      <button class='rightbar__following-btn' v-if='following' @click="handlerFollow">
        {{followed ? 'отписаться' : 'подписаться'}}
      </button>
      <h4 class="rightbar__title-none">Информация о пользовате</h4>
      <div class="rightbar__info">
        <div class="rightbar__info-item">
          <span class="rightbar__info-key">Город :</span>
          <span class="rightbar__info-value">{{ user.city }}</span>
        </div>
        <div class="rightbar__info-item">
          <span class="rightbar__info-key">откуда :</span>
          <span class="rightbar__info-value">{{ user.from }}</span>
        </div>
        <div class="rightbar__info-item">
          <span class="rightbar__info-key">Семейное положение :</span>
          <span class="rightbar__info-value">{{ user.lerationship }}</span>
        </div>
      </div>
      <h4 class="rightbar__title">Друзья</h4>
      <div class="rightbar__followings" v-for="friend in friends" :key="friend._id">
        <router-link :to="`/profile/${friend.username}`" style="text-decoration: none;">
        <div class="rightbar__following">
          <img
            class="rightbar__following-img"
            src="../assets/person/person5.jpg"
            alt=""
          />
          <span class="rightbar__following-name">{{friend.username}}</span>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ["user"],
  data(){
    return {
      friends : [],
      followed : this.$store.state.users.followings.includes(this.user?.id),
    }
  },
  mounted(){
    
   this.user && this.getFiends()
    
  },
  methods : {
    async getFiends (){
      try {
        
        const fiendsList = await axios.get('/users/friends/' + this.user.id);
        this.friends = fiendsList.data;
        
      } catch (error) {
        console.log('err', error);
      }
    },
    async handlerFollow(){
      try {
        if(this.followed){
          await axios.put('/users/' + this.user.id + '/unfollow', {userId : this.$store.state.users.id});
          this.$store.commit('unFollow', this.users.id);
        }else{
          await axios.put('/users/' + this.user.id + '/follow',{userId : this.$store.state.users.id})
          this.$store.commit('followings', this.users.id);
       }
      } catch (error) {
        console.log('erro', error);
      }
      this.followed = !this.followed
    }
  },
  computed : {
    following(){
      return this.user.username !== this.$store.state.users.username
    }
  },
  watch : {
   async user(val){
      const fiendsList = await axios.get('/users/friends/' + val.id);
      this.friends = fiendsList.data;
    },
   
  },
  updated(){
    console.log('ththth', this.$store.state.users.followings.includes(this.user?.id))
    // this.followed = this.$store.state.users.followings.includes(this.user?.id)
  }
};
</script>

<style lang='scss'>
.rightbar {
  flex: 3.5;
  &__wrapper {
    padding: 20px 20px 0 0;
  }
  &__following-btn{
    margin-top: 30px;
    margin-bottom: 10px;
    border: none;
    background-color: #1872f2;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    display : flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    &:focus{
      outline: none;
    }
  }
  &__img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  &__container {
    display: flex;
    align-items: center;
    &-txt {
      font-weight: 300;
      font-size: 15px;
    }
  }
  &__add {
    width: 100%;
    border-radius: 10px;
    margin: 30px 0;
  }
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  &__img-container {
    margin-right: 10px;
    position: relative;
  }
  &__profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  &__title {
    margin-bottom: 20px;
  }
  &__title-none {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  &__online {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: green;
    position: absolute;
    top: -2px;
    right: -6px;
    border: 2px solid white;
  }
  &__username {
    font-weight: 500;
  }
  &__info {
    margin-bottom: 30px;
  }
  &__info-item {
    margin-bottom: 10px;
  }
  &__info-key {
    font-weight: 500;
    margin-right: 15px;
    color: #555;
  }
  &__info-value {
    font-weight: 300;
  }
  &__followings {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  &__following {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    cursor: pointer;
  }
  &__following-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }
}
</style>