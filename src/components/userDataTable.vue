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
            style="
              font-size: 100%;
              margin-left: 100%;
              background-color: #00744c;
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
              <th>FirstName</th>
              <th>LastName</th>
              <th>User-Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th style="width: 10%">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.first_name }}</td>
              <td>{{ user.last_name }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone_number }}</td>
              <td>{{ user.role_name }}</td>
              <td>
                <button class="btn1" @click="editUserData(user)">
                  <font-awesome-icon icon="fa-solid fa-edit" /></button
                >&nbsp;&nbsp;
                <button class="btn2" @click="deleteUsers(user.id)">
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Pagination -->
    <div class="pagination" style="margin-left: 10%">
      <button
        v-for="(link, index) in urlLinks"
        :key="index"
        @click="getData(link.url)"
        :class="{ 'pagination-button-active': link.active === true }"
        :disabled="isButtonDisabled(link.url)"
        style="border-radius: 5%; margin: 1%; border-radius: 30%"
      >
        {{
          link.label.indexOf("Previous") >= 0
            ? "Previous"
            : link.label.indexOf("Next") >= 0
            ? "Next"
            : link.label
        }}
      </button>
    </div>

    <!-- Pagination end -->
  </div>
</template>
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  setup() {
    toast.success("Welcome To User Data Table", {
      position: "bottom-right",
      autoClose: 2000,
    });
  },
  data() {
    return {
      users: [],
      selected: [],
      url: "http://127.0.0.1:8000/api/users?page=1",
      urlLinks: [],
    };
  },
  computed: {
    isButtonDisabled() {
      return (url) => {
        return url === null;
      };
    },
  },
  created() {
    this.getData(this.url);
  },
  methods: {
    deleteUsers(id) {
      // this validation for the login account not deleted
      const storedData = JSON.parse(localStorage.getItem("storeData"));
      if (
        storedData &&
        storedData.apiResponse &&
        storedData.apiResponse.data &&
        storedData.apiResponse.data.id === id
      ) {
        // Display an error message or handle the error
        toast.error("You cannot delete your own user account", {
          position: "bottom-right",
          autoClose: 3000,
        });
        return;
      }
      this.$axios
        .delete(`http://127.0.0.1:8000/api/users/${id}`)
        .then(() => {
          this.setupSuccess_deleted();
        })
        .catch(() => {
          this.setuperror();
        })
        .finally(() => {
          this.getData(this.url);
        });
    },
    // get for api call for the pagination
    getData(url) {
      this.$axios
        .get(url)
        .then((response) => {
          this.users = response.data.data.data;
          this.urlLinks = response.data.data.links;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // for the add an users
    addUser() {
      this.$router.push("/addUser");
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
          role_name: user.role_name,
          role_id: user.role_id,
        },
      });
    },
    // for the success deleted
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
  margin-top: 1rem;
}
.button-container {
  display: flex;
}

.button-container button {
  min-width: 120px;
  white-space: nowrap;
}

.bottom-section {
  margin-left: 7.8rem;
  flex: 9;
  width: 100%;
}
/* table Style */
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
  font-style: italic;
}
.styled-table thead tr {
  background-color: #00744c;
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
  border-bottom: 2px solid #00744c;
}
.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #00744c;
}
.btn1 {
  color: #00744c;
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

.pagination-button-active {
  background-color: #00744c;
  color: white;
  margin: 0 5px;
}
</style>
