<template>
<div class="women"  style="background-image: url(img/women-back.jpg)">
 <!-- <router-link :to="{ name: 'busket', params: { busket_data: BUSKET }}">
    <div class="women-link-busket">
      Количество: {{BUSKET.length}}
      </div>
    </router-link> -->
    <h1 class="women-title">Женские носки</h1>
    <div class="women-list">
        <women-item
          v-for = "product in PRODUCTSWOMEN"
          :key = "product.article"
          :product_data="product"
          @addToCart = 'addToCart'>
          </women-item>
    </div>
</div>
</template>

<script>
import womenItem from './women-item.vue'
import {mapActions, mapGetters} from 'vuex'

export default { 
    name: 'women',
    components: {
        womenItem
    },
    props: {
    },
    computed:{
      ...mapGetters([
        'PRODUCTSWOMEN',
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
.women {

  &-title {
    margin: 0;
    padding-top: 20px;
    padding-bottom: 30px;
    font-size: 40px;
    text-align: center;
    padding-top: 0;
    color: rgba(17, 64, 134, 0.897);
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