import { createApp } from 'vue'
import { createStore } from "vuex"
import App from './App.vue'
import router from './router/routerFile.js'
import sideBar from './sidebar_File/sideBar.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import BaseCard from './basecard/baseCard.vue';


/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faAt, faEdit, faHouse, faTrash, faUser, faUserMinus, faUserPlus, faUserSecret, } from '@fortawesome/free-solid-svg-icons'
library.add(faUserSecret, faHouse, faUser, faEdit, faTrash, faUserPlus, faUserMinus, faAt)

const store = createStore({
    state() {
        return {
            apiResponse: null,
        };
    },
    mutations: {
        setAPIResponse(state, response) {
            state.apiResponse = response;
        },
    },
});

const app = createApp(App)
    .use(store)
    .component('font-awesome-icon', FontAwesomeIcon,)
    .component('sideBar', sideBar)
    .component('baseCard', BaseCard)
app.use(router)
app.mount('#app')
