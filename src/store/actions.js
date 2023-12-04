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
};
