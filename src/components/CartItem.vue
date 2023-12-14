<template>
  <ul class="cart__list">
    <li class="cart__item product">
      <div class="product__pic">
        <img :src="image" width="120"
        height="120" :alt="title">
      </div>
      <h3 class="product__title">
        {{ title }}
      </h3>
      <p class="product__info product__info--color">
        Цвет:
        <span>
          <i :style="{'background-color': colorCode}"></i>
          {{ colorTitle }}
        </span>
      </p>
      <span class="product__code">
        Артикул: {{ id }}
      </span>

      <div class="product__counter form__counter">
        <button type="button" aria-label="Убрать один товар"
        @click.prevent="dicrement" :disabled="updateAmount === 1">
          <svg width="10" height="10" fill="currentColor">
            <use xlink:href="#icon-minus"></use>
          </svg>
        </button>

        <label>
          <input type="text" v-model="updateAmount" name="count">
        </label>

        <button type="button" aria-label="Добавить один товар"
        @click.prevent="increment">
          <svg width="10" height="10" fill="currentColor">
            <use xlink:href="#icon-plus"></use>
          </svg>
        </button>
      </div>

      <b class="product__price">
        {{ totalProductPrice }}
      </b>

      <button class="product__del button-del" type="button"
      aria-label="Удалить товар из корзины" @click.prevent="deleteProduct">
        <div v-if="isDeleteLoading" class="spinner-9" style="
        width: 20px;
        height: 20px">
        </div>
        <svg v-else width="20" height="20" fill="currentColor">
          <use xlink:href="#icon-close"></use>
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
import numberFormat from '@/helpers';
import { mapActions, mapState } from 'vuex';

export default {
  props: ['id', 'title', 'price', 'colorCode', 'colorTitle', 'amount', 'image', 'productId'],
  computed: {
    ...mapState(['isDeleteLoading', 'isDeleteLoadingFailed']),
    updateAmount: {
      get() {
        return this.amount;
      },
      set(value) {
        this.updateProductAmount({
          productId: this.productId,
          basketItemId: this.id,
          amount: value,
        });
      },
    },
    totalProductPrice() {
      return numberFormat(this.price * this.updateAmount);
    },
  },
  methods: {
    ...mapActions({
      updateProductAmount: 'updateCartProductAmount',
      deleteProductCart: 'deleteProductFromCart',
    }),
    deleteProduct() {
      this.deleteProductCart({
        basketItemId: this.id,
        productId: this.productId,
      });
    },
    increment() {
      this.updateAmount += 1;
    },
    dicrement() {
      this.updateAmount -= 1;
    },
  },
};
</script>
