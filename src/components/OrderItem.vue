<template>
  <li class="cart__order">
    <h3>{{ title }}</h3>
    <b>{{ totalProductPrice }}</b>
    <span>Артикул: {{ article }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers';

export default {
  props: ['title', 'article', 'price', 'amount'],
  computed: {
    totalProductPrice() {
      return numberFormat(this.amount * this.price);
    },
  },
};
</script>
