<template>
  <div class="container2">
    <router-view class="main_content"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.container2 {
  display: flex;
  height: 100vh;
}
.main_content {
  width: 90%;
}
.sidebar_1 {
  width: 10%;
}
</style>
