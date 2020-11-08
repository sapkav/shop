<template>
 <div class = "main-wrapper">  
     <div class = "main-wrapper-header">
         <div class="main-wrapper-header-logo">
             <nav><router-link to="/">logo</router-link></nav>
         </div>
         <div class="main-wrapper-header-links">
             <nav><router-link :to="'kids'">Kids Socks</router-link>
             <router-link :to="'busket'">Busket</router-link>
             </nav>
         </div>
        <div class="main-wrapper-header-logo">
             <span>sdds</span>
         </div>
     </div>
     <keep-alive>
     <router-view></router-view>
     </keep-alive>
     </div> 
</template>

<script>
import {mapGetters} from 'vuex'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

export default {
name: 'main-wrapper',
data() {
    return {

    }
},
components: {

},
computed: {

}
}
</script>

<style lang="scss">
.main-wrapper {

    &-header {
        z-index: 1;
        display: grid;
        position: sticky;
        top: 0;
        grid-template-columns: 1fr 4fr 1fr;  
        justify-items: center;
        background-color: rgba(97, 100, 233, 0.9);
        padding-top: 14px;
        padding-bottom: 14px;

        &-links {
            a {
                text-decoration: none;
                transition: all .5s ease-in-out;
                font-size: 20px;

                &:hover {
                    color: red;
                    transform: scale(1.2);
                }
            }
        }
    }
}
</style>