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
            @click="addUser"
            style="font-size: 144%; margin-left: -70%"
          >
            <!-- <font-awesome-icon icon="fa-solid fa-user-plus" class="font1" /> -->
            Add User</button
          ><button
            class="btn btn-large btn-danger"
            id="btn2"
            type="submit"
            @click="deleteUser(0)"
            style="font-size: 144%; margin-left: 10%"
          >
            Delete
          </button>
        </div>
      </div>
      <!-- <div class="table-container"> -->
      <div class="bottom-section">
        <table border="2" class="styled-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  v-model="selectAllRows"
                  @change="toggleAllCheckboxes"
                />
              </th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>User-Name</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>
                <input type="checkbox" :value="user.id" v-model="selected" />
              </td>
              <td>{{ user.first_name }}</td>
              <td>{{ user.last_name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.phone_number }}</td>
              <td>
                <button class="btn1" @click="editUserData(user)">
                  <font-awesome-icon icon="fa-solid fa-edit" />
                </button>
                <button class="btn2" @click="deleteUser(user.id)">
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

  data() {
    return {
      users: [],
      selected: [],
    };
  },

  created() {
    this.getData();
  },
  computed: {
    selectAllRows: {
      get() {
        return (
          this.selected.length === this.users.length && this.users.length > 0
        );
      },
      set(value) {
        this.selected = value ? this.users.map((user) => user.id) : [];
      },
    },
  },

  methods: {
    getData() {
      axios
        .get("http://127.0.0.1:8000/api/users")
        .then((response) => {
          console.log(response.data);
          this.users = response.data.data.map((user) => ({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            phone_number: user.phone_number,
          }));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // for the add an users
    addUser() {
      this.$router.push("/addUser");
    },
    //for the multiple delete
    deleteUser(id) {
      axios
        .delete("http://127.0.0.1:8000/api/users/delete/data", {
          data: { ids: [id] },
        })
        .then((response) => {
          // Handle the success response
          console.log(response.data); // You can do something with the response data here
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    },

    editUserData(user) {
      this.$router.push({
        path: "/addUser",
        query: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          username: user.username,
          phone_number: user.phone_number,
        },
      });
    },
    // for select or deselect by the main checkbox by main checkbox
    toggleAllCheckboxes() {
      if (this.selectAllRows) {
        this.selected = this.users.map((user) => user.id);
      } else {
        this.selected = [];
      }
    },
    setupSuccess_deleted() {
      toast.success("SuccessFully deleted", {
        autoClose: 2000,
        position: "bottom-right",
      });
    },
    // for facing a error
    setuperror() {
      toast.error("You face an error", {
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
.btn1 {
  color: green;
  border: transparent;
  background-color: transparent;
  font-size: 144%;
}
.btn2 {
  color: red;
  border: transparent;
  background-color: transparent;
  font-size: 144%;
  margin-left: 15%;
}
</style>
