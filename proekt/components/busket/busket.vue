<template> 
<div class="busket">
    <button class="busket-button" @click = "clearTheBusket">ОЧИСТИТЬ КОРЗИНУ</button>
    <h3 class="busket-title">Корзина</h3>
    <p v-if = "!BUSKET.length" class="busket-subtitle">Корзина пустая уф....</p>
    <div class="busket-links">
   <busket-item
   v-for = "(busket_item,index) in BUSKET"
   :key = "busket_item.article"
    :busket_item_data="busket_item"
    @deleteBusket = "deleteFromBusket(index)"
    @increment = "increment(index)"
    @decrement = "decrement(index)"
    ></busket-item>
    </div>
    <div class="busket-total">
    <div class="busket-total-sum">
        <p>Сумма: {{totalCost}}р</p>
    </div>
    </div>
</div>
</template>

<script>
import busketItem from './busket-item.vue'
import {mapActions, mapGetters} from 'vuex'


export default { 
    name: 'busket',
    components: {
        busketItem
    },
    props: {
        busket_data: {
         type: Array,
           default() {
           return []
      } 
      }
    },
    methods: {
        ...mapActions([
            'DELETE_FROM_BUSKET',
            'DECREMENT_ITEM',
            'INCREMENT_ITEM',
            'DELETE_ALL_FROM_BUSKET'
        ]),
        deleteFromBusket(index) {
            this.DELETE_FROM_BUSKET(index)
        },
        increment(index) {
            this.INCREMENT_ITEM(index)
        },
        decrement(index) {
            this.DECREMENT_ITEM(index)
        },
        clearTheBusket() {
            this.DELETE_ALL_FROM_BUSKET()
        }
    },
    computed: {
        totalCost() {
       return this.BUSKET.reduce((sum, item) => sum + item.quantity * item.price ,0)
     },
    ...mapGetters([
        'PRODUCTS',
        'ISPRODUCT',
        'BUSKET'
      ]), 
    },
    data() {
        return {
        }
    }
}
</script>

<style lang = "scss">
.busket {
    margin-bottom: 100px;

    &-button {
        position: absolute;
        left: 50px;
        width: 200px;
        border-radius: 8px;
        background-color: black;
        color: white;
        padding: 5px 15px;
    }

    &-title {
        text-align: center;
        font-size: 40px;
        color: greenyellow;
    }

    &-subtitle {
        text-align: center;
        font-size: 35px;
        font-weight: 700;
    }

    &-links {
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
        grid-gap: 40px;
    }

    &-total {
        &-sum {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: rgb(65, 190, 163);
        text-align: center;
        font-size: 30px;
        }
    }
}
</style>