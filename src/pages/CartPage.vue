<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          3 товара
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <CartItem/>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>4 070 ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters({
      productsCart: 'getCartDetailsProduct',
    }),
    products() {
      return this.productsCart ? this.productsCart.map((product) => {
        return {
          ...product,
        };
      }) : [];
    },
  },
  methods: {
    ...mapActions(['loadCart']),
  },
  created() {
    this.loadCart();
  },
};
</script>
