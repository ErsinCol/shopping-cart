import { createStore } from 'vuex'
import cart from '@/store/modules/cart.js'
import products from '@/store/modules/products.js'

const store = createStore({
  modules: {
    cart,
    products
  },

  state() {
    return {}
  },
  getters: {},
  actions: {},
  mutations: {}
})

export default store
