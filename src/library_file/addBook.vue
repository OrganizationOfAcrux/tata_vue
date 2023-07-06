<template>
  <base-card>
    <div class="container1">
      <side-bar class="sidebar_1"></side-bar>
      <form @submit.prevent="submitBook">
        <div class="form-group">
          <div class="center">
            <label for="class" class="firstlabel">Class:</label><br />
          </div>
          <input
            class="form-control"
            type="text"
            name="class"
            placeholder="Class"
            id="Input"
            required
            v-model="data.class"
          />
        </div>
        <div class="form-group">
          <label for="subject" class="lastlabel">Subject:</label><br />
          <input
            class="form-control"
            type="text"
            name="subject"
            placeholder="Subject"
            id="Input"
            required
            v-model="data.subject"
          />
        </div>

        <div class="form-group">
          <label for="available" class="phonelabel">Book No.:</label><br />
          <input
            class="form-control"
            type="number"
            name="available"
            id="Input"
            required
            v-model="data.available"
          />
        </div>

        <br />
        <button class="btn btn-success" type="submit">
          {{ editingId ? "UPDATE" : "Add" }}
        </button>
      </form>
    </div>
  </base-card>
</template>
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  setup() {
    toast.success("Welcome To  User Page", {
      autoClose: 2000,
      position: "bottom-right",
    });
  },
  data() {
    {
      return {
        data: {
          class: "",
          subject: "",
          available: "",
        },

        editingId: "",
      };
    }
  },

  created() {
    if (this.$route.query.id) {
      this.editingId = this.$route.query.id;
      this.data.class = this.$route.query.class || "";
      this.data.subject = this.$route.query.subject || "";
      this.data.available = this.$route.query.available || "";
      this.isEditing = true;
    }
    // this.getData();
  },
  methods: {
    // for the store or update the data
    submitBook() {
      if (this.editingId) {
        this.$axios
          .put(`http://127.0.0.1:8000/api/books/${this.editingId}`, {
            class: this.data.class,
            subject: this.data.subject,
            available: this.data.available,
          })
          .then(() => {
            this.setupSuccess_update();
            setTimeout(() => {
              this.$router.push("/books");
              this.clearForm();
            }, 3000);
          });
      } else {
        this.$axios
          .post("http://127.0.0.1:8000/api/books", {
            class: this.data.class,
            subject: this.data.subject,
            available: this.data.available,
          })
          .then((response) => {
            console.log(response);
            (this.isHide = true), this.setupSuccess_added();
            setTimeout(() => {
              this.clearForm();

              this.$router.push("/books");
            }, 3000);
          })
          .catch((Response) => {
            console.log(Response);
          });
      }
    },
    // for the clear form
    clearForm() {
      (this.data.class = ""),
        (this.data.subject = ""),
        (this.data.available = "");
    },
    // for the success update
    setupSuccess_update() {
      toast.success("SuccessFully Updated", {
        autoClose: 2000,
        position: "bottom-right",
      });
    },
    // for facing a error
    setupSuccess_added() {
      toast.success("SuccessFully, You Added A Book  ", {
        autoClose: 2000,
        position: "bottom-right",
      });
    },
  },
};
</script>
<style scoped>
form {
  display: block;
  margin-top: 0em;
  width: 100%;
}
.container1 {
  justify-content: center;
  justify-items: start;
  background-color: beige;
  width: 100% !important;
  height: 100%;
  display: flex;
  align-items: center;
  width: fit-content;
  padding-right: 1rem;
  padding-left: 1rem;
  text-align: -webkit-center;
  position: relative;
}
#Input {
  width: 30rem;
  height: 2rem;
  font-size: 1rem;
}
.firstlabel {
  font-size: 130%;
  margin-right: 75%;
}
.lastlabel {
  font-size: 130%;
  margin-right: 71%;
}
.phonelabel {
  font-size: 130%;
  margin-right: 68%;
}
</style>
