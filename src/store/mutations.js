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
  updateProductsCartData(state, productsCartData) {
    state.productsCartData = productsCartData;
  },
  updateUserAccessKey(state, accessKey) {
    state.userAccessKey = accessKey;
  },
  syncProductsCart(state) {
    state.cartData = state.productsCartData.map((products) => {
      return {
        ...products,
      };
    });
  },
};
