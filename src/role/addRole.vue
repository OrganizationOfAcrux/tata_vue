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
          <label for="password" class="passwordlabel">Description:</label><br />
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
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
        this.$axios
          .put(`http://127.0.0.1:8000/api/roles/${this.editingId}`, {
            name: this.data.name,
            description: this.data.description,
          })
          .then((response) => {
            this.handleResponse(response, response.data.msg);
            setTimeout(() => {
              this.clearForm();
              this.$router.push("/roletable");
            }, 3000);
          })
          .catch((error) => {
            this.handleError(error, error.msg);
          });
      } else {
        this.$axios
          .post("http://127.0.0.1:8000/api/roles", {
            name: this.data.name,
            description: this.data.description,
          })
          .then((response) => {
            this.handleResponse(response, response.data.msg);
            setTimeout(() => {
              this.clearForm();
              this.$router.push("/roletable");
            }, 3000);
          })
          .catch((error) => {
            this.handleError(error, error.msg);
          });
      }
    },
    // for clear the form
    clearForm() {
      this.data.email = "";
      this.data.password = "";
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
  margin-right: 73%;
}
.passwordlabel {
  font-size: 130%;
  margin-right: 66%;
}
</style>
