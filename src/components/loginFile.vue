<template>
  <base-card>
    <div class="container1">
      <form @submit.prevent="loginData">
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
        <div class="form-group">
          <label for="password" class="passwordlabel">Password:</label><br />
          <input
            class="form-control"
            type="password"
            name="password"
            placeholder="*********"
            id="Input"
            required
            v-model="data.password"
          />
        </div>
        <br />
        <button class="btn btn-large btn-success" type="submit">
          <font-awesome-icon icon="fa-solid fa-user" class="font1" /> LOGIN
        </button>
        <br />
        <router-link to="/forget" class="nav-link" id="forgot"
          >Forgot Password?</router-link
        >
      </form>
    </div>
  </base-card>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  setup() {
    toast("Welcome To My Website", {
      autoClose: 2000,
      position: "bottom-right",
    });
  },
  data() {
    return {
      data: {
        password: "",
        email: "",
      },
      responseMessage: "",
    };
  },
  methods: {
    loginData() {
      this.$axios
        .post("http://127.0.0.1:8000/api/login", {
          email: this.data.email,
          password: this.data.password,
        })
        .then((response) => {
          const state = response.data.data;
          localStorage.setItem("storeData", JSON.stringify(state));
          setTimeout(() => {
            this.$router.push("/home");
          }, 3000);
          this.handleResponse(response, response.data.msg);
        })
        .catch((error) => {
          this.handleError(error, error.msg);
        })
        .finally(() => {
          this.clearForm();
        });
    },
    // this for show the backend success msg
    handleResponse(response, successMessage) {
      if (response.data.success) {
        toast.success(successMessage, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    },
    // this function work on the every error msg catch
    handleError(error, defaultMessage) {
      const errorMessage = error.response.data.msg || defaultMessage;
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 2000,
      });
    },
    // for the clear form
    clearForm() {
      this.data.email = "";
      this.data.password = "";
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
.passwordlabel {
  font-size: 130%;
  margin-right: 68%;
}
#forgot {
  margin-top: 1%;
  margin-left: 26%;
}
</style>
