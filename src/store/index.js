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
    },
    cartProducts(state) {
      return state.cart.map((cartItem) => {
        const product = state.products.find((product) => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal(state, getters) {
      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
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
    addProductToCart(context, product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find((cartItem) => cartItem.id === product.id)
        if (!cartItem) {
          context.commit('pushProductToCart', product.id)
        } else {
          context.commit('incrementItemQuantity', cartItem)
        }
        context.commit('decrementProductInventory', product)
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
    incrementItemQuantity(state, cardItem) {
      cardItem.quantity += 1
    },
    decrementProductInventory(state, product) {
      product.inventory -= 1
    }
  }
})

export default store
