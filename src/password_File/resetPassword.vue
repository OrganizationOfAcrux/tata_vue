<template>
  <div class="container1">
    <form @submit.prevent="loginData">
      <div class="form-group">
        <div class="center">
          <label for="password" class="emaillabel">Password:</label><br />
        </div>
        <input
          class="form-control"
          type="password"
          name="password"
          placeholder="*******"
          id="Input"
          required
          v-model="data.password"
        /><br /><br />
      </div>
      <div class="form-group">
        <label for="confirm_password" class="passwordlabel"
          >Confirm - Password:</label
        ><br />
        <input
          class="form-control"
          type="password"
          name="confirm_password"
          placeholder="*********"
          id="Input"
          required
          v-model="data.confirm_password"
        />
      </div>
      <br />
      <button class="btn btn-large btn-success" type="submit">
        <font-awesome-icon icon="fa-solid fa-user" class="font1" /> LOGIN
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: {
        password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    loginData() {
      axios
        .post("http://127.0.0.1:8000/api/forgotpassword", {
          // .post("https://asdf-96315-default-rtdb.firebaseio.com/posts.json", {
          email: this.data.email,
          confirm_password: this.data.confirm_password,
          token: this.$route.params.token,
        })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push("/login");
            console.log(response);
          } else {
            alert("Your password and confirm_Password does not match");
          }
        })
        .catch((error) => {
          console.error("Login failed", error);
        });
      this.clearForm();
    },
    clearForm() {
      (this.data.confirm_password = ""), (this.data.password = "");
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
