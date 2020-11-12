<template> 
<div class="kid">
    <h1 class="kid-title">Детские носки</h1>
    <div class="kid-filters">
     <select name="" id="" v-model="kidsFilter" class="kid-filters-select">
        <option value="" disabled>Выберите фильтр</option>
        <option>По возрастанию</option>
        <option>По убыванию</option>
        <option>От А до Я</option>
        <option>От Я до А</option>
    </select>
    <div class="kid-filters-inputs">
      <span>Ценовая категория</span>
      <span>От</span>
      <input type="text" name="kidsUnder" id="" @blur="kidsPrice" v-model.number="kidsUnder" placeholder="0">
      <span>До</span>
      <input type="text" name="kidsUp" id="" @blur="kidsPrice" v-model.number="kidsUp" placeholder="10000">
    </div>
    <div class="kid-filters-checkbox">
      <button @click = 'kidsDeleteFilters'>Удалить все фильтры</button>
    </div>
    </div>
    <div class="kid-list" v-if="kidsUnder <= 300">
        <kids-item
          v-for = "product in changeProductsName"
          :key = "product.article"
          :product_data="product"
          @addToCart = 'addToCart'>
          </kids-item>
    </div>
    <div v-if="kidsUnder > 300" class="kid-noitem">
      <p>Товары не найдены...</p>
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
        'BUSKET',
        'ISPRODUCT'
      ]),
      changeProductsName() {
        if (this.kidsProducts.length) {
          return this.kidsProducts
          console.log('kidsProducts')
        } else {
          return this.PRODUCTSKIDS
          console.log('PRODUCTSKIDS')
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
      kidsPrice() {
        if (this.kidsUnder == '' && this.kidsUp !='') {
           this.kidsProducts = this.PRODUCTSKIDS.filter(item => (item.price >= 0 && item.price <= this.kidsUp))
        } else
        if (this.kidsUnder != '' && this.kidsUp =='') {
           this.kidsProducts = this.PRODUCTSKIDS.filter(item => (item.price >= this.kidsUnder && item.price <= 10000))
        } else 
        if (this.kidsUnder != '' && this.kidsUp !='' && this.kidsUnder > this.kidsUp) {
          [this.kidsUnder, this.kidsUp] = [this.kidsUp, this.kidsUnder]
           this.kidsProducts = this.PRODUCTSKIDS.filter(item => (item.price >= this.kidsUnder && item.price <= this.kidsUp))
        } else {
        this.kidsProducts = this.PRODUCTSKIDS.filter(item => (item.price >= this.kidsUnder && item.price <= this.kidsUp))
      }
      },
      kidsDeleteFilters() {
        this.kidsFilter = ''
        this.kidsUnder = ''
        this.kidsUp = ''
        this.kidsProducts = this.PRODUCTSKIDS
      }
        },
    data() {
        return {
          kidsFilter: '',
          kidsUnder: '',
          kidsUp: '',
          kidsProducts: []
        }
    },
    watch: {
    kidsFilter: function() {
      if (!this.kidsProducts.length) {
        for (let i = 0; i < this.PRODUCTSKIDS.length; i++) {
          this.kidsProducts[i] = this.PRODUCTSKIDS[i]
        }
      }
        if (this.kidsFilter == 'По возрастанию') {
          this.kidsProducts.sort((a, b) => a.price - b.price)
        } else if (this.kidsFilter == 'По убыванию') {
          this.kidsProducts.sort((a, b) => b.price - a.price)
        } else if (this.kidsFilter == 'От А до Я') {
          this.kidsProducts.sort((a, b) => {
                if ( b.name > a.name ) return -1;
                if ( b.name > a.name ) return 1;
          });
        } else if (this.kidsFilter == 'От Я до А') {
          this.kidsProducts.sort((a, b) => {
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

.kid {
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