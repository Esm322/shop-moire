<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id"
    :id="product.id"
    :title="product.title"
    :price="product.price"
    :images="product.images"
    :colors="product.colors"/>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products'],
  components: {
    ProductItem,
  },
};
</script>
