import { createStore } from 'vuex'
import shop from '@/api/shop.js'

const store = createStore({
  state() {
    return {
      products: []
    }
  },
  getters: {
    availableProducts(state, getters) {
      return state.products.filter((product) => product.inventory > 0)
    }
  },
  actions: {
    fetchProducts({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts((productsArr) => {
          commit('setProducts', productsArr)
          resolve()
        })
      })
    }
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    }
  }
})

export default store
