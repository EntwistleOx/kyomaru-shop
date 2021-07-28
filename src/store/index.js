import Vue from 'vue';
import Vuex from 'vuex';
import { products } from '../data/products.json';
import { regions } from '../data/comunas-regiones.json';
import { shiping } from '../data/shiping.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    products: products,
    categories: [],
    user: {},
    regions: regions,
    shiping: shiping,
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
    UPDATE_CART_QUANTITY(state, updatedCart) {
      state.cart = updatedCart;
    },
    DELETE_FROM_CART(state, id) {
      const index = state.cart.findIndex((item) => item.id === id);
      state.cart.splice(index, 1);
    },
  },
  actions: {
    add_To_Cart({ commit, state }, { id, quantity }) {
      const product = state.products.find((product) => product.id === id);
      product.quantity = quantity;
      commit('ADD_TO_CART', product);
    },
    add_Item_Quantity({ commit, state }, id) {
      const index = state.cart.findIndex((item) => item.id === id);
      const cart = [...state.cart];
      cart[index].quantity >= 10
        ? cart[index].quantity
        : cart[index].quantity++;
      commit('UPDATE_CART_QUANTITY', cart);
    },
    substract_Item_Quantity({ commit, state }, id) {
      const index = state.cart.findIndex((item) => item.id === id);
      const cart = [...state.cart];
      cart[index].quantity <= 1 ? cart[index].quantity : cart[index].quantity--;
      commit('UPDATE_CART_QUANTITY', cart);
    },
    delete_Item_From_Cart({ commit }, id) {
      commit('DELETE_FROM_CART', id);
    },
  },
  getters: {
    getProducts: ({ products }) => {
      return products;
    },
    getCart: ({ cart }) => {
      return cart;
    },
    getRegions: ({ regions }) => {
      return regions;
    },
    getShiping: ({ shiping }) => {
      return shiping;
    },
    getItem:
      ({ products }) =>
      (id) => {
        const item = products.find((product) => +product.id === +id);
        return item;
      },
    getTotalCountInCart({ cart }) {
      const count = cart.length;
      return count;
    },
    getSubTotal({ cart }) {
      const subtotal = cart.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        0,
      );
      return subtotal;
    },
  },
  modules: {},
});
