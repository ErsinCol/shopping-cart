<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { currency } from '@/currency.js'

const loading = ref(false)

const store = useStore()

const products = computed(() => {
  return store.state.products.items
})

const productIsInStock = computed(() => {
  return store.getters['products/productIsInStock']
})

const addProductToCart = (product) => {
  store.dispatch('cart/addProductToCart', product)
}

onMounted(() => {
  loading.value = true
  store.dispatch('products/fetchProducts').then(() => {
    loading.value = false
  })
})
</script>

<template>
  <div>
    <h2>Product List</h2>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="spinner-image" />
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ currency(product.price) }} - {{ product.inventory }}
        <button :disabled="!productIsInStock(product)" v-on:click="addProductToCart(product)">
          Add to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
