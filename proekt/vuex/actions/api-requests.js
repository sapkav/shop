import axios from 'axios'


export default {
    GET_PRODUCTS({commit}) {
        return axios('http://localhost:3000/products', {
            method: 'GET'
        })
        .then(products => {
            commit('SET_PRODUCTS_TO_STATE', products.data);
            return products;
        })
        .catch((e) => {
            console.log(e);
            return e;
        })
     },
}