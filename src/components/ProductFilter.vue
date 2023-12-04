<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get"
    @submit.prevent="doSubmit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price"
          v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price"
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

      <button class="filter__reset button button--second" @click.prevent="doReset">
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
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentSeasonId: [],
      currentMaterialId: [],
    };
  },
  props: ['priceFrom', 'priceTo', 'categoryId', 'materialId', 'seasonId'],
  computed: {
    ...mapState(['categoriesData', 'materialsData', 'seasonsData']),
  },
  methods: {
    ...mapActions(['loadCategories', 'loadMaterials', 'loadSeasons']),
    doSubmit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:materialId', this.currentMaterialId);
      this.$emit('update:seasonId', this.currentSeasonId);
    },
    doReset() {
      this.$emit('update:priceFrom', this.currentPriceFrom = 0);
      this.$emit('update:priceTo', this.currentPriceTo = 0);
      this.$emit('update:categoryId', this.currentCategoryId = 0);
      this.$emit('update:materialId', this.currentMaterialId = []);
      this.$emit('update:seasonId', this.currentSeasonId = []);
    },
  },
  created() {
    this.loadCategories();
    this.loadMaterials();
    this.loadSeasons();
  },
};
</script>
