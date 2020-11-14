<template> 
<router-link :to="`/products/${product_data.article}`" tag = "div" class="super1" v-bind:class="{'super1-sale': !product_data.available}">
<div class = "super1-item">
    <img :src="'../img/super/' + product_data.image" alt="img" class="super1-item-image">
    <h3 class="super1-item-number">Носки: {{product_data.name}}</h3>
    <p class="super1-item-price" v-show="product_data.available">Цена: {{product_data.price}}р</p>
    <p class="super1-sale-price" v-show="!product_data.available">Нет в наличии ({{product_data.price}}р)</p>
</div>
    </router-link>
</template>

<script>
export default { 
    name: 'super-item',
    methods: {
        addToCart() {
            this.$emit('addToCart', this.product_data)
        },
    },
    mounted() {
        this.$set(this.product_data, 'quantity', 1)
    },
    props: {
            product_data: {
                type: Object,
                default() {
                    return {}
                } 
            }
    },
    data() {
        return {
              classObject: {
                  'super-item': true
              }
        }
    },
 computed: {
    }
}
</script>

<style lang="scss">
.super1 {
    cursor: pointer;
    margin-bottom: 20px;
    border: 1px solid white;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
        &-sale {
        border: 3px solid red;

        &-price {
            font-size: 20px;
            color: rgb(255, 0, 0);
            font-weight: 700;
        }
    }

&-item {
    text-align: center;
    background-color: rgb(241, 241, 241);
    padding-bottom: 20px;
    
    &-price {
        font-size: 20px;
    }

    &-image {
        width: 100%;
        height: 250px;
    }
}
}
</style>