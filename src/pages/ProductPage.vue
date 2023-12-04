<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
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
            <a href="" class="pics__link pics__link--current">
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
          <form class="form" action="#" method="POST">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <label>
                  <input type="text" value="1" name="count">
                </label>

                <button type="button" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price">
                {{ product[0].price }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color in getColors" :key="color.colorId">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item"
                      :value="color.colorId">
                      <span class="colors__value" :style="{'background-color': color.colorCode}">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category">
                    <option :value="size.sizeId" v-for="size in getSizes" :key="size.sizeId">
                      {{ size.sizeTitle }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>

        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      productData: null,

      currentColorId: 0,
      currentSizeId: 0,
    };
  },
  computed: {
    product() {
      return this.productData ? this.productData.map((item) => {
        return {
          ...item,
          categoryTitle: item.category.title,
          colorsGallery: item.colors.map((color) => {
            return {
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
  },
  methods: {
    info() {
      console.log(this.productData.colors);
    },
    loadProduct() {
      return axios.get(`https://vue-moire.skillbox.cc/api/products/${this.$route.params.id}`)
        .then((response) => this.productData = [response.data]);
    },
  },
  created() {
    this.loadProduct();
  },
};
</script>
