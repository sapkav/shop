import Vue from 'vue'
import Router from 'vue-router'
import vKids from '../components/kids/kids.vue'
import vBusket from '../components/busket/busket.vue'
import vMen from '../components/men/men.vue'
import vMenu from '../components/v-menu.vue'
import vWomen from '../components/women/women.vue'
import vSuper from '../components/super/super.vue'
import vBadges from '../components/badges/badges.vue'
import vKidsItemPage from '../components/kids/kids-item-page.vue'


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
            path:'/kids/:id',
            name: 'kids-item',
            component: vKidsItemPage
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
            path:'/busket',
            name: 'busket',
            component: vBusket,
            props: true
        }
    ],
})

export default router;