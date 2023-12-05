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
};
