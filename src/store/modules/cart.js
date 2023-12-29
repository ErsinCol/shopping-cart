import shop from '@/api/shop.js'

export default {
  namespaced: true,

  state: {
    cartItems: [],
    checkoutStatus: null
  },

  getters: {
    cartProducts(state, getters, rootState) {
      return state.cartItems.map((cartItem) => {
        const product = rootState.products.items.find((product) => product.id === cartItem.id)
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
    addProductToCart({ state, commit, rootGetters }, product) {
      if (rootGetters['products/productIsInStock'](product)) {
        const cartItem = state.cartItems.find((cartItem) => cartItem.id === product.id)
        if (!cartItem) {
          commit('pushProductToCart', product.id)
        } else {
          commit('incrementItemQuantity', cartItem)
        }
        commit('products/decrementProductInventory', product, { root: true })
      }
    },
    checkout({ state, commit }) {
      shop.buyProducts(
        state.cartItems,
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
    pushProductToCart(state, productId) {
      state.cartItems.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(state, cardItem) {
      cardItem.quantity += 1
    },
    emptyCart(state) {
      state.cartItems = []
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    }
  }
}
