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
            @click="addBook"
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

        <div class="button-container"></div>
      </div>
      <div class="bottom-section">
        <table border="2" class="styled-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.subject }}</td>
              <td>{{ user.class }}</td>
              <td>{{ user.available }}</td>
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
    toast.success("Welcome To Book Table", {
      position: "bottom-right",
      autoClose: 2000,
    });
  },
  data() {
    return {
      users: [],
      url: "http://127.0.0.1:8000/api/books?page=1",
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

    deleteUsers(id) {
      this.$axios
        .delete(`http://127.0.0.1:8000/api/books/${id}`)
        .then(() => {
          this.setupSuccess_deleted();
        })
        .catch(() => {
          this.setupError();
        })
        .finally(() => {
          this.getData(this.url);
        });
    },
    editUserData(user) {
      this.$router.push({
        path: "/addbook",
        query: {
          id: user.id,
          class: user.class,
          subject: user.subject,
          available: user.available,
        },
      });
    },
    addBook() {
      this.$router.push("/addbook");
    },
    // for success copied
    setupSuccess_deleted() {
      toast.success("Successfully Deleted", {
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
  color: #009879;
}
.btn1 {
  color: #00744c;
  border: transparent;
  background-color: transparent;
  font-size: 144%;
}
.btn2 {
  color: rgb(255, 0, 0);
  border: transparent;
  background-color: transparent;
  font-size: 144%;
}
.pagination-button-active {
  background-color: #00744c;
  color: white;
  margin: 0 5px;
}
</style>
