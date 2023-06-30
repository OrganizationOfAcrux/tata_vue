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
        .post("http://127.0.0.1:8000/api/forgetpassword", {
          email: this.data.email,
        })
        .then((response) => {
          console.log("hrlloi");
          const token = response.data.data.token;
          this.$router.push(`/reset/${token}`);
        })
        .catch((error) => {
          console.error("Email Wrong", error);
        });
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
  font-size: 130%;
  margin-right: 74%;
}
</style>
