<template>
  <router-view></router-view>
</template>
<script>
import home from '@/views/home';

export default {
  components:{home},
  // beforeCreate(){
    
  //   if(Object.keys(this.$store.state.users).length === 0){
  //     this.$router.push({ path: '/login' })
  //   }
  // }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}
body {
  margin: 0;
}
</style>
