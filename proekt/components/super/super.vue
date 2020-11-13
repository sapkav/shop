<template> 
<div class="super">
    <h1 class="super-title">Супер носки</h1>
    <div class="super-filters">
     <select name="" id="" v-model="superFilter" class="super-filters-select">
        <option value="" disabled>Выберите фильтр</option>
        <option>По возрастанию</option>
        <option>По убыванию</option>
        <option>От А до Я</option>
        <option>От Я до А</option>
    </select>
    <div class="super-filters-inputs">
      <span>Ценовая категория</span>
      <span>От</span>
      <input type="text" name="superUnder" id="" @blur="superPrice" v-model.number="superUnder" placeholder="0">
      <span>До</span>
      <input type="text" name="superUp" id="" @blur="superPrice" v-model.number="superUp" placeholder="10000">
    </div>
    <div class="super-filters-checkbox">
      <button @click = 'superDeleteFilters'>Удалить все фильтры</button>
    </div>
    </div>
    <div class="super-list" v-if="changeUpUnder">
        <super-item
          v-for = "product in changeProductsName"
          :key = "product.article"
          :product_data="product"
          @addToCart = 'addToCart'>
          </super-item>
    </div>
    <div v-else class="super-noitem">
      <p>Товары не найдены...</p>
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
      ]),
      changeProductsName() {
        if (this.superProducts.length) {
          return this.superProducts
          console.log('superProducts')
        } else {
          return this.PRODUCTSSUPER
          console.log('PRODUCTSSUPER')
        }
      },
      changeUpUnder() {
        if (this.superUnder <= 300 && this.superUpUnder == false) {
          return true
        } else {
          return false
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
      superPrice() {
        this.superUpUnder = false
        if (this.superUnder == '' && this.superUp =='') {
           this.superProducts = this.PRODUCTSSUPER
        } else
        if (this.superUnder == '' && this.superUp !='') {
           this.superProducts = this.PRODUCTSSUPER.filter(item => (item.price >= 0 && item.price <= this.superUp))
        } else
        if (this.superUnder != '' && this.superUp =='') {
           this.superProducts = this.PRODUCTSSUPER.filter(item => (item.price >= this.superUnder && item.price <= 10000))
        } else 
        if (this.superUnder != '' && this.superUp !='' && this.superUnder > this.superUp) {
          [this.superUnder, this.superUp] = [this.superUp, this.superUnder]
           this.superProducts = this.PRODUCTSSUPER.filter(item => (item.price >= this.superUnder && item.price <= this.superUp))
        } else {
        this.superProducts = this.PRODUCTSSUPER.filter(item => (item.price >= this.superUnder && item.price <= this.superUp))
      }
      if (!this.superProducts.length) {this.superUpUnder = true}
      },
      superDeleteFilters() {
        this.superFilter = ''
        this.superUnder = ''
        this.superUp = ''
        this.superProducts = this.PRODUCTSSUPER
        this.superUpUnder = false
      }
        },
    data() {
        return {
          superFilter: '',
          superUnder: '',
          superUp: '',
          superProducts: [],
          superUpUnder: false
        }
    },
    watch: {
    superFilter: function() {
      if (!this.superProducts.length) {
        for (let i = 0; i < this.PRODUCTSSUPER.length; i++) {
          this.superProducts[i] = this.PRODUCTSSUPER[i]
        }
      }
        if (this.superFilter == 'По возрастанию') {
          this.superProducts.sort((a, b) => a.price - b.price)
        } else if (this.superFilter == 'По убыванию') {
          this.superProducts.sort((a, b) => b.price - a.price)
        } else if (this.superFilter == 'От А до Я') {
          this.superProducts.sort((a, b) => {
                if ( b.name > a.name ) return -1;
                if ( b.name > a.name ) return 1;
          });
        } else if (this.superFilter == 'От Я до А') {
          this.superProducts.sort((a, b) => {
                if ( b.name < a.name ) return -1;
                if ( b.name < a.name ) return 1;
          })
        }
    }
    },
    mounted() {
    if (!this.ISPRODUCT) {
      this.GET_PRODUCTS()
      .then(
      )
    }
    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');

.super {
 font-family: 'Inconsolata', monospace;

  &-filters {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;

    &-select {
    width: 65%;
    padding: 5px 15px;
    margin-bottom: 20px;
    background-color: black;
    color: white;
    margin-left: 40px;
    justify-items: center;
    align-items: center;
    border-radius: 10px;
  }

  &-inputs {
    justify-self: center;

    span {
      font-size: 25px;
      font-weight: 700;
    }
    
    input {
      width: 70px;
      background-color:white;
      color: black;
      text-align: center;
      border-radius: 10px;
    }
  }

  &-checkbox {

    button {
      width: 70%;
    background-color: black;
    color: white;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  }

}

  &-title {
    margin: 0;
    padding-top: 20px;
    padding-bottom: 30px;
    font-size: 40px;
    text-align: center;
    padding-top: 0;
  }

 &-list {
   padding-top: 20px;
     display: grid;
     grid-template-columns: repeat(4, 1fr);
     width: 80%;
     margin: 0 auto;
     grid-gap: 15px;
 }

 &-noitem {

   width: 520px; 
   margin: 0 auto;
   font-size: 50px;
   font-weight: 700;
   color: rgb(41, 12, 12);
 }
}
</style>