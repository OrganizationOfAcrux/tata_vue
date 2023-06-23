

import { createRouter, createWebHistory } from 'vue-router'

import homeFile from '../components/homeFile.vue'
import userDataTable from '../components/userDataTable.vue'
import loginfile from '../components/loginFile.vue'
import adduser from '../components/addUser.vue'
import forgetPassword from '../password_File/forgetPassword.vue'
import resetPassword from '../password_File/resetPassword.vue'

const abhi = {
    isAuthenticated() {
        // Check if the authentication token is present
        const authToken = localStorage.getItem("authToken");
        return !!authToken; // Return true if authToken is not null or undefined
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
        { path: '/reset/:token', component: resetPassword }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !abhi.isAuthenticated()) {
        // If the route requires authentication and the user is not authenticated, redirect to the login page
        next('/login')

        // do work on this after some time
        // } else if (to.path === '/login' && abhi.isAuthenticated()) {
        //     // If the user is already authenticated and tries to access the login page, redirect to the home page
        //     next('/home')
        //     if (confirm('If, You do this process, your Account is Logout. Do you want to proceed?')) {
        //         localStorage.clear();
        //         // Perform additional actions after clearing localStorage, if needed.
        //     } else {
        //         // Handle the cancel button action, if needed.
        //     }

        // alert('First Logout, Then go to login ')
    } else {
        // Otherwise, proceed with navigation
        next()
    }
})

export default router
