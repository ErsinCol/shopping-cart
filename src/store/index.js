import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      products: []
    }
  },
  getters: {
    productsCount() {
      // ...
    }
  },
  actions: {
    fetchProducts() {
      // ...
    }
  },
  mutations: {
    setProducts() {
      // ...
    }
  }
})

export default store
