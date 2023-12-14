<template>
  <div v-if="isProductLoading" style="
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60vh;">
      <div class="spinner-4"></div>
      <h2 style="padding-top: 25px;">
        Загрузка товара...
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
          <a class="breadcrumbs__link" href="#">
            {{ product[0].categoryTitle }}
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product[0].title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="getColors[currentColorId].image"
          :alt="product[0].title">
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="image in getColors" :key="image.colorId">
            <a href="" class="pics__link"
            :class="{'pics__link--current': image.colorId === activeColorId}"
            @click.prevent="changeImage(image.colorId)"
            @keyup.enter="changeImage(image.colorId)">
              <img width="98" height="98" :src="image.image"
              :alt="product[0].title">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product[0].id }}</span>
        <h2 class="item__title">
          {{ product[0].title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST"
          @submit.prevent="addToCart">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар"
                :disabled="productCount === 1"
                @click.prevent="dicrement">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <label>
                  <input type="text" v-model.number="productCount" name="count">
                </label>

                <button type="button" aria-label="Добавить один товар"
                @click.prevent="increment">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price">
                {{ totalProductPrice }}
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color in getColors" :key="color.colorId">
                    <label class="colors__label"
                    @click.prevent="changeImage(color.colorId)"
                    @keyup.enter="changeImage(color.colorId)">
                      <input class="colors__radio sr-only" type="radio" name="color-item"
                      v-model="activeColorId"
                      :value="color.colorId"
                      :checked="activeColorId">
                      <span class="colors__value" :style="{'background-color': color.colorCode}">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category"
                  v-model.number="currentSizeId">
                    <option disabled value="0">Выбрать</option>
                    <option :value="size.sizeId" v-for="size in getSizes" :key="size.sizeId">
                      {{ size.sizeTitle }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit" :disabled="isAddLoading">
              В корзину
            </button>
            <div style="padding-top: 10px;" v-show="isAddLoading">
              Добавляем товар в корзину...
            </div>
            <div style="padding-top: 10px;" v-if="isAddLoadingEnded">Товар добавлен в корзину</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link"
            :class="{'tabs__link--current': currentTab === 'base-item-information'}"
            @click.prevent="changeTab('base-item-information')"
            @keyup.enter="changeTab('base-item-information')">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link"
            :class="{'tabs__link--current': currentTab === 'base-item-delivery'}"
            @click.prevent="changeTab('base-item-delivery')"
            @keyup.enter="changeTab('base-item-delivery')">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <component :is="currentTab"/>

      </div>
    </section>
  </main>
</template>

<script>
import BaseItemInformation from '@/components/BaseItemInformation.vue';
import BaseItemDelivery from '@/components/BaseItemDelivery.vue';
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import numberFormat from '@/helpers';

export default {
  data() {
    return {
      productData: null,

      currentTab: 'base-item-information',

      productCount: 1,
      currentColorId: 0,
      currentSizeId: 0,

      isProductLoading: false,
      isProductLoadingFailed: false,
    };
  },
  components: {
    BaseItemInformation,
    BaseItemDelivery,
  },
  computed: {
    ...mapState(['isAddLoading', 'isAddLoadingFailed', 'isAddLoadingEnded']),
    product() {
      return this.productData ? this.productData.map((item) => {
        return {
          ...item,
          price: item.price,
          categoryTitle: item.category.title,
          colorsGallery: item.colors.map((color) => {
            return {
              colorProductId: color.id,
              colorId: color.color.id,
              colorCode: color.color.code,
              colorTitle: color.color.title,
              image: color.gallery ? color.gallery[0].file.url
                : 'https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png',
            };
          }),
          sizes: item.sizes.map((size) => {
            return {
              sizeId: size.id,
              sizeTitle: size.title,
            };
          }),
        };
      }) : [];
    },
    getColors() {
      return this.product[0].colorsGallery;
    },
    getSizes() {
      return this.product[0].sizes;
    },
    activeColorId: {
      get() {
        return this.getColors[this.currentColorId].colorId;
      },
      set(id) {
        const indexId = this.getColors.findIndex((item) => item.colorId === id);
        this.currentColorId = indexId;
      },
    },
    totalProductPrice() {
      return numberFormat(this.productCount * this.product[0].price);
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    increment() {
      this.productCount += 1;
    },
    dicrement() {
      this.productCount -= 1;
    },
    changeImage(id) {
      const indexId = this.getColors.findIndex((item) => item.colorId === id);
      this.currentColorId = indexId;
    },
    changeTab(tab) {
      this.currentTab = tab;
    },
    loadProduct() {
      this.isProductLoading = true;
      this.isProductLoadingFailed = false;
      return axios.get(`https://vue-moire.skillbox.cc/api/products/${this.$route.params.id}`)
        .then((response) => this.productData = [response.data])
        .catch(() => {
          this.isProductLoading = false;
          this.isProductLoadingFailed = true;
        })
        .finally(() => this.isProductLoading = false);
    },
    addToCart() {
      this.addProductToCart({
        productId: this.$route.params.id,
        colorId: this.activeColorId,
        sizeId: this.currentSizeId,
        amount: this.productCount,
      });
    },
  },
  created() {
    this.loadProduct();
  },
};
</script>
