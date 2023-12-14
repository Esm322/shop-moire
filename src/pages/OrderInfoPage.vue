<template>
  <div v-if="isOrderLoading" style="
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;">
    <div class="spinner-4"></div>
    <h2>
      Загрузка информации о заказе...
    </h2>
  </div>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'cart'}" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderData.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
            с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей
            доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderData.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderData.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderData.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderData.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ orderData.paymentType }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Комментарий к заказу
              </span>
              <span class="dictionary__value">
                {{ orderData.comment }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderItem v-for="product in orderData.basket.items" :key="product.id"
            :title="product.product.title"
            :article="product.id"
            :price="product.price"
            :amount="product.quantity"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{ prettyDeliveryPrice }}</b></p>
            <p>Итого: <b>{{ getOrderTotalAmount }}</b> товара на сумму <b>{{ prettyTotalPrice }}</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import OrderItem from '@/components/OrderItem.vue';
import numberFormat from '@/helpers';

export default {
  components: {
    OrderItem,
  },
  computed: {
    ...mapState(['orderData', 'isOrderLoading', 'isOrderLoadingFailed']),
    ...mapGetters(['getOrderTotalAmount']),
    prettyTotalPrice() {
      return numberFormat(this.orderData.totalPrice);
    },
    prettyDeliveryPrice() {
      return numberFormat(this.orderData.deliveryType.price);
    },
  },
  methods: {
    ...mapActions(['loadOrderInfo']),
  },
  created() {
    if (this.$store.orderData && this.$store.orderData.id === this.$route.params.id) {
      return;
    }
    this.loadOrderInfo({
      orderId: this.$route.params.id,
    });
  },
};
</script>
