import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [
        {
            path: '/',
            name: 'login-boxed',
            meta: {layout: 'userpages'},
            component: () => import('../Pages/UserPages/LoginBoxed.vue'),
        },
    ]
});