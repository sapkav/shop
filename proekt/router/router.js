import Vue from 'vue'
import Router from 'vue-router'
import vKids from '../components/kids/kids.vue'
import vBusket from '../components/busket/busket.vue'
import vMen from '../components/men/men.vue'
import vMenu from '../components/v-menu.vue'
import vWomen from '../components/women/women.vue'
import vSuper from '../components/super/super.vue'
import vBadges from '../components/badges/badges.vue'
import vPageForItems from '../components/page-for-items.vue'


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
            component: vKids
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
            path:'/super',
            name: 'super',
            component: vSuper
        },
        {
            path:'/badges',
            name: 'badges',
            component: vBadges
        },
        {
            path:'/products/:id',
            name: 'page-for-items',
            component: vPageForItems,
            props: true
        }, 
        {
            path:'/busket',
            name: 'busket',
            component: vBusket,
            props: true
        },
    ],
})

export default router;