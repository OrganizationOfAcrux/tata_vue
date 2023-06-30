<template>
  <div class="container_main">
    <div class="sidebar">
      <side-bar></side-bar>
    </div>
    <div class="content">
      <div class="top-section">
        <div class="button-container">
          <button
            class="btn btn-large btn-success"
            id="btn1"
            type="submit"
            @click="addRole"
            style="
              font-size: 100%;
              margin-left: 100%;
              background-color: #009879;
            "
          >
            <font-awesome-icon icon="fa-solid fa-user-plus" class="font1" />
            Add
          </button>
        </div>
      </div>
      <div class="bottom-section">
        <table border="2" class="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.description }}</td>
              <td>
                <button class="btn1" @click="copyRole(user.id)">
                  <font-awesome-icon icon="fa-solid fa-copy" />
                </button>
                <button class="btn2" @click="editUserData(user)">
                  <font-awesome-icon icon="fa-solid fa-edit" />
                </button>
                <button class="btn3" @click="deleteUsers(user.id)">
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
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
    toast.success("Welcome To Role Table", {
      position: "bottom-right",
      autoClose: 2000,
    });
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get("http://127.0.0.1:8000/api/roles")
        .then((response) => {
          console.log(response.data.data);
          this.users = response.data.data.map((user) => ({
            id: user.id,
            name: user.name,
            description: user.description,
          }));
        })
        .catch((error) => {
          console.error(error);
          this.setupError();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // for delete
    deleteUsers(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/roles/${id}`)
        .then(() => {
          this.setupSuccess_deleted();
        })
        .catch(() => {
          this.setupErrordelete();
        })
        .finally(() => {
          this.getData();
        });
    },
    // for copy
    copyRole(id) {
      axios
        .get(`http://127.0.0.1:8000/api/roles/${id}/edit`)
        .then((response) => {
          console.log(response);
          const copiedUser = this.users.find((user) => user.id === id);
          const index = this.users.findIndex((user) => user.id === id);
          if (index !== -1) {
            this.users.splice(index + 1, 0, { ...copiedUser });
          }
          this.setupSuccess_copied();
        })
        .catch(() => {
          this.setupError();
        })
        .finally(() => {
          this.getData();
        });
    },
    // for the after add the role push  to next page
    addRole() {
      this.$router.push("/addrole");
    },
    //for the edit role
    editUserData(user) {
      this.$router.push({
        path: "/addrole",
        query: {
          id: user.id,
          name: user.name,
          description: user.description,
        },
      });
    },
    // for success deleted
    setupSuccess_deleted() {
      toast.success("Role deleted successfully.", {
        autoClose: 2000,
        position: "bottom-right",
      });
    },
    // for success copied
    setupSuccess_copied() {
      toast.success("Role copied successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    },
    // for the error
    setupError() {
      toast.error("Something went wrong", {
        autoClose: 2000,
        position: "bottom-right",
      });
    },
    // for the delete
    setupErrordelete() {
      toast.error("Cannot delete the role. It is in use by some users.", {
        autoClose: 2000,
        position: "bottom-right",
      });
    },
  },
};
</script>

<style scoped>
#myTable {
  display: none;
}
.container {
  display: flex;
  height: 100vh;
}

.sidebar {
  flex: 1;
  background-color: #f1f1f1;
}
.content {
  flex: 9;
  display: flex;
  flex-direction: column;
}
.top-section {
  flex: 1;
  background-color: white;
  margin-left: 74rem;
  margin-top: 3rem;
}
.button-container {
  display: flex;
}

.button-container button {
  /* margin-right: 10px; */
  min-width: 120px;
  white-space: nowrap;
}

.bottom-section {
  margin-left: 7.8rem;
  flex: 9;
  display: flex;
  width: 100%;
}
.styled-table {
  margin-left: 17rem;
  border-collapse: collapse;
  margin: 25px 0;
  left: 50%;
  padding: 50%;
  font-size: 0.9em;
  font-family: sans-serif;
  font-style: italic;

  min-width: 1000px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  width: 100%;
}
.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: center;
}
.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}
.btn2 {
  color: #009879;
  border: transparent;
  background-color: transparent;
  font-size: 144%;
  margin-left: 3rem;
  /* margin-right: -3rem; */
}
.btn1 {
  color: yellow;
  border: transparent;
  background-color: transparent;
  font-size: 144%;
}
.btn3 {
  color: red;
  border: transparent;
  background-color: transparent;
  font-size: 144%;
  margin-left: 10%;
}
</style>
