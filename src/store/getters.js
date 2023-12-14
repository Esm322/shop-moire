export default {
  getCart(state) {
    return state.cartData;
  },
  getCartDetailsProduct(state) {
    return state.cartData.map((cartItem) => {
      const product = state.productsCartData
        .find((item) => item.product.id === item.productId);
      return {
        ...product,
        ...cartItem,
      };
    });
  },
  getCartProductsAmount(state, getters) {
    return getters.getCartDetailsProduct.length;
  },
  getCartTotalPrice(state, getters) {
    return getters.getCartDetailsProduct
      .reduce((acc, item) => (item.quantity * item.price) + acc, 0);
  },
  getTotalProductsAmount(state, getters) {
    return getters.getCartDetailsProduct.reduce((acc, item) => (item.quantity + acc), 0);
  },
  getOrderDeatails(state) {
    return {
      ...state.orderData,
      items: state.orderData.basket.items.map((item) => {
        return {
          ...item,
        };
      }),
    };
  },
  getOrderTotalAmount(state, getters) {
    return getters.getOrderDeatails.items.reduce((acc, item) => item.quantity + acc, 0);
  },
};
