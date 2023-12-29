import { createStore } from 'vuex'
import shop from '@/api/shop.js'

const store = createStore({
  state() {
    return {
      products: [],
      cart: [],
      checkoutStatus: null
    }
  },
  getters: {
    availableProducts(state) {
      return state.products.filter((product) => product.inventory > 0)
    },
    getProductById(state) {
      return (id) => {
        return state.products.find((product) => product.id === id)
      }
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
    },
    addProductToCart({ state, getters, commit }, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.cart.find((cartItem) => cartItem.id === product.id)
        if (!cartItem) {
          commit('pushProductToCart', product.id)
        } else {
          commit('incrementItemQuantity', cartItem)
        }
        commit('decrementProductInventory', product)
      }
    },
    checkout({ state, commit }) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
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
    },
    emptyCart(state) {
      state.cart = []
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    }
  }
})

export default store
