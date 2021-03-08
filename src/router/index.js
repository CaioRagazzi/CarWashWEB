import Vue from 'vue'
import Router from 'vue-router'
import ForgotPassword from "../Pages/UserPages/ForgotPassword.vue";
import Login from "../Pages/UserPages/Login.vue";

Vue.use(Router);

export default new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [
        {
            path: '/',
            name: 'login',
            meta: {layout: 'userpages'},
            component: Login,
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            meta: {layout: 'userpages'},
            component: ForgotPassword,
        },
    ]
});