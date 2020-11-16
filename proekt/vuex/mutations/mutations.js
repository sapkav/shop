
export default {
    SET_PRODUCTS_TO_STATE: (state, products) => {
        state.products = products
        state.isProduct = true
        for (let i = 0; i < products.length; i++) {
            if (state.products[i].type == 'kids') {
                state.productsKids.push(state.products[i])
            } else if (state.products[i].type == 'men') {
                state.productsMen.push(state.products[i])
            } else if (state.products[i].type == 'women') {
                state.productsWomen.push(state.products[i])
            } else if (state.products[i].type == 'super') {
                state.productsSuper.push(state.products[i])
            } else if (state.products[i].type == 'badges') {
                state.productsBadges.push(state.products[i])
            }
        }
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
    REMOVE_ALL_FROM_BUSKET: (state) => {
        state.busket = []
        for (let item of state.products) {
            if (item.quantity > 0) {
                item.quantity = 0
            }
        }
    }
    /* SET_PRODUCTSKIDS: (state) => {
        for (let i = 0; i < state.products.length ; i++) {
            if (state.products[i].type == 'kids') {
                state.productsKids.push(state.products[i])
            }
        }
    },
    SET_PRODUCTSMEN: (state) => {
        for (let i = 0; i < state.products.length ; i++) {
            if (state.products[i].type == 'men') {
                state.productsMen.push(state.products[i])
            }
        }
    }, */
}