<template>
  <base-card>
    <div class="container1">
      <side-bar class="sidebar_1"></side-bar>
      <form @submit.prevent="loginData">
        <div class="form-group">
          <div class="center">
            <label for="first_name" class="emaillabel">FirstName:</label><br />
          </div>
          <input
            class="form-control"
            type="text"
            name="first_name"
            placeholder="firstname"
            id="Input"
            required
            v-model="data.first_name"
          /><br />
        </div>
        <div class="form-group">
          <label for="last_name" class="passwordlabel">LastName:</label><br />
          <input
            class="form-control"
            type="text"
            name="last_name"
            placeholder="Lastname"
            id="Input"
            required
            v-model="data.last_name"
          />
        </div>
        <div class="form-group">
          <label for="email" class="passwordlabel">Email:</label><br />
          <input
            class="form-control"
            type="email"
            name="email"
            placeholder="email@email.email"
            id="Input"
            required
            v-model="data.email"
          />
        </div>
        <div class="form-group">
          <label for="password" class="passwordlabel" v-if="isHide"
            >Password:</label
          ><br />
          <input
            class="form-control"
            type="password"
            name="password"
            placeholder="*********"
            id="Input"
            required
            v-model="data.password"
            v-if="isHide"
          />
        </div>
        <div class="form-group">
          <label for="username" class="passwordlabel">User-Name:</label><br />
          <input
            class="form-control"
            type="username"
            name="username"
            placeholder="Username"
            id="Input"
            required
            v-model="data.username"
          />
        </div>
        <div class="form-group">
          <label for="phone" class="passwordlabel">Phone No.:</label><br />
          <input
            class="form-control"
            type="number"
            name="phone"
            placeholder="9876543210"
            id="Input"
            required
            v-model="data.phone_number"
            maxlength="10"
            minlength="10"
          />
        </div>
        <br />
        <button class="button" type="submit">
          {{ editingId ? "UPDATE" : "LOGIN" }}
        </button>
      </form>
    </div></base-card
  >
</template>

<script>
import axios from "axios";
import SideBar from "../sidebar_File/sideBar.vue";
export default {
  components: {
    SideBar,
  },
  data() {
    {
      return {
        data: {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          username: "",
          phone_number: "",
        },
        editingId: "",
        isHide: true,
      };
    }
  },
  created() {
    if (this.$route.query.id) {
      (this.isHide = false), (this.editingId = this.$route.query.id);
      this.data.first_name = this.$route.query.first_name || "";
      this.data.last_name = this.$route.query.last_name || "";
      this.data.email = this.$route.query.email || "";
      this.data.username = this.$route.query.username || "";
      this.data.phone_number = this.$route.query.phone_number || "";
      this.isEditing = true;
    }
  },
  methods: {
    loginData() {
      if (this.editingId) {
        axios
          .put(`http://127.0.0.1:8000/api/users/${this.editingId}`, {
            first_name: this.data.first_name,
            last_name: this.data.last_name,
            email: this.data.email,
            username: this.data.username,
            phone_number: this.data.phone_number,
            // _method: "PATCH",
          })
          .then(() => {
            this.clearForm();
            this.$router.push("/userData");
          });
      } else {
        axios
          .post("http://127.0.0.1:8000/api/users", {
            // .post("https://asdf-96315-default-rtdb.firebaseio.com/posts.json", {
            first_name: this.data.first_name,
            last_name: this.data.last_name,
            email: this.data.email,
            password: this.data.password,
            username: this.data.username,
            phone_number: this.data.phone_number,
          })
          .then((Response) => {
            (this.isHide = true), this.$router.push("/userData");
            return console.log(Response);
          })
          .catch((Response) => {
            console.log(Response);
          });
        this.clearForm();
      }
    },
    clearForm() {
      (this.data.first_name = ""),
        (this.data.last_name = ""),
        (this.data.email = ""),
        (this.data.password = ""),
        (this.data.username = ""),
        (this.data.phone_number = "");
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
