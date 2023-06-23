<template>
  <div class="container1">
    <side-bar class="sidebar_1"></side-bar>
    <div class="button">
      <button class="btn btn-large btn-success" type="submit" @click="addUser">
        <font-awesome-icon icon="fa-solid fa-user-plus" class="font1" />
        Add_User
      </button>
      <!-- <button
        class="btn btn-large btn-success"
        type="submit"
        @click="deleteSelected_User"
      >
        <font-awesome-icon icon="fa-solid fa-user-minus" class="font1" />
        DeleteSeletected_User
      </button> -->
    </div>
    <div class="table-container">
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
</template>

<script>
import axios from "axios";
import SideBar from "../sidebar_File/sideBar.vue";

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
          console.log(response.data); // Debugging statement
          // if (Array.isArray(response.data.data)) {
          this.users = response.data.data.map((user) => ({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            phone_number: user.phone_number,
          }));
          // } else {
          //   console.error("Invalid response data format:", response.data);
          // }
        })
        .catch((error) => {
          console.error(error);
          // Handle error gracefully, e.g., show error message to the user
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    addUser() {
      this.$router.push("/addUser");
    },

    deleteUser(ids) {
      axios
        .delete("http://127.0.0.1:8000/api/users/0", { ids: ids })
        .then((response) => {
          // Handle the successful response
          console.log(response.data);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    },
    // deleteSelected_User() {
    //   if (this.selected.length === 0) {
    //     console.log("No rows selected for deletion");
    //     return;
    //   }

    //   const selectedUserIds = this.selected.slice(); // Create a copy of selected user IDs

    //   axios
    //     .delete("http://127.0.0.1:8000/api/users", {
    //       data: { ids: selectedUserIds },
    //     })
    //     .then(() => {
    //       console.log("Successfully deleted selected users");
    //       this.getData(); // Refresh the user data after deletion
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },

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

    toggleAllCheckboxes() {
      if (this.selectAllRows) {
        this.selected = this.users.map((user) => user.id);
      } else {
        this.selected = [];
      }
    },
  },
};
</script>

<style scoped>
#myTable {
  display: none;
}
.button {
  width: 10%;
  height: 10%;
  margin-left: 100%;
  margin-top: 1%;
  margin-right: 0%;
}

.table-container {
  display: flex;
  justify-content: center;
}
.table-container {
  overflow-x: auto;
  margin: 0 auto;
}
.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  left: 50%;
  padding: 50%;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 1000px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
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
