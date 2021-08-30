<template>
  <div class="main">
    
  <app-top-bar></app-top-bar>
  <div class="profile">
    <app-sidebar></app-sidebar>
    <div class="profile__right" >
      <div class="profile__right-top">
        <div class="profile__cover">
          <img
            class="profile__cover-img"
            :src="coverPick()"
            alt=""
          />
          <img
            class="profile__cover-img-user"
            :src="profilePick()"
            alt=""
          />
        </div>
        <div class="profile__info" v-if="notEmpyObject">
          <h4 class="profile__info-name">{{user.username}}</h4>
          <span class="profile__info-desc">{{desc}}</span>
        </div>
      </div>
      <div class="profile__right-bottom">
        <app-feed :username="$route.params.username"></app-feed>
        <app-rightbar v-if="notEmpyObject" :user="user"></app-rightbar>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import appTopBar from "@/components/app-top-bar";
import appSidebar from "@/components/app-sidebar";
import appFeed from "@/components/app-feed";
import appRightbar from "@/components/app-rightbar";
import axios from 'axios';


export default {
  components: {
    appTopBar,
    appSidebar,
    appFeed,
    appRightbar,
  },
  data(){
    return {
      username : this.$route.params.username,
      user : {}
    }
  },
   mounted(){
    this.testUser(this.$route.params.username);
  },
  
  methods : {
    coverPick(){
      return this.user.coverPicture ? process.env.VUE_APP_PUBLIC_IMG_VARIABLE + this.user.coverPicture : require('../assets/cover.jpg')
    },
    profilePick(){
      return this.user.profilePicture ? process.env.VUE_APP_PUBLIC_IMG_VARIABLE +this.user.profilePicture : require('../assets/person/nophoto.jpg')
    },
    async testUser(route){
      const res = await axios.get(`/users?username=${route}`);
      this.user = res.data;
    }
  },
  computed : {
    desc(){
      return this.user.desc ? this.user.desc : 'Описание'
    },
    notEmpyObject(){
      return Object.keys(this.user).length
    }
    
  },
  watch : {
    async '$route'(to, _){
      
       to.params.username && await this.testUser(to.params.username)
    }
  }
 
};
</script>

<style lang='scss'>

.profile {
  display: flex;
  &__right {
    flex: 9;
    &-bottom {
      display: flex;
    }
  }
  &__cover {
    height: 320px;
    position: relative;
    &-img {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }
    &-img-user {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      top: 150px;
      border: 3px solid white;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-name {
      font-size: 24px;
    }
    &-desc {
      font-weight: 300;
    }
  }
}
</style>