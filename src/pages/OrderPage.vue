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

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="postOrder">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormInput
            v-model="formData.name"
            title="ФИО"
            :error="formError.name"
            placeholder="Введите ваше полное имя"/>

            <BaseFormInput
            v-model="formData.address"
            title="Адрес доставки"
            :error="formError.address"
            placeholder="Введите ваш адрес"/>

            <BaseFormInput type="phone"
            v-model="formData.phone"
            title="Телефон"
            :error="formError.phone"
            placeholder="Введите ваш телефон"/>

            <BaseFormInput type="email"
            v-model="formData.email"
            title="Email"
            :error="formError.email"
            placeholder="Введи ваш Email"/>

            <BaseFormTextarea
            v-model="formData.comment"
            title="Комментарий к заказу"
            :error="formError.comment"
            placeholder="Ваши пожелания"/>

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <BaseFormRadioDelivery v-for="delivery in orderDeliveries" :key="delivery.id"
              group="delivery"
              v-model="formData.deliveryTypeId"
              :type-id="delivery.id"
              :title="delivery.title"
              :price="delivery.price"
              :remade-price="delivery.remadePrice"/>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <BaseFormRadioPayment v-for="payment in paymentsData" :key="payment.id"
              v-model="formData.paymentTypeId"
              :title="payment.title"
              :typeId="payment.id"
              group="payment"/>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <div class="cart__orders" v-show="orderProducts.length === 0">
            <div style="margin: 0 auto;" class="spinner-4"></div>
            <h2 style="padding-top: 25px;text-align: center;">
              Загрузка заказа...
            </h2>
          </div>
          <ul class="cart__orders">
            <OrderItem v-for="product in orderProducts" :key="product.article"
            :title="product.title"
            :price="product.price"
            :amount="product.quantity"
            :article="product.article"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{ typeDelivery ? prettyDeliveryTypePrice : 'бесплатно' }}</b></p>
            <p>Итого: <b>{{ totalAmountProducts }}</b> товара на сумму <b>{{ prettyTotalPrice }}</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit" :disabled="isSendOrderLoading">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-show="isSendOrderLoadingFailed">
          <h4>Заявка не отправлена!</h4>
          <p>
            Произошла ошибка. Попробуйте обновить страницу или корректно заполнить данные.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import BaseFormInput from '@/components/BaseFormInput.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import BaseFormRadioDelivery from '@/components/BaseFormRadioDelivery.vue';
import BaseFormRadioPayment from '@/components/BaseFormRadioPayment.vue';
import OrderItem from '@/components/OrderItem.vue';
import numberFormat from '@/helpers';
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        deliveryTypeId: 1,
        paymentTypeId: 1,
      },
      formError: {},

      orderStatus: false,
      isSendOrderLoading: false,
      isSendOrderLoadingFailed: false,

      formErrorMessage: {},
    };
  },
  components: {
    BaseFormInput,
    BaseFormTextarea,
    OrderItem,
    BaseFormRadioDelivery,
    BaseFormRadioPayment,
  },
  computed: {
    ...mapState(['deliveriesData', 'paymentsData']),
    ...mapGetters({
      cartProducts: 'getCartDetailsProduct',
      totalAmountProducts: 'getTotalProductsAmount',
      totalProductsPrice: 'getCartTotalPrice',
    }),
    orderDeliveries() {
      return this.deliveriesData ? this.deliveriesData.map((delivery) => {
        return {
          ...delivery,
          remadePrice: numberFormat(delivery.price),
        };
      }) : [];
    },
    typeDelivery() {
      return this.deliveriesData ? +this.deliveriesData.find((item) => item.id === this.formData.deliveryTypeId).price : 0;
    },
    orderProducts() {
      return this.cartProducts ? this.cartProducts.map((item) => {
        return {
          ...item,
          article: item.id,
          id: item.product.id,
          price: item.price,
          title: item.product.title,
        };
      }) : [];
    },
    prettyTotalPrice() {
      return numberFormat(this.totalProductsPrice + this.typeDelivery);
    },
    prettyDeliveryTypePrice() {
      return numberFormat(this.typeDelivery);
    },
  },
  methods: {
    ...mapActions(['loadDeliveries', 'loadPayments']),
    loadPayment() {
      this.loadPayments({
        deliveryTypeId: this.formData.deliveryTypeId,
      });
    },
    postOrder() {
      this.isSendOrderLoading = true;
      this.isSendOrderLoadingFailed = false;
      return axios.post('https://vue-moire.skillbox.cc/api/orders', {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo');
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
          this.orderStatus = true;
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.isSendOrderLoading = false;
          this.isSendOrderLoadingFailed = true;
          this.formErrorMessage = error.response.data.error.request || {};
        })
        .finally(() => this.isSendOrderLoading = false);
    },
  },
  watch: {
    'formData.deliveryTypeId'() {
      this.loadPayment();
      this.formData.paymentTypeId = null;
    },
  },
  created() {
    this.loadDeliveries();
    this.loadPayment();
  },
};
</script>
