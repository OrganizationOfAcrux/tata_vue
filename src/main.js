import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from './router/routerFile.js';
import SideBar from './sidebar_File/sideBar.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import BaseCard from './basecard/baseCard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAt, faCopy, faEdit, faHouse, faTrash, faUser, faUserMinus, faUserPlus, faUserSecret } from '@fortawesome/free-solid-svg-icons';
library.add(faUserSecret, faHouse, faUser, faEdit, faTrash, faUserPlus, faUserMinus, faAt, faCopy);
const app = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('SideBar', SideBar)
    .component('baseCard', BaseCard);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$toast = toast;
app.use(router);
app.mount('#app');

