import Vue from 'vue';
import Vuex from 'vuex';
import { products } from '../data/products.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    products: products,
    categories: [],
    user: {},
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const foundIndex = state.cart.findIndex((item) => item.id === product.id);
      if (foundIndex != -1) {
        const { ...productToUpdate } = state.cart[foundIndex];
        productToUpdate.quantity = productToUpdate.quantity + product.quantity;
        state.cart[foundIndex] = productToUpdate;
      } else {
        state.cart.push(product);
      }
      console.log('Producto agregado al carrito!');
    },
  },
  actions: {
    add_To_Cart({ commit, state }, { id, quantity }) {
      const product = state.albums.find((product) => product.id === id);
      product.quantity = quantity;
      commit('ADD_TO_CART', product);
    },
  },
  getters: {
    getProducts: ({ products }) => {
      return products;
    },
    getItem:
      ({ products }) =>
      (id) => {
        const item = products.find((product) => +product.id === +id);
        return item;
      },
  },
  modules: {},
});
