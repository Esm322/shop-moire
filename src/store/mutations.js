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
  setDeliveries(state, deliveriesData) {
    state.deliveriesData = deliveriesData;
  },
  setPayments(state, paymentsData) {
    state.paymentsData = paymentsData;
  },
  updateProductsCartData(state, productsCartData) {
    state.productsCartData = productsCartData;
  },
  updateUserAccessKey(state, accessKey) {
    state.userAccessKey = accessKey;
  },
  updateCartProductsAmount(state, { productId, amount }) {
    const product = state.cartData.find((productCart) => productCart.productId === productId);

    if (product) {
      product.amount = amount;
    }
  },
  updateOrderInfo(state, orderData) {
    state.orderData = orderData;
  },
  syncProductsCart(state) {
    state.cartData = state.productsCartData.map((products) => {
      return {
        ...products,
      };
    });
  },
  deleteProductCart(state, { productId }) {
    state.cartData = state.cartData.filter((product) => product.productId !== productId);
  },
  resetCart(state) {
    state.cartData = [];
    state.productsCartData = [];
  },
  // statuses
  updateProductsStatusLoading(state, status) {
    state.isProductsLoading = status;
  },
  updateProductsStatusLoadingFailed(state, status) {
    state.isProductsLoadingFailed = status;
  },
  updateCartStatusLoading(state, status) {
    state.isCartLoading = status;
  },
  updateCartStatusLoadingFailed(state, status) {
    state.isCartLoadingFailed = status;
  },
  updateAddLoading(state, status) {
    state.isAddLoading = status;
  },
  updateAddLoadingFailed(state, status) {
    state.isAddLoadingFailed = status;
  },
  updateisAddLoadingEnded(state, status) {
    state.isAddLoadingEnded = status;
  },
  updateOrderDataLoading(state, status) {
    state.isOrderLoading = status;
  },
  updateOrderDataLoadingFailed(state, status) {
    state.isOrderLoadingFailed = status;
  },
  updateSendOrderLoading(state, status) {
    state.isSendOrderLoading = status;
  },
  updateSendOrderLoadingFailed(state, status) {
    state.isSendOrderLoadingFailed = status;
  },
  updateDeleteLoading(state, status) {
    state.isDeleteLoading = status;
  },
  updateDeleteLoadingFailed(state, status) {
    state.isDeleteLoadingFailed = status;
  },
};
