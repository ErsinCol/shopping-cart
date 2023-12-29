import shop from '@/api/shop.js'

export default {
  namespaced: true,

  state: {
    items: []
  },

  getters: {
    availableProducts(state) {
      return state.items.filter((item) => item.inventory > 0)
    },
    getProductById(state) {
      return (id) => {
        return state.items.find((item) => item.id === id)
      }
    },

    productIsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    }
  },

  actions: {
    fetchProducts({ commit }) {
      return new Promise((resolve) => {
        shop.getProducts((productsArr) => {
          commit('setProducts', productsArr)
          resolve()
        })
      })
    }
  },

  mutations: {
    setProducts(state, payload) {
      state.items = payload
    },

    decrementProductInventory(state, product) {
      product.inventory -= 1
    }
  }
}
