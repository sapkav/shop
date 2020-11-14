export default {
     ADD_TO_BUSKET({commit}, product) {
         commit('SET_BUSKET', product)
     },
     DELETE_FROM_BUSKET({commit}, index) {
       commit('REMOVE_FROM_BUSKET', index)
   },
   INCREMENT_ITEM({commit}, index) {
       commit('INCREMENT', index)
   },
   DECREMENT_ITEM({commit}, index) {
       commit('DECREMENT', index)
   },
   GET_PRODUCTSKIDS({commit}) {
    commit('SET_PRODUCTSKIDS')
   },
   GET_PRODUCTSMEN({commit}) {
    commit('SET_PRODUCTSMEN')
   },
   DELETE_ALL_FROM_BUSKET({commit}) {
    commit('REMOVE_ALL_FROM_BUSKET')
},
}