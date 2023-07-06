<template>
  <div class="container_main">
    <div class="sidebar">
      <side-bar></side-bar>
    </div>
    <div class="content">
      <div class="top-section">
        <div class="top-container">
          <table border="2" class="styled-table">
            <thead>
              <tr>
                <th>Total Books</th>
                <th>Assigned Books</th>
                <th>Remaining Books</th>
                <th>Assigned No. of St.</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book.id">
                <td>{{ book.total_books }}</td>
                <td>{{ book.assigned_books }}</td>
                <td>{{ book.remaining_books }}</td>
                <td>{{ book.students }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bottom-section">
        <!-- search box start -->
        <div class="form-group">
          <label for="name" class="rolelabel">Student Name:</label>
          <input
            class="form-control"
            type="text"
            name="searchname"
            v-model="library.searchname"
            @input="getNameData"
            placeholder="Search for St. Name ..."
            id="searchInput"
          />
          <div
            v-for="student in Students"
            :key="student.id"
            @click="selectName(student)"
          >
            {{ student.first_name }} {{ student.last_name }}
          </div>
        </div>
        <!-- search box end -->

        <!-- dropdown for the class select start -->
        <div style="margin-left: 6%">
          <label for="name" class="rolelabel">Student Class:</label><br />
          <select
            v-model="library.selectedClass"
            @change="sendSelectedClassToAPI"
            style="height: 2.4rem"
          >
            <option value="">Select a Class</option>
            <option value="nine">9th</option>
            <option value="ten">10th</option>
            <option value="eleven">11th</option>
            <option value="twelve">12th</option>
          </select>
        </div>
        <!-- drop down end -->
        <!-- multiselect start -->

        <div style="margin-left: 6%" v-if="library.selectedClass">
          <label for="name" class="rolelabel">Subject:</label><br />

          <VueMultiselect
            v-model="library.subject"
            :options="options"
            :multiple="true"
            :close-on-select="true"
          >
          </VueMultiselect>
        </div>
        <!-- multiselect end -->
        <!-- assign button -->
        <div
          style="margin-left: 6%; margin-top: 1%"
          v-if="library.selectedClass"
        >
          <button class="btn btn-success" @click="assignData">Assign</button>
        </div>

        <div v-else style="margin-left: 6%; margin-top: 1%">
          <!-- Show this section when no class is selected -->
          <p>Select a class to see Subjects and the Assign button.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import VueMultiselect from "vue-multiselect";
export default {
  components: { VueMultiselect },
  setup() {
    toast.success("Welcome To Book Table", {
      position: "bottom-right",
      autoClose: 2000,
    });
  },
  data() {
    return {
      books: [],
      Students: [],
      searchname: "",
      options: ["English", "of", "options"],
      library: {
        searchname: "",
        selectedClass: "",
        subject: [],
      },
    };
  },
  computed: {
    filteredStudents() {
      if (this.library.searchname) {
        const searchQuery = this.library.searchname.toLowerCase();
        return this.Students.filter((student) => {
          const fullName = (
            student.first_name +
            " " +
            student.last_name
          ).toLowerCase();
          return fullName.includes(searchQuery);
        });
      } else {
        return this.Students;
      }
    },
  },
  created() {
    this.bookData();
    this.getNameData();
  },
  methods: {
    // for the book full data
    bookData() {
      this.$axios
        .get("http://127.0.0.1:8000/api/libraries/total")
        .then((response) => {
          this.books = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // for search engine of name
    getNameData() {
      if (this.library.searchname) {
        this.$axios
          .get(
            `http://127.0.0.1:8000/api/libraries/students/${this.library.searchname}`
          )
          .then((response) => {
            this.Students = response.data.data;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    // for display selected name
    selectName(selectedStudent) {
      this.library.searchname =
        selectedStudent.first_name + " " + selectedStudent.last_name;
      this.Students = [];
    },
    // for the send value of class
    sendSelectedClassToAPI() {
      if (this.library.selectedClass) {
        // Make an Axios POST request to send the selected class to the API
        this.$axios
          .post("http://127.0.0.1:8000/api/roles-list", {
            selectedClass: this.library.selectedClass,
          })
          .then((response) => {
            // Handle the API response if needed
            console.log("API response:", response.data);
          })
          .catch((error) => {
            // Handle any errors that occur during the API request
            console.error("Error sending class to API:", error);
          });
      }
    },
    // for subject data from the api call
    getSubjectData() {
      this.$axios
        .get("http://127.0.0.1:8000/api/roles-list")
        .then((response) => {
          this.options = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // select the subject first call the api and store data of subject in the
    // for the post data to assign
    assignData() {
      this.$axios
        .post("http://127.0.0.1:8000/api/users", {
          name: this.library.searchname,
          class: this.library.selectedClass,
          subjects: this.library.subject,
        })
        .then((response) => {
          console.log(response);
          console.log("Button Worked");
        })
        .catch((error) => {
          console.log(error);
          console.log("Button Worked with error");
        });
    },
  },
};
</script>
<style scoped>
#myTable {
  display: none;
}
.filtered-names {
  margin-top: 10px;
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
  margin-left: 10%;
}
.top-section {
  flex: 1;
  background-color: white;
  margin-top: 1rem;
}
.top-container {
  display: flex;
}

.button-container button {
  /* margin-right: 10px; */
  min-width: 120px;
  white-space: nowrap;
}

.bottom-section {
  /* margin-left: 7.8rem; */
  flex: 9;
  display: flex;
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
  min-width: 1265px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  font-style: italic;
}
.styled-table thead tr {
  background-color: #00744c;
  color: #ffffff;
  text-align: left;
}
</style>
<!-- Dropdown start 
 <div>
  <input
    type="text"
    v-model="selectedValuesText"
    :placeholder="selectedClass + ' - ' + selectedOption"
  />
  <select v-model="selectedClass">
    <option value="">Select a Class</option>
    <option value="9th">9th</option>
    <option value="10th">10th</option>
    <option value="11th">11th</option>
    <option value="12th">12th</option>
  </select>

  <select
    v-if="selectedClass === '9th'"
    v-model="selectedSubject"
    multiple
  >
    <option value="">Select an Subject</option>
    <option value="Mathematics">Mathematics</option>
    <option value="Science">Science</option>
    <option value="English">English</option>
    <option value="Social Studies">Social Studies</option>
    <option value="Computer Science">Computer Science</option>
    <option value="Physical Education">Physical Education</option>
  </select>
  <select
    v-if="selectedClass === '10th'"
    v-model="selectedSubject"
    multiple
  >
    <option value="">Select an Subject</option>
    <option value="Mathematics">Mathematics</option>
    <option value="Science">Science</option>
    <option value="English">English</option>
    <option value="Social Studies">Social Studies</option>
    <option value="Computer Science">Computer Science</option>
    <option value="Physical Education">Physical Education</option>
  </select>
  <select
    v-if="selectedClass === '11th'"
    v-model="selectedSubject"
    multiple
  >
    <option value="">Select an Subject</option>
    <option value="Physics">Physics</option>
    <option value="Chemistry">Chemistry</option>
    <option value="Biology">Biology</option>
    <option value="Mathematics">Mathematics</option>
    <option value="English">English</option>
    <option value="Computer Science">Computer Science</option>
  </select>
  <select
    v-if="selectedClass === '12th'"
    v-model="selectedSubject"
    multiple
  >
    <option value="">Select an Subject</option>
    <option value="Physics">Physics</option>
    <option value="Chemistry">Chemistry</option>
    <option value="Biology">Biology</option>
    <option value="Mathematics">Mathematics</option>
    <option value="English">English</option>
    <option value="Computer Science">Computer Science</option>
  </select>
</div>
 Dropdown end... 
selectedClass: "", selectedSubject: "", computed: { selectedValuesText() { if
(this.selectedClass || this.selectedSubject) { return this.selectedClass + " " +
this.selectedSubject; } else { return ""; } }, }, -->
