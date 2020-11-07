import Vue from 'vue'
import Vuex from 'vuex'

import commonActions from './actions/actions.js'
import apiActions from './actions/api-requests.js'

import mutations from './mutations/mutations.js'

import getters from './getters/getters.js'

const actions = {...commonActions, ...apiActions}

Vue.use(Vuex);


let store = new Vuex.Store({
  state: {
      products: [],
      busket: []
  },
  mutations,
  actions,
  getters
})

export default store
