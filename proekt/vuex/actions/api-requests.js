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

/* export default {
    GET_PRODUCTS_KID({commit}) {
        return axios('http://localhost:3000/products', {
            method: 'GET'
        })
        .then(products => {
            commit('SET_PRODUCTSSPORT', products.data)
            return products;
        })
        .catch((e) => {
            console.log(e);
            return e;
        })
     },
}

export default {
    GET_PRODUCTS_MEN({commit}) {
        return axios('http://localhost:3000/products', {
            method: 'GET'
        })
        .then(products => {
            commit('SET_PRODUCTSMEN', products.data)
            return products;
        })
        .catch((e) => {
            console.log(e);
            return e;
        })
     },
} */