<template>
  <div class="page-for-items">
    <h1>Характеристика товара</h1>
    <div class="page-for-items-item">
    <div class="page-for-items-item-details">
    <div class="page-for-items-item-details-img">
    <img :src="'../img/' + productItem.type + '/' + productItem.image" alt="" onload>
    </div>
    <div class="page-for-items-item-details-config">
    <p>Артикул: {{this.$route.params.id}}</p>
    <p><b>Цена: {{productItem.price}}р</b></p>
    <p>Товар: {{itemAvailable}}</p>
    <ul>
      <li v-for = "(item, index) in productItem.details" :key = "index">{{item}}</li>
    </ul>
    <button v-if="buttonCardAdd && !productItem.busketHasProduct" @click="addToBusket">Добавить в корзину</button>
    <p v-else-if = "!buttonCardAdd" class="page-for-items-item-details-config-notbusket">Товара нет в наличии </p>
    <p v-else class="page-for-items-item-details-config-notbusket">Товар уже в корзине</p>
    </div>
    </div>
    <div class="page-for-items-item-busket">
      <h2>Корзина</h2>
      <p>Количество товаров: {{BUSKET.length}}</p>
      <p>Общая сумма: {{totalProductsCost}}</p>
      <router-link :to="{ name: 'busket'}"><button>Перейти к корзине</button></router-link>
    </div>
    </div>
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
        'ISPRODUCT',
        'BUSKET'
      ]), 
      itemAvailable() {
        if (this.productItem.available == true) {
          return 'в наличии '
        } else {
          return 'отсутсвует'
        }
      },
      buttonCardAdd() {
        if (this.productItem.available == true) {
          return true
        } else {
          return false
        }
      },
      totalProductsCost() {
       return this.BUSKET.reduce((sum, item) => sum + item.quantity * item.price ,0)
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
      'ADD_TO_BUSKET',
         'GET_PRODUCTS'
      ]),
      addToBusket() {
         this.$set(this.productItem, 'quantity', 1)
        this.ADD_TO_BUSKET(this.productItem)
      }
 }
}
</script>

<style lang="scss">
.page-for-items {
  h1 {
    text-align: center;
    padding-bottom: 20px;
  }

  &-item {
  display: grid;
  grid-template-columns: 7fr 3fr;

  &-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid black;
    background-color: rgb(224, 224, 224);

    &-img {
      height: 600px;
      width: 100%;
      img {
        height: 100%;  
        width: 100%;
      }
    }

    &-config {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr 3fr 1fr;

      p {
        padding-left: 20px;
        font-size: 20px;
      }

      ul {

        li {
          font-size: 20px;
          padding-bottom: 10px;
        }
      }

      button {
        width: 50%;
        margin: 0 auto;
        background-color: black;
        color: white;
        border-radius: 10px;
        height: 70%;
        border: none;

      }

      &-notbusket {
        text-align: center;
        font-size: 30px;
        font-weight: 700;
      }

    }
 }
  &-busket {
    cursor: pointer;
    justify-self: center;
    align-self: center;
    width: 90%;
    border: 1px solid black;

        h2 {
          text-align: center;
        }

        p {
          font-size: 20px;  
          padding-left: 20px;
        }

        button {
            width: 60%;
            margin: 0 auto;
        }
  }
}
}
</style>