<template>
  <div class="page-for-items">
    <p>Артикул: {{this.$route.params.id}}</p>
    <p>Цена: {{productItem.price}}р</p>
    <p>Товар: {{itemAvailable}}</p>
    <img :src="'../img/' + productItem.type + '/' + productItem.image" alt="" onload>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
name: 'page-for-items',
 data() {
   return {
     productItem: ''
   }
 },
 computed: {
      ...mapGetters([
        'PRODUCTS',
        'ISPRODUCT'
      ]), 
      itemAvailable() {
        if (this.productItem.available == true) {
          return 'в наличии '
        } else {
          return 'отсутсвует'
        }
      }
 },
 mounted() {
     if (!this.ISPRODUCT) {
      this.GET_PRODUCTS()
      .then(product => {
        for (let item of Object.values(product.data)) {
           if (item.article == this.$route.params.id) {
             this.productItem = item
           }
        }
      })
    } else {
       for (let item of Object.values(this.PRODUCTS)) {
     if (item.article == this.$route.params.id) {
       this.productItem = item
     }
   }
    }
 },
  updated() {
   for (let item of Object.values(this.PRODUCTS)) {
     if (item.article == this.$route.params.id) {
       this.productItem = item
     }
   }
 },
  /* created() {
      for (let item of Object.values(this.PRODUCTS)) {
     if (item.article == this.$route.params.id) {
       this.productItem = item
     }
   }
 }, */
 methods: {
    ...mapActions([
         'GET_PRODUCTS'
      ]),
 }
}
</script>

<style lang="scss">
.page-for-items {
  
  img {
    width: 250px;
  }
}
</style>