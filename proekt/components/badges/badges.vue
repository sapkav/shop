<template>
<div class="badges"  style="background-image: url(img/badges-back.jpg)">
    <h1 class="badges-title">Значки</h1>
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
.badges {

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