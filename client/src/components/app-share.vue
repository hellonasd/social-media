<template>
  <div class="share">
    <div class="share__wrapper">
      <div class="share__top">
        <img
          :src="photo($store.state.users.profilePicture)"
          alt=""
          class="share__top-img"
        />
        <input
          type="text"
          class="share__input"
          v-model="desc"
          :placeholder="'О чем вы думаете ' + $store.state.users.username + '?'"
        />
      </div>
      <div v-if='formData' class='share__container-img'>
        <img class="share__img" :src='createUrl()'/>
        <button class="share__btn-cancel" @click="formData = ''">X</button>
      </div>
      <form class="share__bottom" @submit.prevent="handlerSubmit">
        <div class="share__bottom-options">
          <label for="file" class="share__bottom-option">
            <img
              src="../assets/icons/computer.svg"
              alt=""
              class="share__bottom-img"
            />
            <span class="share__bottom-txt">Медиа</span>
            <input
              style="display: none"
              type="file"
              id="file"
              ref="file"
              accept=".png,.jpeg,.jpg"
              @change="setFile"
            />
          </label>
          <div class="share__bottom-option">
            <img
              src="../assets/icons/tag.svg"
              alt=""
              class="share__bottom-img"
            />
            <span class="share__bottom-txt">Ярлык</span>
          </div>
          <div class="share__bottom-option">
            <img
              src="../assets/icons/pin.svg"
              alt=""
              class="share__bottom-img"
            />
            <span class="share__bottom-txt">Локация</span>
          </div>
          <div class="share__bottom-option">
            <img
              src="../assets/icons/grinning.svg"
              alt=""
              class="share__bottom-img"
            />
            <span class="share__bottom-txt">Эмоция</span>
          </div>
        </div>
        <button type="submit" class="share__btn">Опубликовать</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      desc: "",
      formData: '',
    };
  },
  methods: {
    photo(user) {
     
      return user ? user : require("../assets/person/nophoto.jpg");
    },
    setFile(e) {
      this.formData = e.target.files[0];
    },
    createUrl(){
      return URL.createObjectURL(this.formData)
    },
    async handlerSubmit() {
      const newPost = {
        userId: this.$store.state.users.id,
        desc: this.desc,
      };
      if (this.formData) {
       
        const formData = new FormData();

        const fileName = Date.now() + this.formData.name;
        formData.append("name", fileName);

        formData.append("file", this.formData);
        newPost.img = fileName;
        try {
          await axios.post("/upload",formData);
          this.formData = ''
        } catch (error) {
          console.log("tttt", error);
        }
      }
      try {
        await axios.post("/posts", newPost);
      
        this.$emit('updatePost');
        this.desc = '';
      } catch (error) {
        console.log("erroro", error);
      }
    },
  },
};
</script>

<style lang='scss'>
.share {
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 1px 18px 8px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 1px 18px 8px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 1px 18px 8px rgba(34, 60, 80, 0.2);
  &__container-img{
    padding: 0 20px 10px 20px;
    position: relative;

  }
  &__img{
    width: 100%;
    object-fit: cover;

  }
  &__btn-cancel{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    font-size: 9px;
    cursor: pointer;
    border: none;
    background-color: black;
    color: white;
    opacity: 0.7;
    font-weight: 500;
    top: 5px;
    right: 22px;
  }
  &__btn {
    border: none;
    padding: 7px;
    border-radius: 5px;
    background-color: green;
    font-weight: 500;
    margin-right: 20px;
    color: white;
    cursor: pointer;
  }
  &__wrapper {
    padding: 10px;
  }
  &__input {
    border: none;
    width: 80%;
    &:focus {
      outline: none;
    }
  }
  &__top {
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
    padding-bottom: 21px;
    margin-bottom: 21px;
    &-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
  }
  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-options {
      display: flex;
    }
    &-option {
      display: flex;
      align-items: center;
      margin-right: 15px;
      cursor: pointer;
    }
    &-img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    &-txt {
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>