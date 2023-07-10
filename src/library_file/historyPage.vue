<template>
  <div class="container_main">
    <div class="sidebar">
      <side-bar></side-bar>
    </div>
    <div class="content">
      <div class="top-section">
        <div class="top-container"></div>
      </div>
      <div class="bottom-section">
        <!-- search box start -->
        <div class="form-group">
          <div class="dropdown">
            <label for="name" class="rolelabel">Select Student Name:</label>
            <br />
            <input
              class="form-control"
              type="text"
              name="searchname"
              v-model="library.searchname"
              @input="getNameData"
              placeholder="Search for St. Name ..."
              id="searchInput"
              style="width: 150%"
            />
            <div class="dropdown-content">
              <table>
                <tr
                  v-for="(student, index) in Students"
                  :key="student.id"
                  @click="selectName(student)"
                  :class="{ selected: student === selectedStudent }"
                  :value="student.id"
                  v-show="index < 10"
                >
                  <td>{{ student.first_name }} {{ student.last_name }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!-- search box end -->

        <!-- assign button -->
        <!-- <div style="margin-left: 35%; margin-top: 2%">
          <button class="btn btn-success" @click="assignData">Assign</button>
        </div> -->
      </div>
      <br /><br />
      <!-- Assign Data Table  -->
      <div class="assignTable">
        <table border="2" class="styled-table">
          <thead>
            <tr>
              <th>Name Of Books</th>
              <th>Taken Day</th>
              <th>Return Day</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in historyData" :key="user.id">
              <td>{{ user.book_name }}</td>
              <td>{{ user.created_at }}</td>
              <td>{{ user.updated_at }}</td>
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
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
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
      Students: [],
      searchname: "",
      historyData: [],
      library: {
        id: "",
        subjectId: "",
      },
    };
  },

  computed: {
    // for filtered the name of search student
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
    this.getNameData();
  },
  methods: {
    onSelectSubject(selectedSubjects) {
      if (Array.isArray(selectedSubjects) && selectedSubjects.length > 0) {
        this.library.subjectId = selectedSubjects[0].id;
      } else {
        this.library.subjectId = "";
      }
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
          .catch(() => {});
      }
    },
    // for display selected name
    selectName(selectedStudent) {
      console.log("selectName called");
      this.library.searchname =
        selectedStudent.first_name + " " + selectedStudent.last_name;
      this.Students = [];
      this.selectedStudent = selectedStudent;
      this.library.id = selectedStudent.id;
      this.sendSelectedNameToAPIForHistory(this.library.id);
    },

    // for the send selected name Id and get the response of history and fill in the history table
    sendSelectedNameToAPIForHistory() {
      console.log("hjgsdakf;mpsd");
      if (this.library.searchname) {
        const payload = {
          user_id: this.library.id, // Use the selected student's ID in the payload
        };
        const params = new URLSearchParams(payload);
        console.log("sendSelectedNameToAPIForHistory called");
        this.$axios
          .get(`http://127.0.0.1:8000/api/libraries/history?${params}`)
          .then((response) => {
            console.log(response.data.data);
            this.historyData = response.data.data;
            // const responseData = response.data.data;
            // if (Array.isArray(responseData.data.subjects)) {
            //   this.historyData = responseData.data.subjects.map((subject) => {
            //     return {
            //       id: subject.id,
            //       subject: subject.subject,
            //     };
            //   });
            // }
          })
          .catch(() => {});
      }
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
  min-width: 120px;
  white-space: nowrap;
}

.bottom-section {
  flex: 9;
  display: flex;
  width: 100%;
}

/* table Style 2nd */
.styled-table {
  margin-left: 17rem;
  border-collapse: collapse;
  margin: 25px 0;
  left: 50%;
  padding: 50%;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 1250px;
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
.selected {
  background-color: yellow;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 312px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  max-height: 150px;
  overflow-y: auto;
}

.dropdown-content table {
  width: 100%;
  border-collapse: collapse;
}

.dropdown-content table tr:hover {
  background-color: #ddd;
}

.dropdown-content table td {
  padding: 8px 16px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content::-webkit-scrollbar {
  width: 8px;
}

.dropdown-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}

.selected {
  background-color: #ddd;
}
</style>
