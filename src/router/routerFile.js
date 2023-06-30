import { createRouter, createWebHistory } from 'vue-router'
import homeFile from '../components/homeFile.vue'
import userDataTable from '../components/userDataTable.vue'
import loginfile from '../components/loginFile.vue'
import adduser from '../components/addUser.vue'
import forgetPassword from '../password_File/forgetPassword.vue'
import resetPassword from '../password_File/resetPassword.vue'
import roleTable from '../role/roleDataTable.vue'
import addRole from '../role/addRole.vue'

const abhi = {
    isAuthenticated() {
        // Check if the authentication token is present
        const authToken = localStorage.getItem("authToken");
        return !!authToken;
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: homeFile,
            meta: { requiresAuth: true } // Add meta field for requiring authentication
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
        { path: '/forget', component: forgetPassword },
        { path: '/reset/:token', component: resetPassword },
        { path: '/roletable', component: roleTable },
        { path: '/addrole', component: addRole }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !abhi.isAuthenticated()) {
        // If the route requires authentication and the user is not authenticated, redirect to the login page
        next('/login')
    } else {
        // Otherwise, proceed with navigation
        next()
    }
})

export default router
