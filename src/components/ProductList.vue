<script setup>
import { onMounted, ref } from 'vue'
import shop from '@/api/shop.js'

const products = ref([])

onMounted(() => {
  shop.getProducts((productsArr) => {
    products.value = productsArr
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
