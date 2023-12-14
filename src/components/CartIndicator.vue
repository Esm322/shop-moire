<template>
  <div class="spinner-9" v-if="isCartLoading || isAddLoading"></div>

  <router-link v-else :to="{ name: 'cart' }" class="header__cart" aria-label="Корзина с товарами">
    <svg width="19" height="24">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ totalAmount }}</span>
  </router-link>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['isCartLoading', 'isCartLoadingFailed', 'isAddLoading']),
    ...mapGetters({
      totalAmount: 'getCartProductsAmount',
    }),
  },
};
</script>
