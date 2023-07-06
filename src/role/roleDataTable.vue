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
    toast.success("Welcome To Role Table", {
      position: "bottom-right",
      autoClose: 2000,
    });
  },
  data() {
    return {
      users: [],
      //for the pagination
      url: "http://127.0.0.1:8000/api/roles?page=1",
      urlLinks: [],
    };
  },
  // for the pagination
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
    getData(url) {
      this.$axios
        .get(url)
        .then((response) => {
          console.log(response.data.data.data);
          this.users = response.data.data.data;
          // for taking links for paginanation
          this.urlLinks = response.data.data.links;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // for delete
    deleteUsers(id) {
      this.$axios
        .delete(`http://127.0.0.1:8000/api/roles/${id}`)
        .then(() => {
          this.setupSuccess_deleted();
        })
        .catch(() => {
          this.setupErrordelete();
        })
        .finally(() => {
          this.getData(this.url);
        });
    },
    // for copy
    copyRole(id) {
      this.$axios
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
          this.getData(this.url);
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
      toast.error("Role is in use.", {
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
.pagination-button-active {
  background-color: #00744c;
  color: white;
  margin: 0 5px;
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
  /* margin-left: 74rem; */
  margin-top: 1rem;
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
  /* display: flex; */
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
.btn2 {
  color: #00744c;
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
