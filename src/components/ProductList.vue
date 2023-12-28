<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'

const loading = ref(false)

const store = useStore()

const products = computed(() => {
  return store.getters.availableProducts
})

const addProductToCart = (product) => {
  store.dispatch('addProductToCart', product)
}

onMounted(() => {
  loading.value = true
  store.dispatch('fetchProducts').then(() => {
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
        <h3>{{ product.title }}</h3>
        <p>{{ product.price }}</p>
        <button v-on:click="addProductToCart(product)">Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
