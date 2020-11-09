<template>
 <div class = "main-wrapper">  
     <div class = "main-wrapper-header">
         <div class="main-wrapper-header-logo">
             <nav><router-link to="/">logo</router-link></nav>
         </div>
         <div class="main-wrapper-header-links">
             <nav>
             <router-link :to="'kids'" class="main-wrapper-header-links-link">KidsSocks</router-link>
             <router-link :to="'men'" class="main-wrapper-header-links-link">MenSocks</router-link>
             <router-link :to="'women'" class="main-wrapper-header-links-link">WomenSocks</router-link>
             </nav>
         </div>
        <div class="main-wrapper-header-logo">
             <router-link :to="'busket'" class="main-wrapper-header-links-link"><img src="img/shop.png" alt="" width="25">
             <span>{{BUSKET.length}}</span>
             </router-link>
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
      ...mapGetters([
        'BUSKET'
      ])
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
        background-color: white;
        padding-top: 14px;
        padding-bottom: 14px;
        border-bottom: 1px solid black;

        &-links {
            a {
                color: rgb(86, 49, 155);
                text-decoration: none;
                transition: all .5s ease-in-out;
                font-size: 20px;

                &:hover {
                    color: red;
                    transform: scale(1.2);
                }
            }

            &-link {
                padding-right: 20px;
            }
        }
    }
}
</style>