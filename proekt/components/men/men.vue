<template>
<div class="men"  style="background-image: url(img/men-back.jpg)">
    <h1 class="men-title">Мужские носки</h1>
        <select name="" id="" v-model="menFilter" class="men-select">
        <option disabled value="">Выберите фильтр</option>
        <option>По возрастанию</option>
        <option>По убыванию</option>
        <option>От А до Я</option>
        <option>От Я до А</option>
    </select>
    <div class="men-list">
        <men-item
          v-for = "product in PRODUCTSMEN"
          :key = "product.article"
          :product_data="product"
          @addToCart = 'addToCart'>
          </men-item>
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
          menFilter: ''
        }
    },
    mounted() {
    if (!this.ISPRODUCT) {
      this.GET_PRODUCTS()
    }
    },
    watch: {
        menFilter: function() {
        if (this.menFilter == 'По возрастанию') {
          this.PRODUCTSMEN.sort((a, b) => a.price - b.price)
        } else if (this.menFilter == 'По убыванию') {
          this.PRODUCTSMEN.sort((a, b) => b.price - a.price)
        } else if (this.menFilter == 'От А до Я') {
          this.PRODUCTSMEN.sort((a, b) => {
                if ( b.name > a.name ) return -1;
                if ( b.name > a.name ) return 1;
          });
        } else if (this.menFilter == 'От Я до А') {
          this.PRODUCTSMEN.sort((a, b) => {
                if ( b.name < a.name ) return -1;
                if ( b.name < a.name ) return 1;
          })
        }
    }
    }
}
</script>

<style lang="scss">
.men {
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
    color: rgba(206, 60, 60, 0.733);
  }

 &-list {
     display: grid;
     grid-template-columns: repeat(4 ,1fr);
     justify-items: center;
 }
}
</style>