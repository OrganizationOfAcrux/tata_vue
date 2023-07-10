import { createRouter, createWebHistory } from 'vue-router'
import homeFile from '../components/homeFile.vue'
import userDataTable from '../components/userDataTable.vue'
import loginfile from '../components/loginFile.vue'
import adduser from '../components/addUser.vue'
import forgetPassword from '../password_File/forgetPassword.vue'
import resetPassword from '../password_File/resetPassword.vue'
import roleTable from '../role/roleDataTable.vue'
import addRole from '../role/addRole.vue'
import books from '../library_file/book_file.vue'
import addbook from '../library_file/addBook.vue'
import library from '../library_file/librarayPage.vue'
import history from '../library_file/historyPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: homeFile,
            meta: { requiresAuth: true }
        },
        {
            path: '/userData',
            component: userDataTable,
            meta: { requiresAuth: true }
        },
        { path: '', redirect: 'login' },
        { path: '/login', component: loginfile },
        {
            path: '/addUser', component: adduser,
            meta: { requiresAuth: true }
        },
        {
            path: '/forget', component: forgetPassword
        },
        {
            path: '/reset/:token', component: resetPassword
        },
        {
            path: '/roletable', component: roleTable,
            meta: { requiresAuth: true }
        },
        {
            path: '/addrole', component: addRole,
            meta: { requiresAuth: true }
        },
        {
            path: '/books', component: books,
            meta: { requiresAuth: true }

        },
        {
            path: '/addbook', component: addbook,
            meta: { requiresAuth: true }

        },
        {
            path: '/libraryPage', component: library,
            meta: { requiresAuth: true }

        },
        {
            path: '/historyPage', component: history,
            meta: { requiresAuth: true }

        }
    ]
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem("storeData");
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !isLoggedIn) {
        next({ name: "login" });
    } else {
        next();
    }
});
export default router
