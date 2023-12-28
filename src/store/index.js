import { createStore } from 'vuex'
import shop from '@/api/shop.js'

const store = createStore({
  state() {
    return {
      products: [],
      cart: []
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
    },
    addProductToCart({ state, commit }, product) {
      if (product.inventory > 0) {
        const cartItem = state.cart.find((cartItem) => cartItem.id === product.id)
        if (!cardItem) {
          commit('pushProductToCart', product.id)
        } else {
          commit('incrementItemQuantity', cartItem)
        }
        commit('decrementProductInventory', product)
      }
    }
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(cardItem) {
      cardItem.quantity += 1
    },
    decrementProductInventory(product) {
      product.inventory -= 1
    }
  }
})

export default store
