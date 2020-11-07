import Vue from 'vue';
import Post from './post.vue';
import store from './vuex/store.js'
import './scss/style.scss'
import router from './router/router.js'


new Vue({
    el: "#app",
    render: h => h(Post),
    store,
    router
})

