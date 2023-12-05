import axios from 'axios';

export default {
  loadProducts(context, payload) {
    return axios.get('https://vue-moire.skillbox.cc/api/products', { params: payload })
      .then((response) => context.commit('setProducts', response.data));
  },
  loadMaterials(context) {
    return axios.get('https://vue-moire.skillbox.cc/api/materials')
      .then((response) => context.commit('setMaterials', response.data.items));
  },
  loadColors(context) {
    return axios.get('https://vue-moire.skillbox.cc/api/colors')
      .then((response) => context.commit('setColors', response.data.items));
  },
  loadCategories(context) {
    return axios.get('https://vue-moire.skillbox.cc/api/productCategories')
      .then((response) => context.commit('setCategories', response.data.items));
  },
  loadSeasons(context) {
    return axios.get('https://vue-moire.skillbox.cc/api/seasons')
      .then((response) => context.commit('setSeasons', response.data.items));
  },
  loadCart(context) {
    return axios.get('https://vue-moire.skillbox.cc/api/baskets', {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
      .then((response) => {
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          context.commit('updateUserAccessKey', response.data.user.accessKey);
        }
        context.commit('updateProductsCartData', response.data.items);
        context.commit('syncProductsCart');
      });
  },
  addProductToCart(context, {
    productId,
    colorId,
    sizeId,
    amount,
  }) {
    return axios.get('https://vue-moire.skillbox.cc/api/baskets/products', {
      productId: productId,
      colorId: colorId,
      sizeId: sizeId,
      quantity: amount,
    }, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
      .then((response) => {
        context.commit('updateProductsCartData', response.data.items);
        context.commit('syncProductsCart');
      });
  },
};
