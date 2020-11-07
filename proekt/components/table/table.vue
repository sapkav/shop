<template> 
<div class="tables">
  <router-link :to="{ name: 'busket', params: { busket_data: BUSKET }}">
    <div class="tables-link-busket">
      Количество: {{BUSKET.length}}
      </div>
    </router-link>
    <h1 class="tables-title">Catalog {{BUSKET.length}}</h1>
    <div class="tables-list">
        <table-item
          v-for = "product in PRODUCTS"
          :key = "product.article"
          :product_data="product"
          @addToCart = 'addToCart'>
          </table-item>
    </div>
</div>
</template>

<script>
import tableItem from './table-item.vue'
import {mapActions, mapGetters} from 'vuex'

export default { 
    name: 'tables',
    components: {
        tableItem
    },
    props: {
    },
    computed:{
      ...mapGetters([
        'PRODUCTS',
        'BUSKET'
      ])
    },
    methods: {
      addToCart(data) {
        this.ADD_TO_BUSKET(data)
      },
      ...mapActions([
        'GET_PRODUCTS',
         'ADD_TO_BUSKET'
      ]),
        },
    data() {
        return {

        }
    },
    mounted() {
      this.GET_PRODUCTS()
      .then(response => {
        if(response.data) {
          console.log('data arrived')
        }
      })
    },
}
</script>

<style lang="scss">
.tables {

  &-title {
    text-align: center;
    font-size: 40px;
  }

 &-list {
     display: grid;
     grid-template-columns: repeat(4 ,1fr);
     justify-items: center;
 }

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
 }
}
</style>