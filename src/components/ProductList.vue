<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import shop from '@/api/shop.js'

const store = useStore()

const products = computed(() => {
  return store.state.products
})

onMounted(() => {
  shop.getProducts((productsArr) => {
    store.commit('setProducts', productsArr)
  })
})
</script>

<template>
  <div>
    <h2>Product List</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
