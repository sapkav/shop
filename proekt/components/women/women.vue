<template>
<div class="women"  style="background-image: url(img/women-back.jpg)">
    <h1 class="women-title">Женские носки</h1>
    <select name="" id="" v-model="womenFilter" class="women-select">
        <option disabled value="">Выберите фильтр</option>
        <option>По возрастанию</option>
        <option>По убыванию</option>
        <option>От А до Я</option>
        <option>От Я до А</option>
    </select>
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
          womenFilter: ''
        }
    },
    mounted() {
    if (!this.ISPRODUCT) {
      this.GET_PRODUCTS()
    }
    },
    watch: {
        womenFilter: function() {
        if (this.womenFilter == 'По возрастанию') {
          this.PRODUCTSWOMEN.sort((a, b) => a.price - b.price)
        } else if (this.womenFilter == 'По убыванию') {
          this.PRODUCTSWOMEN.sort((a, b) => b.price - a.price)
        } else if (this.womenFilter == 'От А до Я') {
          this.PRODUCTSWOMEN.sort((a, b) => {
                if ( b.name > a.name ) return -1;
                if ( b.name > a.name ) return 1;
          });
        } else if (this.womenFilter == 'От Я до А') {
          this.PRODUCTSWOMEN.sort((a, b) => {
                if ( b.name < a.name ) return -1;
                if ( b.name < a.name ) return 1;
          })
        }
    }
    }
}
</script>

<style lang="scss">
.women {

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
    color: rgba(17, 64, 134, 0.897);
  }

 &-list {
     display: grid;
     grid-template-columns: repeat(4 ,1fr);
     justify-items: center;
 }
}
</style>