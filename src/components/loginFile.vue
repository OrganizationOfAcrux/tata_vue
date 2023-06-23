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

    <!-- snackbar start -->
    <div id="snackbar" :class="{ show: showsnackbar }">
      <font-awesome-icon icon="fa-solid fa-at" /> Some text some message..
    </div>

    <button @click="snackbar" class="submit">hhhh</button>
    <!-- ending of snackbar -->
  </base-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: {
        password: "",
        email: "",
      },
      showsnackbar: false,
    };
  },
  methods: {
    loginData() {
      axios
        .post("http://127.0.0.1:8000/api/login", {
          email: this.data.email,
          password: this.data.password,
        })
        .then((response) => {
          if (response.status === 200) {
            // Assuming the API response includes an authentication token
            const authToken = response.data.token;

            // Save the authentication token in localStorage or Vuex store
            localStorage.setItem("authToken", authToken);
            // Store the data in vuex for use in hover
            this.$store.commit("setAPIResponse", response.data);
            // Redirect to the home page
            this.openPopup();
            setTimeout(() => {
              this.$router.push("/home");
            }, 3000);
          } else {
            // alert("Your email and password are incorrect.");
            console.log("Login Successfully", response);
          }
        })
        .catch((error) => {
          this.openPopup2();
          setTimeout(() => {
            // this.$router.push("/home");
          }, 3000);
          console.error("Login failed", error);
        });

      this.clearForm();
    },
    clearForm() {
      this.data.email = "";
      this.data.password = "";
    },

    // for the snackbar opening
    snackbar() {
      this.showsnackbar = true;
      setTimeout(this.closesnackbar, 3000);
    },
    // for the snackbar closeing

    closesnackbar() {
      this.showsnackbar = false;
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
#forgot {
  margin-top: 1%;
  margin-left: 26%;
}

/* snackbar style for the error */
#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  /* background-color: ; */
  color: #ff1010;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
  margin-left: 31%;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
