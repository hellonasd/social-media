<template>
  <div class="message" :class="{own:own}">
      <div class="message__top">
          <img  class="message__top-img" src="https://img.freepik.com/free-vector/man-shows-gesture-great-idea_10045-637.jpg?size=338&ext=jpg&ga=GA1.2.2140585734.1629504000" alt="">
          <p class="message__top-txt">{{message.text}}</p>
      </div>
      <div class="message__bottom">{{time}}</div>
  </div>
</template>

<script>
import {format} from 'timeago.js';
export default {
    props: ['message','own'],
    computed : {
        time(){
            return format(this.message.createdAt);
        }
    },
    
}
</script>

<style lang='scss' scoped>
.message{
    display: flex;
    flex-direction : column;
    margin-top: 20px;
    &.own{
        align-items: flex-end;
    }
    &.own .message__top-txt{
        background-color: rgb(224, 218, 218);
        color: black;
    }
    &__top{
        display: flex;
    }
    &__top-img{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
    }
    &__top-txt{
        padding: 10px;
        border-radius: 20px;
        background-color: #1877f2;
        color: white;
        max-width: 300px;
    }
    &__bottom{
        font-size: 12px;
        margin-top: 10px;
    }
}
</style>