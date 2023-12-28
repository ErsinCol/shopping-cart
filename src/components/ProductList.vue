<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'

const loading = ref(false)

const store = useStore()

const products = computed(() => {
  return store.getters.availableProducts
})

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
        {{ product.title }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
