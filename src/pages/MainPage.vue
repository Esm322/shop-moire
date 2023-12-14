<template>
  <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ countProducts }} товара
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter
      :price-from.sync="filterPriceFrom"
      :price-to.sync="filterPriceTo"
      :category-id.sync="filterCategoryId"
      :color-id.sync="filterColorId"
      :material-id.sync="filterMaterialId"
      :season-id.sync="filterSeasonId"
      :products-per-page.sync="productsPerPage"/>

      <section class="catalog">
        <div v-if="isProductsLoading" style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;">
          <div class="spinner-4"></div>
          <h2 style="padding-top: 25px;">
            Загрузка списка товара...
          </h2>
        </div>

        <ProductsList :products="products" v-else/>

        <div style="margin: 0 auto;" v-show="isProductsLoadingFailed">
          <p>
            Похоже произошла ошибка. Попробуйте перезагрузить страницу.
          </p>
        </div>

        <BasePagination
        v-model="page"
        :count="countProducts"
        :per-page="productsPerPage"/>
        </section>
    </div>
  </main>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import { mapActions, mapState } from 'vuex';
import numberFormat from '@/helpers';

export default {
  data() {
    return {
      page: 1,
      productsPerPage: 4,

      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      filterSeasonId: [],
      filterMaterialId: [],
    };
  },
  components: {
    ProductsList,
    BasePagination,
    ProductFilter,
  },
  computed: {
    ...mapState(['productsData', 'isProductsLoading', 'isProductsLoadingFailed']),
    products() {
      return this.productsData ? this.productsData.items.map((product) => {
        return {
          ...product,
          price: numberFormat(product.price),
          colors: product.colors.map((color) => {
            return {
              colorProductId: color.id,
              colorCode: color.color.code,
              colorId: color.color.id,
              colorTitle: color.color.title,
            };
          }),
          images: product.colors.map((color) => {
            return {
              image: color.gallery !== null ? color.gallery[0].file.url
                : 'https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png',
            };
          }),
        };
      }) : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    ...mapActions(['loadProducts']),
    loadProduct() {
      this.loadProducts({
        page: this.page,
        limit: this.productsPerPage,
        minPrice: this.filterPriceFrom,
        maxPrice: this.filterPriceTo,
        categoryId: this.filterCategoryId,
        materialIds: this.filterMaterialId,
        seasonIds: this.filterSeasonId,
        colorIds: this.filterColorId,
      });
    },
  },
  watch: {
    page() {
      this.loadProduct();
    },
    filterPriceFrom() {
      this.loadProduct();
    },
    filterPriceTo() {
      this.loadProduct();
    },
    filterCategoryId() {
      this.loadProduct();
    },
    filterColorId() {
      this.loadProduct();
    },
    filterMaterialId() {
      this.loadProduct();
    },
    filterSeasonId() {
      this.loadProduct();
    },
    productsPerPage() {
      this.loadProduct();
    },
  },
  created() {
    this.loadProduct();
  },
};
</script>
