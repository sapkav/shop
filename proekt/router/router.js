import Vue from 'vue'
import Router from 'vue-router'
import vKids from '../components/kids/kids.vue'
import vBusket from '../components/busket/busket.vue'
import vMen from '../components/men/men.vue'
import vMenu from '../components/v-menu.vue'
import vWomen from '../components/women/women.vue'
import vSuper from '../components/super/super.vue'
import vBadges from '../components/badges/badges.vue'
import vBadgesItemPage from '../components/badges/badges-item-page.vue'
import vKidsItemPage from '../components/kids/kids-item-page.vue'
import vMenItemPage from '../components/men/men-item-page.vue'
import vWomenItemPage from '../components/women/women-item-page.vue'
import vSuperItemPage from '../components/super/super-item-page.vue'
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
            path:'/men/:id',
            name: 'men-item',
            component: vMenItemPage
        }, 
        {
            path:'/women',
            name: 'women',
            component: vWomen
        },
        {
            path:'/women/:id',
            name: 'women-item',
            component: vWomenItemPage
        }, 
        {
            path:'/super',
            name: 'super',
            component: vSuper
        },
        {
            path:'/super/:id',
            name: 'super-item',
            component: vSuperItemPage
        }, 
        {
            path:'/badges',
            name: 'badges',
            component: vBadges
        },
         {
            path:'/badges/:id',
            name: 'badges-item-page',
            component: vBadgesItemPage
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