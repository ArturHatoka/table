import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    setProducts(state, val){
      state.products = val
    }
  },
  getters: {
    getProducts(state){
      return state.products
    }
  },
  modules: {
  },
  actions: {
  }
})
