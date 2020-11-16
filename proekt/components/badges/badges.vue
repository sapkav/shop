<template> 
<div class="badges">
    <h1 class="badges-title">Значки</h1>
    <div class="badges-filters">
     <select name="" id="" v-model="badgesFilter" class="badges-filters-select">
        <option value="" disabled>Выберите фильтр</option>
        <option>По возрастанию</option>
        <option>По убыванию</option>
        <option>От А до Я</option>
        <option>От Я до А</option>
    </select>
    <div class="badges-filters-inputs">
      <span>Ценовая категория</span>
      <span>От</span>
      <input type="text" name="badgesUnder" @blur="badgesPrice" v-model.number="badgesUnder" placeholder="0">
      <span>До</span>
      <input type="text" name="badgesUp" @blur="badgesPrice" v-model.number="badgesUp" placeholder="10000">
    </div>
    <div class="badges-filters-checkbox">
      <button @click = 'badgesDeleteFilters'>Удалить все фильтры</button>
    </div>
    </div>
    <div class="badges-list" v-if="changeUpUnder">
        <badges-item
          v-for = "product in changeProductsName"
          :key = "product.article"
          :product_data="product">
          </badges-item>
    </div>
    <div v-else class="badges-noitem">
      <p>Товары не найдены...</p>
    </div>
</div>
</template>

<script>
import badgesItem from './badges-item.vue'
import {mapActions, mapGetters} from 'vuex'

export default { 
    name: 'badges',
    components: {
        badgesItem
    },
    props: {
    },
    computed:{
      ...mapGetters([
        'PRODUCTSBADGES',
        'BUSKET',
        'ISPRODUCT'
      ]),
      changeProductsName() {
        if (this.badgesProducts.length) {
          return this.badgesProducts
          console.log('badgesProducts')
        } else {
          return this.PRODUCTSBADGES
          console.log('PRODUCTSBADGES')
        }
      },
      changeUpUnder() {
        if (this.badgesUnder <= 500 && this.badgesUpUnder == false) {
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
       badgesPrice() {
         this.badgesUpUnder = false
        if (this.badgesUnder == '' && this.badgesUp =='') {
           this.badgesProducts = this.PRODUCTSBADGES
        } else
        if (this.badgesUnder == '' && this.badgesUp !='') {
           this.badgesProducts = this.PRODUCTSBADGES.filter(item => (item.price >= 0 && item.price <= this.badgesUp))
        } else
        if (this.badgesUnder != '' && this.badgesUp =='') {
           this.badgesProducts = this.PRODUCTSBADGES.filter(item => (item.price >= this.badgesUnder && item.price <= 10000))
        } else 
        if (this.badgesUnder != '' && this.badgesUp !='' && this.badgesUnder > this.badgesUp) {
          [this.badgesUnder, this.badgesUp] = [this.badgesUp, this.badgesUnder]
           this.badgesProducts = this.PRODUCTSBADGES.filter(item => (item.price >= this.badgesUnder && item.price <= this.badgesUp))
        } else {
        this.badgesProducts = this.PRODUCTSBADGES.filter(item => (item.price >= this.badgesUnder && item.price <= this.badgesUp))
      }
      if (!this.badgesProducts.length) {this.badgesUpUnder = true}
      },
      badgesDeleteFilters() {
        this.badgesFilter = ''
        this.badgesUnder = ''
        this.badgesUp = ''
        this.badgesProducts = this.PRODUCTSBADGES
        this.badgesUpUnder = false
      }
        },
    data() {
        return {
          badgesFilter: '',
          badgesUnder: '',
          badgesUp: '',
          badgesProducts: [],
          badgesUpUnder: false
        }
    },
    watch: {
    badgesFilter: function() {
      if (!this.badgesProducts.length) {
        for (let i = 0; i < this.PRODUCTSBADGES.length; i++) {
          this.badgesProducts[i] = this.PRODUCTSBADGES[i]
        }
      }
        if (this.badgesFilter == 'По возрастанию') {
          this.badgesProducts.sort((a, b) => a.price - b.price)
        } else if (this.badgesFilter == 'По убыванию') {
          this.badgesProducts.sort((a, b) => b.price - a.price)
        } else if (this.badgesFilter == 'От А до Я') {
          this.badgesProducts.sort((a, b) => {
                if ( b.name > a.name ) return -1;
                if ( b.name > a.name ) return 1;
          });
        } else if (this.badgesFilter == 'От Я до А') {
          this.badgesProducts.sort((a, b) => {
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

.badges {
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