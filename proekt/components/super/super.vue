<template>
<div class="super"  style="background-image: url(img/super-back.jpg)">
      <h1 class="super-title">Клевые носки</h1>
    <select name="" id="" v-model="superFilter" class="super-select">
        <option disabled value="">Выберите фильтр</option>
        <option>По возрастанию</option>
        <option>По убыванию</option>
        <option>От А до Я</option>
        <option>От Я до А</option>
    </select>
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
    watch: {
      superFilter: function() {
        if (this.superFilter == 'По возрастанию') {
          this.PRODUCTSSUPER.sort((a, b) => a.price - b.price)
        } else if (this.superFilter == 'По убыванию') {
          this.PRODUCTSSUPER.sort((a, b) => b.price - a.price)
        } else if (this.superFilter == 'От А до Я') {
          this.PRODUCTSSUPER.sort((a, b) => {
                if ( b.name > a.name ) return -1;
                if ( b.name > a.name ) return 1;
          });
        } else if (this.superFilter == 'От Я до А') {
          this.PRODUCTSSUPER.sort((a, b) => {
                if ( b.name < a.name ) return -1;
                if ( b.name < a.name ) return 1;
          })
        }
    }
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
          superFilter: ''
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

  &-select {
    padding: 5px 15px;
    margin-bottom: 20px;
    background-color: black;
    color: white;
    margin-left: 40px;
    justify-items: center;
    align-items: center;
  }

  &-title {
    margin: 0;
    padding-top: 20px;
    padding-bottom: 30px;
    font-size: 40px;
    text-align: center;
    padding-top: 0;
    color: rgb(34, 18, 185);
  }

 &-list {
     display: grid;
     grid-template-columns: repeat(4 ,1fr);
     justify-items: center;
 }
}
</style>