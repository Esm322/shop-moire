import axios from 'axios';

export default {
  loadProducts(context, payload) {
    context.commit('updateProductsStatusLoading', true);
    context.commit('updateProductsStatusLoadingFailed', false);
    return axios.get('https://vue-moire.skillbox.cc/api/products', { params: payload })
      .then((response) => context.commit('setProducts', response.data))
      .catch(() => {
        context.commit('updateProductsStatusLoading', false);
        context.commit('updateProductsStatusLoadingFailed', true);
      })
      .finally(() => context.commit('updateProductsStatusLoading', false));
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
    context.commit('updateCartStatusLoading', true);
    context.commit('updateCartStatusLoadingFailed', false);
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
      })
      .catch(() => {
        context.commit('updateCartStatusLoading', false);
        context.commit('updateCartStatusLoadingFailed', true);
      })
      .finally(() => context.commit('updateCartStatusLoading', false));
  },
  loadDeliveries(context) {
    return axios.get('https://vue-moire.skillbox.cc/api/deliveries')
      .then((response) => context.commit('setDeliveries', response.data));
  },
  loadPayments(context, { deliveryTypeId }) {
    return axios.get('https://vue-moire.skillbox.cc/api/payments', {
      params: {
        deliveryTypeId: deliveryTypeId,
      },
    })
      .then((response) => context.commit('setPayments', response.data));
  },
  loadOrderInfo(context, { orderId }) {
    context.commit('updateOrderDataLoading', true);
    context.commit('updateOrderDataLoadingFailed', false);
    return axios.get(`https://vue-moire.skillbox.cc/api/orders/${orderId}`, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
      .then((response) => context.commit('updateOrderInfo', response.data))
      .catch(() => {
        context.commit('updateOrderDataLoading', false);
        context.commit('updateOrderDataLoadingFailed', true);
      })
      .finally(() => context.commit('updateOrderDataLoading', false));
  },
  addProductToCart(context, {
    productId,
    colorId,
    sizeId,
    amount,
  }) {
    context.commit('updateAddLoading', true);
    context.commit('updateAddLoadingFailed', false);
    context.commit('updateisAddLoadingEnded', false);
    return axios.post('https://vue-moire.skillbox.cc/api/baskets/products', {
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
      })
      .catch(() => {
        context.commit('updateAddLoading', false);
        context.commit('updateAddLoadingFailed', true);
      })
      .finally(() => {
        context.commit('updateAddLoading', false);
        context.commit('updateisAddLoadingEnded', true);
        setTimeout(() => context.commit('updateisAddLoadingEnded', false), 3000);
      });
  },
  updateCartProductAmount(context, { productId, amount, basketItemId }) {
    context.commit('updateCartProductsAmount', { productId, amount });

    if (amount < 1) {
      return;
    }

    return axios.put('https://vue-moire.skillbox.cc/api/baskets/products', {
      basketItemId: basketItemId,
      quantity: amount,
    }, {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
    })
      .then((response) => {
        context.commit('updateProductsCartData', response.data.items);
        context.commit('syncProductsCart');
      })
      .catch(() => context.commit('syncProductsCart'));
  },
  deleteProductFromCart(context, { basketItemId, productId }) {
    context.commit('deleteProductCart', { productId });
    context.commit('updateDeleteLoading', true);
    context.commit('updateDeleteLoadingFailed', false);

    return axios.delete('https://vue-moire.skillbox.cc/api/baskets/products', {
      params: {
        userAccessKey: context.state.userAccessKey,
      },
      data: {
        basketItemId,
        productId,
      },
    })
      .then((response) => {
        context.commit('updateProductsCartData', response.data.items);
        context.commit('syncProductsCart');
      })
      .catch(() => {
        context.commit('updateDeleteLoading', false);
        context.commit('updateDeleteLoadingFailed', true);
      })
      .finally(() => context.commit('updateDeleteLoading', false));
  },
};
