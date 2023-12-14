import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productsData: null,
    isProductsLoading: false,
    isProductsLoadingFailed: false,
    materialsData: null,
    colorsData: null,
    categoriesData: null,
    seasonsData: null,
    deliveriesData: null,
    paymentsData: null,
    orderData: null,
    isOrderLoading: false,
    isOrderLoadingFailed: false,
    productsCartData: [],
    cartData: [],
    isCartLoading: false,
    isCartLoadingFailed: false,
    userAccessKey: null,
    isAddLoading: false,
    isAddLoadingEnded: false,
    isAddLoadingFailed: false,
    isDeleteLoading: false,
    isDeleteLoadingFailed: false,
  },
  getters,
  mutations,
  actions,
});
