<template>
  <!-- <button>User</button> -->
  <div class="container2">
    <router-view class="main_content"></router-view>
  </div>
</template>

<script>
// import sidebar from "./components/sideBar.vue";
export default {
  name: "App",
};
</script>

<style scoped>
.container2 {
  display: flex;
  height: 100vh;
  /* flex-wrap: wrap; */
}
.main_content {
  width: 90%;
  /* background-color: #dfe6f2; */
  /* max-width: 95%; */
}
.sidebar_1 {
  width: 10%;
  /* background-color: #5591f2; */
  /* max-width: 5%; */
}
</style>
