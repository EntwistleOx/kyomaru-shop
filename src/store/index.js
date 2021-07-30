import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

// JSON Data
import { products } from '../data/products.json';
import { regions } from '../data/comunas-regiones.json';
import { shiping } from '../data/shiping.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    products: products,
    categories: [],
    user: null,
    regions: regions,
    shiping: shiping,
    snack: {},
    drawer: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
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
    SHOW_DRAWER(state, drawer) {
      state.drawer = drawer;
    },
    SHOW_SNACK(state, snack) {
      state.snack = snack;
    },
  },
  actions: {
    show_Drawer({ commit }, drawer) {
      commit('SHOW_DRAWER', drawer);
    },
    show_Snack({ commit }, snack) {
      commit('SHOW_SNACK', snack);
    },
    register({ commit }, { name, lastName, rut, phone, email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const { uid } = userCredential.user;
          const fields = {
            name,
            lastName,
            rut,
            phone,
            email,
          };
          firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .set(fields)
            .then(() => {
              const snack = {
                show: true,
                text: 'Registrado con exito!',
                color: 'success',
              };
              commit('SHOW_SNACK', snack);
            })
            .catch((error) => {
              const snack = {
                show: true,
                text: error.message,
                color: 'error',
              };
              commit('SHOW_SNACK', snack);
            });
        })
        .catch((error) => {
          const snack = {
            show: true,
            text: error.message,
            color: 'error',
          };
          commit('SHOW_SNACK', snack);
        });
    },
    sign_In({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          const snack = {
            show: true,
            text: `Bienvenido!`,
            color: 'success',
          };
          commit('SHOW_SNACK', snack);
        })
        .catch((error) => {
          const snack = {
            show: true,
            text: error.message,
            color: 'error',
          };
          commit('SHOW_SNACK', snack);
        });
    },
    sign_Out({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('SET_USER', null);
        })
        .catch((error) => {
          const snack = {
            show: true,
            text: error.message,
            color: 'error',
          };
          commit('SHOW_SNACK', snack);
        });
    },
    auth_State_Change({ commit }) {
      firebase.auth().onAuthStateChanged((userCredential) => {
        if (userCredential) {
          const { uid } = userCredential;
          firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .get()
            .then((doc) => {
              doc.data();
              commit('SET_USER', doc.data());
            })
            .catch(() => commit('SET_USER', null));
        } else {
          commit('SET_USER', null);
        }
      });
    },
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
    snackbar: ({ snack }) => {
      return snack;
    },
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
