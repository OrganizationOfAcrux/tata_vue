<template>
  <div class="container_main">
    <div class="sidebar">
      <side-bar></side-bar>
    </div>
    <div class="content">
      <div class="top-section">
        <div class="top-container">
          <!-- Book Table -->
          <table border="2" class="styled-table1">
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

        <!-- dropdown for the class select start -->
        <div style="margin-left: 15%">
          <label for="name" class="rolelabel">Student Class:</label><br />
          <select
            v-model="library.selectedClass"
            @change="sendSelectedClassToAPI"
            style="height: 2.4rem; width: 15rem"
          >
            <!-- <option value="">Select a Class</option> -->
            <option value="9" selected>9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        </div>
        <!-- drop down end -->
        <!-- multiselect start -->

        <div style="margin-left: 10%">
          <label for="name" class="rolelabel">Subject:</label><br />

          <VueMultiselect
            v-model="library.subjectId"
            :options="options"
            :multiple="true"
            :close-on-select="false"
            @select="onSelectSubject"
            label="subject"
            track-by="id"
            style="width: 17rem"
          ></VueMultiselect>
        </div>
        <!-- multiselect end -->
        <!-- assign button -->
        <div style="margin-left: 5%; margin-top: 2%">
          <button class="btn btn-success" @click="assignData">Assign</button>
        </div>
      </div>
      <br /><br />
      <!-- Assign Data Table  -->
      <div class="assignTable">
        <table border="2" class="styled-table">
          <thead>
            <tr>
              <th>Name Of Books</th>
              <th>St. Class</th>
              <th>Student Name</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.book_name }}</td>
              <td>{{ user.class_name }}</td>
              <td>{{ user.student_name }}</td>
              <td>
                <button class="btn btn-success" @click="receiveBook(user.id)">
                  Receive
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
      <br /><br />
      <!-- Pagination end -->
      <!-- History Table -->
      <div class="historyTable" v-if="selectedStudent">
        <h2>:History Table -></h2>

        <!--for the hide table befor the selectd the serachname if remove this only remove the v-if condition  -->
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
            <template v-if="historyData && historyData.length > 0">
              <tr v-for="user in historyData" :key="user.id">
                <td>{{ user.book_name }}</td>
                <td>{{ user.created_at }}</td>
                <td>{{ user.updated_at }}</td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="4">No history data available.</td>
              </tr>
            </template>
          </tbody>
        </table>
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
      users: [],
      books: [],
      Students: [],
      historyData: [],

      searchname: "",
      options: [],
      library: {
        id: "",
        selectedClass: "",
        subjectId: "",
      },
      // for pagination
      url: "http://127.0.0.1:8000/api/libraries/index?page=1", //update this link
      urlLinks: [],
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
    // for pagination
    isButtonDisabled() {
      return (url) => {
        return url === null;
      };
    },
  },
  created() {
    this.bookData();
    this.getNameData();
    this.getData(this.url);
  },
  methods: {
    onSelectSubject(selectedSubjects) {
      if (Array.isArray(selectedSubjects) && selectedSubjects.length > 0) {
        this.library.subjectId = selectedSubjects[0].id;
      } else {
        this.library.subjectId = "";
      }
    },
    // for the book full data
    bookData() {
      this.$axios
        .get("http://127.0.0.1:8000/api/libraries/total")
        .then((response) => {
          this.books = response.data;
        })
        .catch(() => {});
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
      this.library.searchname =
        selectedStudent.first_name + " " + selectedStudent.last_name;
      this.Students = [];
      this.selectedStudent = selectedStudent;
      this.historyData = []; // for the hide table before selcted the searchname
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
    // for the send selected class and selected name Id and get the response and fill in vuemultiselect dropdown
    sendSelectedClassToAPI() {
      if (this.library.selectedClass) {
        const payload = {
          user_id: this.library.id,
          class: this.library.selectedClass,
        };
        const params = new URLSearchParams(payload);

        this.$axios
          .get(`http://127.0.0.1:8000/api/libraries/search-subject?${params}`)
          .then((response) => {
            this.option = response.data;
            const responseData = response.data;
            if (Array.isArray(responseData.data.subjects)) {
              this.options = responseData.data.subjects.map((subject) => {
                return {
                  id: subject.id,
                  subject: subject.subject,
                };
              });
            }
          })
          .catch(() => {});
      }
    },

    // for the post data to assign
    assignData() {
      const payload = {
        user_id: this.library.id,
        book_ids: this.library.subjectId.map((subject) => subject.id),
      };

      this.$axios
        .post("http://127.0.0.1:8000/api/libraries/assigne", payload)
        .then(() => {})
        .catch(() => {});
      this.cleantheinput();
      setTimeout(() => {
        this.bookData();
        this.getData(this.url);
      }, 1000);
    },
    // for the receiveBook
    receiveBook(id) {
      this.$axios
        .delete(`http://127.0.0.1:8000/api/libraries/${id}`) // update the url
        .then((response) => {
          console.log(response, "Good");
        })
        .catch((error) => {
          console.log(error, "Face a Error");
        })
        .finally(() => {
          this.getData(this.url);
          setTimeout(() => {
            this.bookData();
          }, 1000);
        });
    },
    // get for api call for the pagination
    getData(url) {
      this.$axios
        .get(url)
        .then((response) => {
          // console.log(response);
          this.users = response.data.data.data;
          console.log(response.data.data.data);
          this.urlLinks = response.data.data.links;
          console.log(response.data.data.links);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //
    cleantheinput() {
      this.library.searchname = "";
      this.library.selectedClass = "";
      this.library.subjectId = "";
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
/* table Style */
.styled-table1 {
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
.styled-table1 thead tr {
  background-color: #00744c;
  color: #ffffff;
  text-align: left;
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
