<template>
  <base-card>
    <div class="container1">
      <form @submit.prevent="updateData">
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
          <font-awesome-icon icon="fa-solid fa-user" class="font1" /> Update
        </button>
      </form>
    </div></base-card
  >
</template>
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
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
    updateData() {
      this.$axios
        .post("http://127.0.0.1:8000/api/resetpassword", {
          password: this.data.password,
          confirm_password: this.data.confirm_password,
          token: this.$route.params.token,
        })
        .then((response) => {
          this.handleResponse(response, response.data.msg);
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        })
        .catch((error) => {
          this.handleError(error, error.msg);
        });
      this.clearForm();
    },
    clearForm() {
      (this.data.confirm_password = ""), (this.data.password = "");
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
  margin-right: 68%;
}
.passwordlabel {
  font-size: 130%;
  margin-right: 51%;
}
</style>
