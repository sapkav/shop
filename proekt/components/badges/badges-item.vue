<template>
  <div class="badges-item">
    <img :src="'../img/badges/' + product_data.image" alt="img" class="badges-item-image">
    <h3 class="badges-item-number">Значок: {{product_data.name}}</h3>
    <p class="badges-item-price">Цена: {{product_data.price}}р</p>
    <button class="badges-item-button btn"
    @click = "addToCart">
    Добавить в корзину
    </button>
</div>
</template>

<script>
export default { 
    name: 'badges-item',
    methods: {
        addToCart() {
            this.$emit('addToCart', this.product_data)
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

        }
    }
}
</script>

<style lang="scss">
.badges-item {
    background-color: white;
    border: 1px solid white;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    padding: 30px;
    min-width: 80%;
    text-align: center;
    margin-bottom: 30px;

    &-image {
        width: 150px;  
        height: 170px;
    }

    .btn {
        border: none;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
        border-radius: 2px;
    }
}
</style>