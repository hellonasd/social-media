<template>
  <div class="topbar">
    <div class="topbar__left">
      <div class="topbar__logo">
        <router-link to='/'>
        <img src="../assets/icons/snapchat.svg" alt="logo" class="logo" />
        </router-link>
      </div>
    </div>
    <div class="topbar__center">
      <div class="searchbar">
        <img src="../assets/icons/search.svg" alt="" class="searchbar__img" />
        <input type="text" placeholder="поиск" class="searchbar__input" />
      </div>
    </div>
    <div class="topbar__right">
      <div class="topbar__right-links">
        <span class="topbar__right-link">home</span>
        <span class="topbar__right-link">timeline</span>
      </div>
        <div class="topbaricons">
            <div class="topbaricons__item">
                <img src="../assets/icons/person.svg" alt="" class="topbaricons__item-img">
                <span class="topbaricons__item-count">1</span>
            </div>
            <div class="topbaricons__item">
                <img src="../assets/icons/chat.svg" alt="" class="topbaricons__item-img">
                <span class="topbaricons__item-count">1</span>
            </div>
            <div class="topbaricons__item">
                <img src="../assets/icons/notification.svg" alt="" class="topbaricons__item-img">
                <span class="topbaricons__item-count">1</span>
            </div>
        </div>
        <router-link :to="'/profile/' + $store.state.users.username">
      <img :src="photo($store.state.users.profilePicture)" alt="" class="topbarimg" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods : {
     photo(user){
      return user ? user : require('../assets/person/nophoto.jpg')
    }
  }
};
</script>

<style lang='scss' scoped>

.logo {
  width: 50px;
  height: 50px;
  margin-left: 20px;
  cursor: pointer;
}
.topbar {
  height: 50px;
  width: 100%;
  background-color: #1877f2;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 500;
  &__left {
    flex: 3;
  }
  &__center {
    flex: 5;
  }
  &__right {
    flex: 4;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
  }
  .topbar__right-link {
    margin-right: 10px;
    font-size: 14px;
    cursor: pointer;
  }

  .searchbar {
    width: 100%;
    background-color: white;
    height: 30px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    &__img {
      width: 20px;
      height: 20px;
      margin-left: 20px;
    }
    &__input {
      border: none;
      width: 70%;
      &:focus {
        outline: none;
      }
    }
  }
  .topbarimg{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
  }
  .topbaricons{
      display: flex;
      &__item{
          margin-right: 15px;
          cursor: pointer;
          position: relative;
          &-count{
              width: 15px;
              height: 15px;
              background-color: red;
              border-radius: 50%;
              color: white;
              position: absolute;
              top: -5px;
              right: -9px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
          }
      }
      &__item-img{
          width: 20px;
          height: 20px;
          
      }
  }
}
</style>