<template> 
<div class="men">
    <h1 class="men-title">Мужские носки</h1>
    <div class="men-filters">
     <select name="" id="" v-model="menFilter" class="men-filters-select">
        <option value="" disabled>Выберите фильтр</option>
        <option>По возрастанию</option>
        <option>По убыванию</option>
        <option>От А до Я</option>
        <option>От Я до А</option>
    </select>
    <div class="men-filters-inputs">
      <span>Ценовая категория</span>
      <span>От</span>
      <input type="text" name="menUnder" @blur="menPrice" v-model.number="menUnder" placeholder="0">
      <span>До</span>
      <input type="text" name="menUp" @blur="menPrice" v-model.number="menUp" placeholder="10000">
    </div>
    <div class="men-filters-checkbox">
      <button @click = 'menDeleteFilters'>Удалить все фильтры</button>
    </div>
    </div>
    <div class="men-list" v-if="changeUpUnder">
        <men-item
          v-for = "product in changeProductsName"
          :key = "product.article"
          :product_data="product">
          </men-item>
    </div>
    <div v-else class="men-noitem">
      <p>Товары не найдены...</p>
    </div>
</div>
</template>

<script>
import menItem from './men-item.vue'
import {mapActions, mapGetters} from 'vuex'

export default { 
    name: 'men',
    components: {
        menItem
    },
    props: {
    },
    computed:{
      ...mapGetters([
        'PRODUCTSMEN',
        'BUSKET',
        'ISPRODUCT'
      ]),
      changeProductsName() {
        if (this.menProducts.length) {
          return this.menProducts
          console.log('menProducts')
        } else {
          return this.PRODUCTSMEN
          console.log('PRODUCTSMEN')
        }
      },
      changeUpUnder() {
        if (this.menUnder <= 300 && this.menUpUnder == false) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      ...mapActions([
         'ADD_TO_BUSKET',
         'GET_PRODUCTS'
      ]),
      menPrice() {
        this.menUpUnder = false
        if (this.menUnder == '' && this.menUp =='') {
           this.menProducts = this.PRODUCTSMEN
        } else
        if (this.menUnder == '' && this.menUp !='') {
           this.menProducts = this.PRODUCTSMEN.filter(item => (item.price >= 0 && item.price <= this.menUp))
        } else
        if (this.menUnder != '' && this.menUp =='') {
           this.menProducts = this.PRODUCTSMEN.filter(item => (item.price >= this.menUnder && item.price <= 10000))
        } else 
        if (this.menUnder != '' && this.menUp !='' && this.menUnder > this.menUp) {
          [this.menUnder, this.menUp] = [this.menUp, this.menUnder]
           this.menProducts = this.PRODUCTSMEN.filter(item => (item.price >= this.menUnder && item.price <= this.menUp))
        } else {
        this.menProducts = this.PRODUCTSMEN.filter(item => (item.price >= this.menUnder && item.price <= this.menUp))
      }
      if (!this.menProducts.length) {this.menUpUnder = true}
      },
      menDeleteFilters() {
        this.menFilter = ''
        this.menUnder = ''
        this.menUp = ''
        this.menProducts = this.PRODUCTSMEN
        this.menUpUnder = false
      }
        },
    data() {
        return {
          menFilter: '',
          menUnder: '',
          menUp: '',
          menProducts: [],
          menUpUnder: false
        }
    },
    watch: {
    menFilter: function() {
      if (!this.menProducts.length) {
        for (let i = 0; i < this.PRODUCTSMEN.length; i++) {
          this.menProducts[i] = this.PRODUCTSMEN[i]
        }
      }
        if (this.menFilter == 'По возрастанию') {
          this.menProducts.sort((a, b) => a.price - b.price)
        } else if (this.menFilter == 'По убыванию') {
          this.menProducts.sort((a, b) => b.price - a.price)
        } else if (this.menFilter == 'От А до Я') {
          this.menProducts.sort((a, b) => {
                if ( b.name > a.name ) return -1;
                if ( b.name > a.name ) return 1;
          });
        } else if (this.menFilter == 'От Я до А') {
          this.menProducts.sort((a, b) => {
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

.men {
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