<template> 
<div class="kid"  style="background-image: url(img/kids-back.jpg)">
 <!-- <router-link :to="{ name: 'busket', params: { busket_data: BUSKET }}">
    <div class="kid-link-busket">
      Количество: {{BUSKET.length}}
      </div>
    </router-link> -->
    <h1 class="kid-title">Детские носки</h1>
    <div class="kid-list">
        <kids-item
          v-for = "product in PRODUCTSKIDS"
          :key = "product.article"
          :product_data="product"
          @addToCart = 'addToCart'>
          </kids-item>
    </div>
</div>
</template>

<script>
import kidsItem from './kids-item.vue'
import {mapActions, mapGetters} from 'vuex'

export default { 
    name: 'kid',
    components: {
        kidsItem
    },
    props: {
    },
    computed:{
      ...mapGetters([
        'PRODUCTSKIDS',
        'BUSKET'
      ])
    },
    methods: {
      addToCart(data) {
        this.ADD_TO_BUSKET(data)
      },
      ...mapActions([
         'ADD_TO_BUSKET',
         'GET_PRODUCTSKIDS'
      ]),
        },
    data() {
        return {

        }
    },
    mounted() {
      this.GET_PRODUCTSKIDS()
    },
}
</script>

<style lang="scss">
.kid {

  &-title {
    margin: 0;
    padding-top: 20px;
    padding-bottom: 30px;
    font-size: 40px;
    text-align: center;
    padding-top: 0;
  }

 &-list {
     display: grid;
     grid-template-columns: repeat(4 ,1fr);
     justify-items: center;
 }
/*
 &-link-busket {
   position: absolute;
   padding: 20px;
   color: black;
   font-weight: 700;
   font-size: 30px;
   top: -20px;
   left: 30px;
   text-decoration: underline;
   transition: .6s all ease-in-out;
   border: 1px solid black;

   &:hover {
     transform: scale(1.1);
     color: red;
   }
 } */
}
</style>