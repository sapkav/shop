<template>
<div class="badges"  style="background-image: url(img/badges-back.jpg)">
    <h1 class="badges-title">Значки</h1>
    <select name="" id="" v-model="badgesFilter" class="badges-select">
        <option disabled value="">Выберите фильтр</option>
        <option>По возрастанию</option>
        <option>По убыванию</option>
        <option>От А до Я</option>
        <option>От Я до А</option>
    </select>
    <div class="badges-list">
        <badges-item
          v-for = "product in PRODUCTSBADGES"
          :key = "product.article"
          :product_data="product"
          @addToCart = 'addToCart'>
          </badges-item>
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
          badgesFilter: ''
        }
    },
    mounted() {
    if (!this.ISPRODUCT) {
      this.GET_PRODUCTS()
    }
    },
    watch: {
    badgesFilter: function() {
        if (this.badgesFilter == 'По возрастанию') {
          this.PRODUCTSBADGES.sort((a, b) => a.price - b.price)
        } else if (this.badgesFilter == 'По убыванию') {
          this.PRODUCTSBADGES.sort((a, b) => b.price - a.price)
        } else if (this.badgesFilter == 'От А до Я') {
          this.PRODUCTSBADGES.sort((a, b) => {
                if ( b.name > a.name ) return -1;
                if ( b.name > a.name ) return 1;
          });
        } else if (this.badgesFilter == 'От Я до А') {
          this.PRODUCTSBADGES.sort((a, b) => {
                if ( b.name < a.name ) return -1;
                if ( b.name < a.name ) return 1;
          })
        }
    }
    }
}
</script>

<style lang="scss">
.badges {


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
    color: rgb(8, 4, 248);
  }

 &-list {
     display: grid;
     grid-template-columns: repeat(4 ,1fr);
     justify-items: center;
 }
}
</style>