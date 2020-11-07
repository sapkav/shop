import Vue from 'vue'
import Router from 'vue-router'
import vTable from '../components/table/table.vue'
import vBusket from '../components/busket/busket.vue'


Vue.use(Router);

let router = new Router({
    routes: [
        {
            path:'/',
            name: 'table',
            component: vTable
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