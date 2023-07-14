<template>
  <div>
    <side-bar class="sidebar_1"></side-bar>
    <img alt="Vue logo" src="../assets/tata.png" id="img1" />
  </div>
</template>
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  setup() {
    toast.success("Welcome To Home", {
      autoClose: 2000,
    });
  },
};
</script>

<style scoped>
#img1 {
  top: 0;
  width: 70rem;
  height: 40rem;
  margin-left: 12rem;
}
</style>
