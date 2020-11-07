export default {
    SET_PRODUCTS_TO_STATE: (state, products) => {
        state.products = products
    },
    SET_BUSKET: (state, products) => {
        if (state.busket.length) {
            let isProductExists = false;
            state.busket.forEach(item => {
                if (item.article == products.article) {
                    isProductExists = true;
                    item.quantity++;
                } 
            })
            if (!isProductExists) {
                state.busket.push(products)
            }
        } else {
          state.busket.push(products)
        }
    },
    REMOVE_FROM_BUSKET: (state, index) => {
        state.busket.splice(index, 1);
    },
    INCREMENT: (state, index) => {
        state.busket[index].quantity++;
    },
    DECREMENT: (state, index) => {
        if (state.busket[index].quantity > 1) {
            state.busket[index].quantity--;
        }
    },
}