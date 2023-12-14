<template>
  <aside class="filter">
    <fieldset class="form__block">
      <legend class="form__legend">Количество товаров</legend>
      <label class="form__label form__label--select">
        <select class="form__select" type="text" name="productsPerPage"
        v-model.number="currentProductsPerPage"
        @change.prevent="doProductsPerPage">
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
      </label>
    </fieldset>

    <form class="filter__form form" action="#" method="get"
    @submit.prevent="doSubmit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" onfocus="this.value=''" type="text" name="min-price"
          v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" onfocus="this.value=''" type="text" name="max-price"
          v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category"
          v-model.number="currentCategoryId">
            <option disabled value="0">Все категории</option>
            <option v-for="category in categoriesData"
            :key="category.id"
            :value="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors colors--black">
          <li class="colors__item" v-for="color in colorsData" :key="color.id">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio"
              :value="color.id" v-model.number="currentColorId">
              <span class="colors__value" :style="{'background-color': color.code}">
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materialsData" :key="material.id">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="material"
              :value="material.id" v-model="currentMaterialId">
              <span class="check-list__desc">
                {{ material.title }}
                <span>{{ material.productsCount }}</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="season in seasonsData" :key="season.id">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="collection"
              :value="season.id" v-model="currentSeasonId">
              <span class="check-list__desc">
                {{ season.title }}
                <span>{{ season.productsCount }}</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>

      <button class="filter__reset button button--second" @click.prevent="doReset"
      v-if="currentPriceTo > 0 || currentCategoryId > 0 || currentColorId > 0
      || currentMaterialId.length > 0 || currentSeasonId.length > 0 ||
      currentPriceFrom > 0">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      currentProductsPerPage: 4,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
      currentSeasonId: [],
      currentMaterialId: [],
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'materialId', 'seasonId', 'colorId', 'productsPerPage'],
  computed: {
    ...mapState(['categoriesData', 'materialsData', 'seasonsData', 'colorsData']),
  },
  methods: {
    ...mapActions(['loadCategories', 'loadMaterials', 'loadSeasons', 'loadColors']),
    doSubmit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
      this.$emit('update:materialId', this.currentMaterialId);
      this.$emit('update:seasonId', this.currentSeasonId);
    },
    doReset() {
      this.$emit('update:priceFrom', this.currentPriceFrom = 0);
      this.$emit('update:priceTo', this.currentPriceTo = 0);
      this.$emit('update:categoryId', this.currentCategoryId = 0);
      this.$emit('update:colorId', this.currentColorId = 0);
      this.$emit('update:materialId', this.currentMaterialId = []);
      this.$emit('update:seasonId', this.currentSeasonId = []);
    },
    doProductsPerPage() {
      this.$emit('update:productsPerPage', this.currentProductsPerPage);
    },
  },
  created() {
    this.loadCategories();
    this.loadMaterials();
    this.loadSeasons();
    this.loadColors();
  },
};
</script>
