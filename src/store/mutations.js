export default {
  setProducts(state, payload) {
    state.productsData = payload;
  },
  setMaterials(state, materialsData) {
    state.materialsData = materialsData;
  },
  setColors(state, colorsData) {
    state.colorsData = colorsData;
  },
  setCategories(state, categoriesData) {
    state.categoriesData = categoriesData;
  },
  setSeasons(state, seasonsData) {
    state.seasonsData = seasonsData;
  },
};
