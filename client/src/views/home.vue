<template>
  <div>
    <app-top-bar></app-top-bar>
    <div class="container">
      <app-sidebar></app-sidebar>
      <app-feed></app-feed>
      <app-rightbar></app-rightbar>
    </div>
  </div>
  
</template>

<script>
import appTopBar from "@/components/app-top-bar";
import appSidebar from "@/components/app-sidebar";
import appFeed from "@/components/app-feed";
import appRightbar from "@/components/app-rightbar";

export default {
  components: { appTopBar, appSidebar, appFeed, appRightbar},
  
};
</script>

<style lang='scss'>
.container {
  display: flex;
  width: 100%;
}
</style>