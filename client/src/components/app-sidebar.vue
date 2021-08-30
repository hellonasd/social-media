<template>
  <div class="sidebar">
    <div class="sidebar__wrapper">
      <ul class="sidebar__list">
        <li class="sidebar__item">
          <img src="../assets/icons/rss.svg" alt="" class="sidebar__img" />
          <span class="sidebar__item-text">Лента</span>
        </li>
        <li class="sidebar__item">
          <img
            src="../assets/icons/chat-sidebar.svg"
            alt=""
            class="sidebar__img"
          />
          <router-link to='/messenger' class="sidebar__item-text">Чат</router-link>
        </li>
        <li class="sidebar__item">
          <img
            src="../assets/icons/play-button.svg"
            alt=""
            class="sidebar__img"
          />
          <span class="sidebar__item-text">Видео</span>
        </li>
        <li class="sidebar__item">
          <img src="../assets/icons/friends.svg" alt="" class="sidebar__img" />
          <span class="sidebar__item-text">Группы</span>
        </li>
        <li class="sidebar__item">
          <img src="../assets/icons/question.svg" alt="" class="sidebar__img" />
          <span class="sidebar__item-text">Вопросы</span>
        </li>
        <li class="sidebar__item">
          <img src="../assets/icons/work.svg" alt="" class="sidebar__img" />
          <span class="sidebar__item-text">Работа</span>
        </li>
        <li class="sidebar__item">
          <img src="../assets/icons/calendar.svg" alt="" class="sidebar__img" />
          <span class="sidebar__item-text">События</span>
        </li>
        <li class="sidebar__item">
          <img src="../assets/icons/course.svg" alt="" class="sidebar__img" />
          <span class="sidebar__item-text">Курсы</span>
        </li>
      </ul>
      <button class="sidebar__btn">Показать больше</button>
      <ul class="sidebar__friends">
        <li class="sidebar__friends-friend">
          <img
            src="../assets/person/dwayne-the-rock-.jpg"
            alt=""
            class="sidebar__friends-friend-img"
          />
          <span class="sidebar__friends-friend-name">Dwayne-the-rock</span>
        </li>
        <li class="sidebar__friends-friend">
          <img
            src="../assets/person/dwayne-the-rock-.jpg"
            alt=""
            class="sidebar__friends-friend-img"
          />
          <span class="sidebar__friends-friend-name">Dwayne-the-rock</span>
        </li>
        <li class="sidebar__friends-friend">
          <img
            src="../assets/person/dwayne-the-rock-.jpg"
            alt=""
            class="sidebar__friends-friend-img"
          />
          <span class="sidebar__friends-friend-name">Dwayne-the-rock</span>
        </li>
        <li class="sidebar__friends-friend">
          <img
            src="../assets/person/dwayne-the-rock-.jpg"
            alt=""
            class="sidebar__friends-friend-img"
          />
          <span class="sidebar__friends-friend-name">Dwayne-the-rock</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background-color: rgb(228, 225, 225);
}
::-webkit-scrollbar-thumb {
  background-color: gray;
}
.sidebar {
  flex: 3;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  &__wrapper {
    padding: 20px;
  }
  &__img {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  &__btn {
    width: 150px;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-weight: 500;
    margin-bottom: 15px;
  }
  &__friends {
    padding: 0;
    margin: 0;
    list-style: none;
    border-top: 2px solid black;

    &-friend {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      margin-top: 15px;
    }
    &-friend-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
  }
}
</style>