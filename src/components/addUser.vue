<template>
  <base-card>
    <div class="container1">
      <side-bar class="sidebar_1"></side-bar>
      <form @submit.prevent="storeData">
        <div class="form-group">
          <div class="center">
            <label for="first_name" class="firstlabel">FirstName:</label><br />
          </div>
          <input
            class="form-control"
            type="text"
            name="first_name"
            placeholder="Firstname"
            id="Input"
            required
            v-model="data.first_name"
          />
        </div>
        <div class="form-group">
          <label for="last_name" class="lastlabel">LastName:</label><br />
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
          <label for="username" class="usernamelabel">User-Name:</label><br />
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
          <label for="email" class="emaillabel">Email:</label><br />
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
          <label for="phone" class="phonelabel">Phone No.:</label><br />
          <input
            class="form-control"
            type="tel"
            name="phone"
            placeholder="9876543210"
            id="Input"
            required
            v-model="data.phone_number"
            maxlength="10"
            minlength="10"
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
          <label for="phone" class="rolelabel">Role:</label><br />
          <select
            class="form-control"
            name="role"
            id="Input"
            required
            v-model="data.role_id"
          >
            <option v-for="(name, id) in roles" :key="id" :value="id">
              {{ name }}
            </option>
          </select>
        </div>
        <br />
        <button class="btn btn-success" type="submit">
          {{ editingId ? "UPDATE" : "Add" }}
        </button>
      </form>
    </div>
  </base-card>
</template>
<script>
import axios from "axios";
import SideBar from "../sidebar_File/sideBar.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  components: {
    SideBar,
  },
  setup() {
    toast.success("Welcome To  User Page", {
      autoClose: 2000,
      position: "bottom-right",
    });
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
          role_id: "",
        },
        roles: [],
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
      this.data.role_name = this.$route.query.role_name || "";
      this.data.role_id = this.$route.query.role_id || "";
      this.isEditing = true;
    }
    this.getData();
  },
  methods: {
    // for the store or update the data
    storeData() {
      if (this.editingId) {
        axios
          .put(`http://127.0.0.1:8000/api/users/${this.editingId}`, {
            first_name: this.data.first_name,
            last_name: this.data.last_name,
            email: this.data.email,
            username: this.data.username,
            phone_number: this.data.phone_number,
            role_id: this.data.role_id,
          })
          .then(() => {
            this.setupSuccess_update();
            setTimeout(() => {
              this.$router.push("/userData");
              this.clearForm();
            }, 3000);
          });
      } else {
        axios
          .post("http://127.0.0.1:8000/api/users", {
            first_name: this.data.first_name,
            last_name: this.data.last_name,
            email: this.data.email,
            password: this.data.password,
            username: this.data.username,
            phone_number: this.data.phone_number,
            role_id: this.data.role_id,
          })
          .then((response) => {
            console.log(response);
            (this.isHide = true), this.setupSuccess_added();
            setTimeout(() => {
              this.clearForm();

              this.$router.push("/userData");
            }, 3000);
          })
          .catch((Response) => {
            console.log(Response);
          });
      }
    },
    // get data from role api
    getData() {
      axios
        .get("http://127.0.0.1:8000/api/roles-list")
        .then((response) => {
          this.roles = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // for the clear form
    clearForm() {
      (this.data.first_name = ""),
        (this.data.last_name = ""),
        (this.data.email = ""),
        (this.data.password = ""),
        (this.data.username = ""),
        (this.data.phone_number = "");
    },
    // for the success update
    setupSuccess_update() {
      toast.success("SuccessFully Updated", {
        autoClose: 2000,
        position: "bottom-right",
      });
    },
    // for facing a error
    setupSuccess_added() {
      toast.success("SuccessFully, You Added A Member  ", {
        autoClose: 2000,
        position: "bottom-right",
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
  margin-right: 74%;
}
.passwordlabel {
  font-size: 130%;
  margin-right: 68%;
}
.firstlabel {
  font-size: 130%;
  margin-right: 67%;
}
.lastlabel {
  font-size: 130%;
  margin-right: 67%;
}
.usernamelabel {
  font-size: 130%;
  margin-right: 65%;
}
.phonelabel {
  font-size: 130%;
  margin-right: 66%;
}
.rolelabel {
  font-size: 130%;
  margin-right: 76%;
}
.imagelabel {
  font-size: 130%;
  margin-right: 73%;
}
.imagepreview {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
