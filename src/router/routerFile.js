import { createRouter, createWebHistory } from 'vue-router'
import homeFile from '../components/homeFile.vue'
import userDataTable from '../components/userDataTable.vue'
import loginfile from '../components/loginFile.vue'
import adduser from '../components/addUser.vue'
import forgetPassword from '../password_File/forgetPassword.vue'
import resetPassword from '../password_File/resetPassword.vue'
import roleTable from '../role/roleDataTable.vue'
import addRole from '../role/addRole.vue'

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
