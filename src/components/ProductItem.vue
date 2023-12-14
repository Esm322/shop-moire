<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id } }">
      <img :src="images[currentColorId].image" :alt="title">
    </router-link>

    <button class="item__button button-mainpage button--primery" type="submit"
    :disabled="isAddLoading"
    @click.prevent="addProduct">
      В корзину
    </button>

    <h3 class="catalog__title">
      <a href="#">
        {{ title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ price }}
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in colors" :key="color.colorId">
        <label class="colors__label" @click.prevent="changeImage(color.colorProductId)"
        @keyup.enter="changeImage(color.colorProductId)">
          <input class="colors__radio sr-only" type="radio" :name="'color-' + color.colorProductId"
          :value="color.colorCode" :checked="activeColorId === color.colorProductId">
          <span class="colors__value" :style="{'background-color': color.colorCode}" >
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      currentColorId: 0,

      productData: null,
    };
  },
  props: [
    'id',
    'title',
    'price',
    'images',
    'colors',
  ],
  computed: {
    ...mapState(['isAddLoading']),
    activeColorId() {
      return this.colors[this.currentColorId].colorProductId;
    },
  },
  methods: {
    ...mapActions(['addProductToCart', 'loadProduct']),
    changeImage(id) {
      const indexId = this.colors.findIndex((item) => item.colorProductId === id);
      this.currentColorId = indexId;
    },
    loadProduct() {
      return axios.get(`https://vue-moire.skillbox.cc/api/products/${this.id}`)
        .then((response) => this.productData = response.data);
    },
    addProduct() {
      this.addProductToCart({
        productId: this.id,
        colorId: this.productData.colors[0].color.id,
        sizeId: this.productData.sizes[0].id,
        amount: 1,
      });
    },
  },
  created() {
    this.loadProduct();
  },
};
</script>
