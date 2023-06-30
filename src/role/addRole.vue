<template>
  <base-card>
    <div class="container1">
      <side-bar class="sidebar_1"></side-bar>
      <form @submit.prevent="addRole">
        <div class="form-group">
          <div class="center">
            <label for="email" class="emaillabel">Name:</label><br />
          </div>
          <input
            class="form-control"
            type="name"
            name="name"
            placeholder="Name"
            id="Input"
            required
            v-model="data.name"
          /><br /><br />
        </div>
        <div class="form-group">
          <label for="password" class="passwordlabel">description:</label><br />
          <textarea
            name="description"
            id=""
            cols="63"
            rows="3"
            v-model="data.description"
          ></textarea>
        </div>
        <br />
        <button class="btn btn-success" type="submit">
          {{ editingId ? "UPDATE" : "Add" }}
        </button>
        <br />
      </form>
    </div>
  </base-card>
</template>
<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import SideBar from "../sidebar_File/sideBar.vue";
import "vue3-toastify/dist/index.css";
export default {
  components: {
    SideBar,
  },
  setup() {
    toast.success("Welcome To Add Role Page", {
      autoClose: 2000,
      position: "bottom-right",
    });
  },
  data() {
    return {
      data: {
        name: "",
        description: "",
      },
      editingId: "",
    };
  },
  created() {
    if (this.$route.query.id) {
      this.editingId = this.$route.query.id;
      this.data.name = this.$route.query.name || "";
      this.data.description = this.$route.query.description || "";
      this.isEditing = true;
    }
  },
  methods: {
    addRole() {
      if (this.editingId) {
        axios
          .put(`http://127.0.0.1:8000/api/roles/${this.editingId}`, {
            name: this.data.name,
            description: this.data.description,
          })
          .then(() => {
            this.setupSuccess_update();
            setTimeout(() => {
              this.clearForm();

              this.$router.push("/roletable");
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post("http://127.0.0.1:8000/api/roles", {
            name: this.data.name,
            description: this.data.description,
          })
          .then(() => {
            this.setupSuccess_added();
            setTimeout(() => {
              this.clearForm();
              this.$router.push("/roletable");
            }, 3000);
          })
          .catch(() => {});
        this.clearForm();
      }
    },
    //fpr success login
    setupfor_SuccessLogin() {
      toast.success("login SuccessFully", {
        position: "bottom-right",
        autoClose: 2000,
      });
    },
    // for facing a error
    setupfor_error() {
      toast.error("Something went wrong", {
        position: "bottom-right",

        autoClose: 2000,
      });
    },
    // for clear the form
    clearForm() {
      this.data.email = "";
      this.data.password = "";
    },
    // for success update
    setupSuccess_update() {
      toast.success("SuccessFully Updated", {
        autoClose: 2000,
        position: "bottom-right",
      });
    },
    // for success added
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
  margin-right: 73%;
}
.passwordlabel {
  font-size: 130%;
  margin-right: 67%;
}
#forgot {
  margin-top: 1%;
  margin-left: 26%;
}
</style>
