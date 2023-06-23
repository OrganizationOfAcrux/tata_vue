<template>
  <div class="sidebar">
    <div class="head">
      <img
        alt="Vue logo"
        src="../assets/logotata.png"
        class="font"
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
      <button class="btn" type="submit" @click="button">
        <font-awesome-icon icon="fa-solid " class="nav-link" />Users
      </button>
    </div>
    <div class="mid2"></div>
    <!-- <a class="side-link" id="sidebar-link" href="#">button1</a>
    <a class="side-link" id="sidebar-link" href="#">button2</a> -->
    <!-- side-link active -->

    <div class="fot">
      <!-- <button
        class="btn btn-large btn-success w-100 h-100"
        type="submit"
        @click="button"
      > -->
      <div id="tooltip">
        <span id="tooltipText"
          ><div v-if="selectedData">
            Email: {{ selectedData.email }}<br />
            Username: {{ selectedData.username }}<br />
            <button @click="logout_User">LogOut</button>
            <!-- {{ apiResponse }} -->
          </div></span
        >
        <span
          ><button style="background-color: aqua; height: 50px; width: 60px">
            <font-awesome-icon
              icon="fa-solid fa-user"
              id="font1"
              class="success"
            /></button
        ></span>
      </div>
      <!-- </button> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: {
        password: "",
        email: "",
      },
    };
  },
  computed: {
    ...mapState(["apiResponse"]),
    selectedData() {
      if (this.apiResponse) {
        const { email, username } = this.apiResponse;
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

    button() {
      this.$router.push("/userData");
      console.log("define your table");
    },
    logout_User() {
      axios
        .post("http://127.0.0.1:8000/api/logout", {
          email: "",
          password: "",
          // console.log("logout");
          // this.$router.push("/login");
        })
        .then((Response) => {
          console.log(Response);
          localStorage.clear();
          console.log("SuccessFully Logout");
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error, "You Face A error");
        });
    },
  },
};
</script>
<style scoped>
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
  margin-left: 20px;
}
.sidebar {
  position: fixed; /* Added */
  top: 0; /* Added */
  left: 0; /* Added */
  height: 100%; /* Added */
  display: flex;
  flex-direction: column; /* Changed */
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
  transform: translateX(-50%);
  background-color: white;
  color: black;
  padding: 10px, 15px;
  border-radius: 7px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s ease;
  margin-left: 70%;
}
#tooltipText::before {
  content: "";
  position: absolute;
  transform: translateX(-50%);
}
#tooltip:hover #tooltipText {
  top: -130%;
  visibility: visible;
  opacity: 1;
}
</style>

<!-- <style>

.nav-link,
.side-link {
  display: block;
  /* margin-block: 0.5rem; */
  /* width: 100%; */
  /* text-decoration: none; */
  /* color: inherit; */
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}
/* #sidebar-button {
  display: block;
  margin-block: 0.5rem;
  width: 100%;
} */
.font {
  color: rgba(106, 153, 228, 0.877);
}
.font1 {
  font-size: 2rem;
  color: rgb(247, 21, 9);
  margin-top: 34rem;
}
.img1 {
  top: 0;
  width: 4rem;
  height: 4rem;
  margin-left: 20rem;
}
</style> -->
