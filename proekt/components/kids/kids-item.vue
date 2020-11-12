<template> 
<router-link :to="`/kids/${product_data.article}`" tag = "div" class="kids" v-bind:class="{'kids-sale': !product_data.available}">
<div class = "kids-item">
    <img :src="'../img/kids/' + product_data.image" alt="img" class="kids-item-image">
    <h3 class="kids-item-number">Носки: {{product_data.name}}</h3>
    <p class="kids-item-price" v-show="product_data.available">Цена: {{product_data.price}}р</p>
    <p class="kids-sale-price" v-show="!product_data.available">Нет в наличии ({{product_data.price}}р)</p>
   <!-- <button class="kids-item-button btn"
    @click = "addToCart"
    :disabled = "!product_data.available">
    Добавить в корзину
    </button> -->
</div>
    </router-link>
</template>

<script>
export default { 
    name: 'kids-item',
    methods: {
        addToCart() {
            this.$emit('addToCart', this.product_data)
        },
                goDetail() {
              this.$router.push({name:'kids-item'})
        }
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
                  'kids-item': true
              }
        }
    },
 computed: {
    }
}
</script>

<style lang="scss">
.kids {
    margin-top: 20px;
    cursor: pointer;
    text-decoration: none;
    background-color: rgb(241, 241, 241);
    border: 1px solid white;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    min-width: 80%;
    text-align: center;
    margin-bottom: 30px;
    

        &-sale {
        border: 2px solid red;

        &-price {
            font-size: 20px;
            color: rgb(255, 0, 0);
            font-weight: 700;
        }
    }

&-item {

    
    &-price {
        font-size: 20px;
        text-decoration: none;
    }

    &-image {
        min-width: 100%;  
        height: 250px;
    }
}
}
</style>