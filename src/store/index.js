import { createStore } from 'vuex'

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
    fetchProducts() {
      // ...
    }
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    }
  }
})

export default store
