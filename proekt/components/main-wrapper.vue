<template>
 <div class = "main-wrapper">  
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

</style>