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
          {{ totalAmount }} товара
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div v-show="isCartLoading" style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 40vh;">
            <div class="spinner-4"></div>
            <h2 style="padding-top: 25px;">
              Загрузка товаров корзины...
            </h2>
          </div>

          <div class="cart__list" v-show="isCartLoadingFailed">
            <p style="padding-top: 25px;text-align: center;">
              Похоже произошла ошибка. Попробуйте перезагрузить страницу.
            </p>
          </div>

          <CartItem v-for="product in products" :key="product.id"
          :id="product.id"
          :price="product.price"
          :title="product.title"
          :color-code="product.colorCode"
          :color-title="product.colorTitle"
          :amount="product.quantity"
          :image="product.image"
          :productId="product.productId"/>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ prettyTotalPrice }}</span>
          </p>

          <router-link tag="button" :to="{name: 'order'}" type="submit"
          class="cart__button button button--primery"
          v-if="cart.length">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import { mapGetters, mapState } from 'vuex';
import numberFormat from '@/helpers';

export default {
  components: {
    CartItem,
  },
  computed: {
    ...mapState(['isCartLoading', 'isCartLoadingFailed']),
    ...mapGetters({
      productsCart: 'getCartDetailsProduct',
      totalAmount: 'getCartProductsAmount',
      totalPrice: 'getCartTotalPrice',
      cart: 'getCart',
    }),
    products() {
      return this.productsCart ? this.productsCart.map((product) => {
        return {
          ...product,
          id: product.id,
          productId: product.product.id,
          price: product.price,
          title: product.product.title,
          colorCode: product.color.color.code,
          colorTitle: product.color.color.title,
          image: product.color.gallery ? product.color.gallery[0].file.url
            : 'https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png',
        };
      }) : [];
    },
    prettyTotalPrice() {
      return numberFormat(this.totalPrice);
    },
  },
};
</script>
