<template> 
<div class="busket">
    <h3 class="busket-title">Корзина</h3>
    <p v-if = "!busket_data.length" class="busket-subtitle">Корзина пустая уф....</p>
    <div class="busket-links">
   <busket-item
   v-for = "(busket_item,index) in busket_data"
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
import {mapActions} from 'vuex'


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
            'INCREMENT_ITEM'
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
    },
    computed: {
        totalCost() {
       return this.busket_data.reduce((sum, item) => sum + item.quantity * item.price ,0)
     }
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