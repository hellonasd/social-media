<template>
  <div class="login">
    <div class="login__wrapper">
      <div class="login__left">
        <h3 class="login__logo">Logo</h3>
        <span class="login__desc"
          >Общайтесь с друзьями и миром вокруг вас.</span
        >
      </div>
      <div class="login__right">
        <form class="login__box" @submit.prevent="handleSubmit">
          <input
            type="email"
            v-model="email"
            required
            placeholder="email"
            class="login__input"
          />
          <input
            type="password"
            v-model="password"
            required
            minlength="3"
            placeholder="password"
            class="login__input"
          />
          <button class="login__btn">{{ $store.state.isFetching ? 'идет проверка' : 'Войти' }}</button>
          <span class="login__forgot">Забыли пароль?</span>
          <router-link to='/registration'>
            <button class="login__register-btn">Создать аккаунт</button>
          </router-link>
          
        </form>
      </div>
      <div class="error" v-if="$store.state.authError">{{$store.state.authError.message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit(e) {
      this.$store.state.isFetching = true
      this.$store.dispatch("login", { email : this.email, password: this.password })
    },
  },
};
</script>

<style lang='scss'>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  &__wrapper {
    width: 70%;
    height: 70%;
    display: flex;
  }
  &__left,
  &__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__logo {
    font-size: 50px;
    font-weight: bold;
    color: #1775ee;
    margin-bottom: 10px;
  }
  &__desc {
    font-size: 24px;
  }
  &__box {
    height: 300px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__input {
    height: 50px;
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 18px;
    padding-left: 20px;
    &:focus {
      outline: none;
    }
  }
  &__btn {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #1775ee;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }
  &__forgot {
    text-align: center;
    color: #1775ee;
  }
  &__register-btn {
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #42b72a;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }
}
</style>