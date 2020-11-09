import Vue from 'vue'
import Router from 'vue-router'
import vTable from '../components/kids/kids.vue'
import vBusket from '../components/busket/busket.vue'
import vMen from '../components/men/men.vue'
import vMenu from '../components/v-menu.vue'
import vWomen from '../components/women/women.vue'


Vue.use(Router);

let router = new Router({
    routes: [
        {
            path:'/',
            name: 'menu',
            component: vMenu
        },
        {
            path:'/kids',
            name: 'kids',
            component: vTable
        },
        {
            path:'/men',
            name: 'men',
            component: vMen
        },
        {
            path:'/women',
            name: 'women',
            component: vWomen
        },
        {
            path:'/busket',
            name: 'busket',
            component: vBusket,
            props: true
        }
    ],
})

export default router;