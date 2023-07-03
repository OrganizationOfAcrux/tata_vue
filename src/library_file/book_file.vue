<template>
  <div class="container_main">
    <div class="sidebar">
      <side-bar></side-bar>
    </div>
    <div class="content">
      <div class="top-section">
        <div class="button-container"></div>
      </div>
      <div class="bottom-section">
        <table border="2" class="styled-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Available</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.subject }}</td>
              <td>{{ user.class }}</td>
              <td>{{ user.available }}</td>
              <td>
                <button class="btn2" @click="addBook(user)">
                  <font-awesome-icon icon="fa-solid fa-plus" />
                </button>
                <button class="btn3" @click="minusBook(user)">
                  <font-awesome-icon icon="fa-solid fa-minus" />
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
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("http://127.0.0.1:8000/api/libraries")
        .then((response) => {
          this.users = response.data.data.map((user) => ({
            id: user.user_id,
            subject: user.subject,
            class: user.class,
            available: user.available,
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
    // for the after add the role push  to next page
    // addBook(user) {
    //   if (user.available > 0) {
    //     this.$axios
    //       .post(`http://127.0.0.1:8000/api/libraries/${user.id}`)
    //       .then((response) => {
    //         // Assuming the API responds with updated user data
    //         user.available = response.data.available;
    //         this.setupSuccess_copied();
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //         this.setupError();
    //       });
    //     console.log("okk added");
    //   } else {
    //     // Show some kind of error message or disable the button
    //     console.log("No more books available for this subject.");
    //   }
    // },
    // minusBook(user) {
    //   if (user.available > 0) {
    //     // this.$axios
    //     //   .post(`http://127.0.0.1:8000/api/minus-book/${user.id}`)
    //     //   .then((response) => {
    //     //     // Assuming the API responds with updated user data
    //     //     user.available = response.data.available;
    //     //     this.setupSuccess_copied();
    //     //   })
    //     //   .catch((error) => {
    //     //     console.error(error);
    //     //     this.setupError();
    //     //   });
    //     console.log("okk removed");
    //   } else {
    //     // Show some kind of error message or disable the button
    //     console.log("No books available to remove for this subject.");
    //   }
    // },
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

<!-- 
    this work for counting
     addbook() {
    if (this.users.length > 0) {
      const bookId = this.users[0].id; // Assuming the ID of the book is stored in the 'id' property.
      const newAvailable = Math.max(0, this.users[0].available - 1);
      
      // Make an API call to update the 'available' value in the backend
      this.$axios
        .put(`http://127.0.0.1:8000/api/books/${bookId}`, { available: newAvailable })
        .then((response) => {
          // Update the 'available' value in the frontend after successful update in the backend
          this.users[0].available = newAvailable;
          this.setupSuccess_copied();
        })
        .catch((error) => {
          console.error(error);
          this.setupError();
        });
    } else {
      this.setupError();
    }
  },

  minusbook() {
    if (this.users.length > 0) {
      const bookId = this.users[0].id; // Assuming the ID of the book is stored in the 'id' property.
      const newAvailable = this.users[0].available + 1;

      // Make an API call to update the 'available' value in the backend
      this.$axios
        .put(`http://127.0.0.1:8000/api/books/${bookId}`, { available: newAvailable })
        .then((response) => {
          // Update the 'available' value in the frontend after successful update in the backend
          this.users[0].available = newAvailable;
          this.setupSuccess_copied();
        })
        .catch((error) => {
          console.error(error);
          this.setupError();
        });
    } else {
      this.setupError();
    }
  },
 -->
