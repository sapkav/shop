<template> 
<div class="women">
    <h1 class="women-title">Женские носки</h1>
    <div class="women-filters">
     <select name="" id="" v-model="womenFilter" class="women-filters-select">
        <option value="" disabled>Выберите фильтр</option>
        <option>По возрастанию</option>
        <option>По убыванию</option>
        <option>От А до Я</option>
        <option>От Я до А</option>
    </select>
    <div class="women-filters-inputs">
      <span>Ценовая категория</span>
      <span>От</span>
      <input type="text" name="womenUnder" id="" @blur="womenPrice" v-model.number="womenUnder" placeholder="0">
      <span>До</span>
      <input type="text" name="womenUp" id="" @blur="womenPrice" v-model.number="womenUp" placeholder="10000">
    </div>
    <div class="women-filters-checkbox">
      <button @click = 'womenDeleteFilters'>Удалить все фильтры</button>
    </div>
    </div>
    <div class="women-list" v-if="changeUpUnder">
        <women-item
          v-for = "product in changeProductsName"
          :key = "product.article"
          :product_data="product"
          @addToCart = 'addToCart'>
          </women-item>
    </div>
    <div v-else class="women-noitem">
      <p>Товары не найдены...</p>
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
      ]),
      changeProductsName() {
        if (this.womenProducts.length) {
          return this.womenProducts
          console.log('womenProducts')
        } else {
          return this.PRODUCTSWOMEN
          console.log('PRODUCTSWOMEN')
        }
      },
      changeUpUnder() {
        if (this.womenUnder <= 310 && this.womenUpUnder == false) {
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
      womenPrice() {
        this.womenUpUnder = false
        if (this.womenUnder == '' && this.womenUp =='') {
           this.womenProducts = this.PRODUCTSWOMEN
        } else
        if (this.womenUnder == '' && this.womenUp !='') {
           this.womenProducts = this.PRODUCTSWOMEN.filter(item => (item.price >= 0 && item.price <= this.womenUp))
        } else
        if (this.womenUnder != '' && this.womenUp =='') {
           this.womenProducts = this.PRODUCTSWOMEN.filter(item => (item.price >= this.womenUnder && item.price <= 10000))
        } else 
        if (this.womenUnder != '' && this.womenUp !='' && this.womenUnder > this.womenUp) {
          [this.womenUnder, this.womenUp] = [this.womenUp, this.womenUnder]
           this.womenProducts = this.PRODUCTSWOMEN.filter(item => (item.price >= this.womenUnder && item.price <= this.womenUp))
        } else {
        this.womenProducts = this.PRODUCTSWOMEN.filter(item => (item.price >= this.womenUnder && item.price <= this.womenUp))
      }
      if (!this.womenProducts.length) {this.womenUpUnder = true}
      },
      womenDeleteFilters() {
        this.womenFilter = ''
        this.womenUnder = ''
        this.womenUp = ''
        this.womenProducts = this.PRODUCTSWOMEN
        this.womenUpUnder = false
      }
        },
    data() {
        return {
          womenFilter: '',
          womenUnder: '',
          womenUp: '',
          womenProducts: [],
          womenUpUnder: false
        }
    },
    watch: {
    womenFilter: function() {
      if (!this.womenProducts.length) {
        for (let i = 0; i < this.PRODUCTSWOMEN.length; i++) {
          this.womenProducts[i] = this.PRODUCTSWOMEN[i]
        }
      }
        if (this.womenFilter == 'По возрастанию') {
          this.womenProducts.sort((a, b) => a.price - b.price)
        } else if (this.womenFilter == 'По убыванию') {
          this.womenProducts.sort((a, b) => b.price - a.price)
        } else if (this.womenFilter == 'От А до Я') {
          this.womenProducts.sort((a, b) => {
                if ( b.name > a.name ) return -1;
                if ( b.name > a.name ) return 1;
          });
        } else if (this.womenFilter == 'От Я до А') {
          this.womenProducts.sort((a, b) => {
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

.women {
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