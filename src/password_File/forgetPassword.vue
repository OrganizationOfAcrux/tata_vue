<template>
  <base-card>
    <div class="container1">
      <form @submit.prevent="forget_Password">
        <div class="form-group">
          <div class="center">
            <label for="email" class="emaillabel">Email:</label><br />
          </div>
          <input
            class="form-control"
            type="email"
            name="email"
            placeholder="email@email.com"
            id="Input"
            required
            v-model="data.email"
          /><br /><br />
        </div>

        <br />
        <button class="btn btn-large btn-success" type="submit">
          <font-awesome-icon icon="fa-solid fa-user" class="font1" /> Reset
          Password
        </button>
      </form>
    </div></base-card
  >
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: {
        email: "",
      },
    };
  },
  methods: {
    forget_Password() {
      axios
        .post("http://127.0.0.1:8000/api/forgotpassword", {
          // .post("https://asdf-96315-default-rtdb.firebaseio.com/posts.json", {
          email: this.data.email,
        })
        .then((response) => {
          this.$router.push("/reset/:token");
          // this.$router.push("/reset");
          console.log(response);
        })
        .catch((error) => {
          console.error("Email Wrong", error);
        });
      // alert("Your Email  Successfully Submit, Set Your Password");

      this.clearForm();
    },
    clearForm() {
      this.data.email = "";
    },
  },
};
</script>
<style scoped>
form {
  display: block;
  margin-top: 0em;
  width: 100%;
}
.container1 {
  justify-content: center;
  justify-items: start;
  background-color: beige;
  width: 100% !important;
  height: 100%;
  display: flex;
  align-items: center;
  width: fit-content;
  padding-right: 1rem;
  padding-left: 1rem;
  text-align: -webkit-center;
  position: relative;
}
#Input {
  width: 30rem;
  height: 2rem;
  font-size: 1rem;
}
.emaillabel {
  font-size: 2rem;
}
.passwordlabel {
  font-size: 2rem;
}
</style>

<!-- deleteSelected_User() { 
this.selected.forEach((userId) => { axios
.delete(`http://127.0.0.1:8000/api/users/${userId}`) .then(() => {
console.log(`Successfully deleted user with ID: ${userId}`); this.getData(); //
Refresh the user data after deletion }) .catch((error) => {
console.error(error); }); }); if (this.selected.length === 0) { console.log("No
rows selected for deletion"); return; } },

<button
  class="btn btn-large btn-success"
  type="submit"
  @click="deleteSelected_User"
>
            <font-awesome-icon icon="fa-solid fa-user-minus" class="font1" />
            DeleteSeletected_User
          </button> -->
