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
      :material-id.sync="filterMaterialId"
      :season-id.sync="filterSeasonId"/>

      <section class="catalog">
        <ProductsList :products="products"/>

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

export default {
  data() {
    return {
      page: 1,
      productsPerPage: 5,

      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
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
    ...mapState(['productsData']),
    products() {
      return this.productsData ? this.productsData.items.map((product) => {
        return {
          ...product,
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
    filterMaterialId() {
      this.loadProduct();
    },
    filterSeasonId() {
      this.loadProduct();
    },
  },
  created() {
    this.loadProduct();
  },
};
</script>
