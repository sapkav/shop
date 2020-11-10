<template> 
<div class="kid"  style="background-image: url(img/kids-back.jpg)">
    <h1 class="kid-title">Детские носки</h1>
     <select name="" id="" v-model="kidsFilter" class="kid-select">
        <option disabled value="">Выберите фильтр</option>
        <option>По возрастанию</option>
        <option>По убыванию</option>
        <option>От А до Я</option>
        <option>От Я до А</option>
    </select>
    <div class="kid-list">
        <kids-item
          v-for = "product in PRODUCTSKIDS"
          :key = "product.article"
          :product_data="product"
          @addToCart = 'addToCart'>
          </kids-item>
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
          kidsFilter: ''
        }
    },
    watch: {
    kidsFilter: function() {
        if (this.kidsFilter == 'По возрастанию') {
          this.PRODUCTSKIDS.sort((a, b) => a.price - b.price)
        } else if (this.kidsFilter == 'По убыванию') {
          this.PRODUCTSKIDS.sort((a, b) => b.price - a.price)
        } else if (this.kidsFilter == 'От А до Я') {
          this.PRODUCTSKIDS.sort((a, b) => {
                if ( b.name > a.name ) return -1;
                if ( b.name > a.name ) return 1;
          });
        } else if (this.kidsFilter == 'От Я до А') {
          this.PRODUCTSKIDS.sort((a, b) => {
                if ( b.name < a.name ) return -1;
                if ( b.name < a.name ) return 1;
          })
        }
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
.kid {

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
  }

 &-list {
     display: grid;
     grid-template-columns: repeat(4 ,1fr);
     justify-items: center;
 }
}
</style>