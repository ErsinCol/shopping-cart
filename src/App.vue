<script setup>
import ProductList from '@/components/ProductList.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
</script>

<template>
  <header>
    <h1>Shopping Cart App</h1>
  </header>

  <main>
    <ProductList />
    <hr />
    <ShoppingCart />
  </main>
</template>

<style scoped></style>
