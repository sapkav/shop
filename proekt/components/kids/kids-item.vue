<template> 
<div class="kids-item">
    <img :src="'../img/kids/' + product_data.image" alt="img" class="kids-item-image">
    <h3 class="kids-item-number">{{product_data.name}}</h3>
    <p class="kids-item-price">Price: {{product_data.price}}</p>
    <button class="kids-item-button btn"
    @click = "addToCart">
    Add to Cart
    </button>
</div>
</template>

<script>
export default { 
    name: 'kids-item',
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
.kids-item {
    background-color: white;
    border: 1px solid white;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    padding: 30px;
    min-width: 80%;
    text-align: center;
    margin-bottom: 30px;

    &-image {
        width: 100px;  
        height: 120px;
    }

    .btn {
        border: none;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
        border-radius: 2px;
    }
}
</style>