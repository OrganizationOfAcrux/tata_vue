<template>
  <div class="sidebar">
    <div class="head">
      <img
        alt="Vue logo"
        src="../assets/logotata.png"
        class="font colored-image"
        style="
          top: 0;
          width: 80px;
          height: 80px;
          margin: 0%;
          display: block;
          margin-left: auto;
          margin-right: auto;
        "
        @click="handleImageClick"
      />
    </div>
    <div class="mid">
      <button
        class="btn"
        type="submit"
        @click="button"
        :class="{ green: isUserDataPage }"
      >
        <font-awesome-icon icon="fa-solid " class="nav-link" />Users</button
      ><br /><br /><button
        class="btn"
        type="submit"
        @click="button2"
        :class="{ green1: isRolePage }"
      >
        <font-awesome-icon icon="fa-solid " class="nav-link" />Role
      </button>
    </div>
    <div class="mid2"></div>
    <div class="fot">
      <div id="tooltip">
        <span id="tooltipText"
          ><div v-if="selectedData" style="margin: 3%">
            Email: {{ selectedData.email }}<br />
            Username: {{ selectedData.username }}<br />
            <button @click="logout_User" style="background-color: red">
              LogOut
            </button>
          </div></span
        >
        <span
          ><button
            style="
              background-color: #009879;
              height: 50px;
              min-width: 100%;
              border-color: transparent;
            "
          >
            <font-awesome-icon
              icon="fa-solid fa-user"
              id="font1"
              class="success"
            /></button
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  data() {
    return {
      data: {
        password: "",
        email: "",
      },
      isUserDataPage: false,
      isRolePage: false,
    };
  },

  created() {
    if (this.$route.path === "/userData") {
      this.isUserDataPage = true;
      this.isRolePage = false;
    } else if (this.$route.path === "/addUser") {
      this.isUserDataPage = true;
      this.isRolePage = false;
    } else if (this.$route.path === "/home") {
      this.isUserDataPage = false;
      this.isRolePage = false;
    } else if (this.$route.path === "/roletable") {
      this.isUserDataPage = false;
      this.isRolePage = true;
    } else if (this.$route.path === "/addrole") {
      this.isUserDataPage = false;
      this.isRolePage = true;
    } else {
      this.isUserDataPage = false;
      this.isRolePage = false;
    }
  },
  // this is for the take data from  api response and display
  computed: {
    ...mapState(["apiResponse"]),

    selectedData() {
      let storedData = JSON.parse(localStorage.getItem("storeData"));

      if (storedData && storedData.apiResponse && storedData.apiResponse.data) {
        const { email, username } = storedData.apiResponse.data;
        return { email, username };
      } else if (this.apiResponse && this.apiResponse.data) {
        const { email, username } = this.apiResponse.data;
        return { email, username };
      } else {
        return null;
      }
    },
  },
  methods: {
    handleImageClick() {
      this.$router.push("/home");
    },
    // for the users table
    button() {
      this.$router.push("/userData");
      console.log("define your table");
    },
    // for the role table
    button2() {
      this.$router.push("/roletable");
      this.isRolePage = true;
    },
    logout_User() {
      axios
        .get("http://127.0.0.1:8000/api/logout")
        .then(() => {
          localStorage.clear();
          this.setupSuccess_logout();
          setTimeout(() => {
            this.$router.push("/login"); // Redirect to the login page
          }, 3000);
        })
        .catch(() => {
          this.setuperror();
        });
    },
    // for success logout
    setupSuccess_logout() {
      toast.success("SuccessFully Logout", {
        autoClose: 2000,
        position: "bottom-right",
      });
    },
    // for facing a error
    setuperror() {
      toast.error("You Face A error", {
        autoClose: 2000,
        position: "bottom-right",
      });
    },
  },
};
</script>
<style scoped>
.colored-image {
  filter: brightness(0%) saturate(98%) invert(28%) sepia(23%) saturate(5177%)
    hue-rotate(139deg) brightness(91%) contrast(100%);
}
.green {
  background-color: #009879;
  font-size: 100%;
  min-width: 100%;
}
.green1 {
  background-color: #009879;
  font-size: 100%;
  min-width: 100%;
}
.head {
  height: 15%;
}
.mid {
  height: 10%;
}
.mid {
  height: 70%;
}
.fot {
  height: 5%;
  bottom: 0;
  left: 0;
  margin-top: 50px;
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(215, 212, 212);
  padding: 1rem;
}
#tooltip {
  position: relative;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  font-family: sans-serif;
}
#tooltipText {
  position: absolute;
  transform: translateX(-45%);
  background-color: rgb(223, 220, 220);
  color: black;
  padding: 10px, 15px;
  border-radius: 10px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s ease;
  margin-left: 180%;
  width: 300px;
}
#tooltipText::before {
  content: "";
  position: absolute;
  transform: translateX(-50%);
}
#tooltip:hover #tooltipText {
  top: -185%;
  visibility: visible;
  opacity: 1;
}
</style>
