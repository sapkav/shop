<template>
<div class="super"  style="background-image: url(img/super-back.jpg)">
 <!-- <router-link :to="{ name: 'busket', params: { busket_data: BUSKET }}">
    <div class="women-link-busket">
      Количество: {{BUSKET.length}}
      </div>
    </router-link> -->
    <h1 class="super-title">Клевые носки</h1>
    <div class="super-list">
        <super-item
          v-for = "product in PRODUCTSSUPER"
          :key = "product.article"
          :product_data="product"
          @addToCart = 'addToCart'>
          </super-item>
    </div>
</div>
</template>

<script>
import superItem from './super-item.vue'
import {mapActions, mapGetters} from 'vuex'

export default { 
    name: 'super',
    components: {
        superItem
    },
    props: {
    },
    computed:{
      ...mapGetters([
        'PRODUCTSSUPER',
        'BUSKET',
        'ISPRODUCT'
      ])
    },
    methods: {
      addToCart(data) {
        this.ADD_TO_BUSKET(data)
      },
      ...mapActions([
         'ADD_TO_BUSKET',
         'GET_PRODUCTS'
      ]),
        },
    data() {
        return {

        }
    },
    mounted() {
    if (!this.ISPRODUCT) {
      this.GET_PRODUCTS()
    }
    },
}
</script>

<style lang="scss">
.super {

  &-title {
    margin: 0;
    padding-top: 20px;
    padding-bottom: 30px;
    font-size: 40px;
    text-align: center;
    padding-top: 0;
    color: rgb(17, 235, 82);
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