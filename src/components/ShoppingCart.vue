<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { currency } from '@/currency.js'

const store = useStore()

const cartProducts = computed(() => {
  return store.getters.cartProducts
})

const total = computed(() => {
  return store.getters.cartTotal
})
</script>

<template>
  <div>
    <h2>Shopping Card</h2>
    <ul>
      <li v-for="product in cartProducts">
        {{ product.title }} - {{ currency(product.price) }} - {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ currency(total) }}</p>
  </div>
</template>

<style scoped></style>
