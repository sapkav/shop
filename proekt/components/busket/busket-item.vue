<template>
  <div class="busket-item">
    <img :src="'../img/' + busket_item_data.type + '/' + busket_item_data.image" alt="img" class="busket-item-image">
    <div class="busket-item-info">
    <h3 class="busket-item-info-number">{{busket_item_data.name}}</h3>
    <p class="busket-item-info-price">Price: {{busket_item_data.price}}</p>
    <p class="busket-item-info-article">Article: {{busket_item_data.article}}</p>
    <p class="busket-item-info-quantity">Количество: {{busket_item_data.quantity}}</p>
    <div class="busket-item-info-buttons">
      <button class="busket-item-info-buttons-button" @click = 'decrement'>-</button>
      <button class="busket-item-info-buttons-button" @click = 'increment'>+</button>
    </div>
    </div>
    <button class="busket-item-button btn" @click = "deleteFromBusket">delete</button>
  </div>
</template>

<script>

export default {
   name: 'busket-item',
   props: {
       busket_item_data: {
           type: Object,
              default() {   
            return {}
           }
       }
   },
   computed: {

   },
       methods: {
      deleteFromBusket() {
        this.$emit('deleteBusket');
        this.$set(this.busket_item_data, 'quantity', 1)
      },
      decrement() {
        this.$emit('decrement')
      },
      increment() {
        this.$emit('increment')
      }
    },
    mounted() {
        
    },
  }
</script>

<style lang = "scss">
.busket-item {
    border: 1px solid gray;
    width: 70%;
    display: grid;
    align-items: center;
    justify-items: center;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    grid-template-columns: 3fr repeat(2, 2fr);
    height: 350px;

    &-image {
       height: 300px;
    }

    &-info {
        font-size: 25px;
        text-shadow: 0 0 3px rgba(0,0,0,0.5);

            &-buttons {
              padding-left: 19px;

      &-button {
      border-radius: 10px;
      padding: 5px 15px;
      }
    }
    }

    .btn {border: none;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
        border-radius: 2px;
        font-size: 25px;
        padding: 7px 15px;
    }

}
</style>