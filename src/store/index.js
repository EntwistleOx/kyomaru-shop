import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import firebase from 'firebase';

// JSON Data
import { regions } from '../data/comunas-regiones.json';
import { shiping } from '../data/shiping.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    products: [],
    filteredProducts: [],
    categories: [],
    users: [],
    user: null,
    regions: regions,
    shiping: shiping,
    snack: {},
    drawer: false,
    dialog: { state: false, tab: null },
    order: {},
    orders: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    CLEAR_CART(state) {
      state.cart = [];
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
    SHOW_DIALOG(state, dialog) {
      state.dialog = dialog;
    },
    SET_ORDER(state, order) {
      state.order = order;
    },
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_FILTERED_PRODUCTS(state, filteredProducts) {
      state.filteredProducts = filteredProducts;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    // SHOW COMPONENTS
    show_Drawer({ commit }, drawer) {
      commit('SHOW_DRAWER', drawer);
    },
    show_Snack({ commit }, snack) {
      commit('SHOW_SNACK', snack);
    },
    show_Dialog({ commit }, dialog) {
      commit('SHOW_DIALOG', dialog);
    },
    // AUTH
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
            admin: false,
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
              commit('SHOW_DIALOG', { state: false, tab: null });
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
          commit('SHOW_DIALOG', { state: false, tab: null });
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
          commit('CLEAR_CART');
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
              userCredential.getIdTokenResult().then((idTokenResult) => {
                const admin = idTokenResult.claims.admin;
                if (admin) {
                  const user = { ...doc.data(), id: doc.id, admin };
                  commit('SET_USER', user);
                } else {
                  const user = { ...doc.data(), id: doc.id };
                  commit('SET_USER', user);
                }
              });
            })
            .catch(() => commit('SET_USER', null));
        } else {
          commit('SET_USER', null);
        }
      });
    },
    // CART
    clear_Cart({ commit }) {
      commit('CLEAR_CART');
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
    // SAVE CART TO DB
    save_Cart({ commit, state: { user, cart } }, { address, totals }) {
      const createdAt = firebase.firestore.FieldValue.serverTimestamp();

      const userId = user.id;
      firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('orders')
        .add({ address, cart, totals, createdAt })
        .then((doc) => {
          firebase
            .firestore()
            .collection('orders')
            .doc(doc.id)
            .set({ address, cart, totals, user, createdAt })
            .then(() => {
              window.location = `http://localhost:5000/api/v1/tbk/?userId=${userId}&orderId=${doc.id}&amount=${totals.total}`;
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
    // GET A ORDER
    get_Order({ commit }, { userId, orderId }) {
      commit('CLEAR_CART');
      firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .get()
        .then((doc) => {
          const user = doc.data();
          firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('orders')
            .doc(orderId)
            .get()
            .then((doc) => {
              const { address, totals, cart, payment } = doc.data();
              const order = {
                user,
                address,
                totals,
                cart,
                paymentStatus: payment.status,
              };
              commit('SET_ORDER', order);
            })
            .catch((error) => {
              console.log(error);
              const snack = {
                show: true,
                text: error.message,
                color: 'error',
              };
              commit('SHOW_SNACK', snack);
            });
        })
        .catch((error) => {
          console.log(error);
          const snack = {
            show: true,
            text: error.message,
            color: 'error',
          };
          commit('SHOW_SNACK', snack);
        });
    },
    // CATEGORIES
    fetch_Categories({ commit }) {
      firebase
        .firestore()
        .collection('categories')
        .orderBy('name', 'asc')
        .onSnapshot((snapshot) => {
          const categories = [];
          snapshot.forEach((doc) => {
            categories.push({ ...doc.data(), id: doc.id });
          });
          commit('SET_CATEGORIES', categories);
        });
    },
    add_Category({ commit }, category) {
      const {
        photo,
        photo: { name },
      } = category;
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`categories/${name}`);
      fileRef.put(photo).then(() => {
        fileRef.getDownloadURL().then((url) => {
          const data = {
            name: category.name,
            photo: { url, storage: `categories/${name}` },
          };
          firebase
            .firestore()
            .collection('categories')
            .add(data)
            .then(() => {
              const snack = {
                show: true,
                text: 'Categoria agregada con exito.',
                color: 'success',
              };
              commit('SHOW_SNACK', snack);
            });
        });
      });
    },
    update_Category({ commit }, { id, category }) {
      if (!category.photo) {
        const data = {
          name: category.name,
        };
        firebase
          .firestore()
          .collection('categories')
          .doc(id)
          .update(data)
          .then(() => {
            const snack = {
              show: true,
              text: 'Categoria editada con exito.',
              color: 'success',
            };
            commit('SHOW_SNACK', snack);
          });
      } else {
        const {
          photo,
          photo: { name },
        } = category;
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`categories/${name}`);
        fileRef.put(photo).then(() => {
          fileRef.getDownloadURL().then((url) => {
            const data = {
              name: category.name,
              photo: { url, storage: `categories/${name}` },
            };
            firebase
              .firestore()
              .collection('categories')
              .doc(id)
              .update(data)
              .then(() => {
                const categoryRef = storageRef.child(category.photoStorage);
                categoryRef
                  .delete()
                  .then(function () {
                    const snack = {
                      show: true,
                      text: 'Categoria editada con exito.',
                      color: 'success',
                    };
                    commit('SHOW_SNACK', snack);
                  })
                  .catch(function (error) {
                    const snack = {
                      show: true,
                      text: error.message,
                      color: 'error',
                    };
                    commit('SHOW_SNACK', snack);
                  });
              });
          });
        });
      }
    },
    delete_Category({ commit }, { id, storage }) {
      firebase
        .firestore()
        .collection('categories')
        .doc(id)
        .delete()
        .then(() => {
          const storageRef = firebase.storage().ref();
          const categoryRef = storageRef.child(storage);
          categoryRef
            .delete()
            .then(function () {
              const snack = {
                show: true,
                text: 'Categoria eliminada con exito.',
                color: 'success',
              };
              commit('SHOW_SNACK', snack);
            })
            .catch(function (error) {
              const snack = {
                show: true,
                text: error.message,
                color: 'error',
              };
              commit('SHOW_SNACK', snack);
            });
        });
      const snack = {
        show: true,
        text: 'Curso eliminado con exito.',
        color: 'success',
      };
      commit('SHOW_SNACK', snack);
    },
    // PRODUCTS
    fetch_Products({ commit }) {
      firebase
        .firestore()
        .collection('products')
        .orderBy('name', 'asc')
        .onSnapshot((snapshot) => {
          const products = [];
          snapshot.forEach((doc) => {
            products.push({ ...doc.data(), id: doc.id });
          });
          commit('SET_PRODUCTS', products);
          commit('SET_FILTERED_PRODUCTS', products);
        });
    },
    add_Product({ commit }, product) {
      const {
        photo,
        photo: { name },
      } = product;
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`products/${name}`);
      fileRef.put(photo).then(() => {
        fileRef.getDownloadURL().then((url) => {
          const data = {
            ...product,
            photo: { url, storage: `products/${name}` },
          };
          firebase
            .firestore()
            .collection('products')
            .add(data)
            .then(() => {
              const snack = {
                show: true,
                text: 'Producto agregado con exito.',
                color: 'success',
              };
              commit('SHOW_SNACK', snack);
            });
        });
      });
    },
    update_Product({ commit }, { id, product }) {
      if (!product.photo) {
        const data = { ...product };
        delete data.photo;
        delete data.photoStorage;
        firebase
          .firestore()
          .collection('products')
          .doc(id)
          .update(data)
          .then(() => {
            const snack = {
              show: true,
              text: 'Producto editado con exito.',
              color: 'success',
            };
            commit('SHOW_SNACK', snack);
          });
      } else {
        const {
          photo,
          photo: { name },
        } = product;
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`products/${name}`);
        fileRef.put(photo).then(() => {
          fileRef.getDownloadURL().then((url) => {
            const data = {
              ...product,
              photo: { url, storage: `products/${name}` },
            };
            delete data.photoStorage;
            firebase
              .firestore()
              .collection('products')
              .doc(id)
              .update(data)
              .then(() => {
                const productRef = storageRef.child(product.photoStorage);
                productRef
                  .delete()
                  .then(function () {
                    const snack = {
                      show: true,
                      text: 'Producto editado con exito.',
                      color: 'success',
                    };
                    commit('SHOW_SNACK', snack);
                  })
                  .catch(function (error) {
                    const snack = {
                      show: true,
                      text: error.message,
                      color: 'error',
                    };
                    commit('SHOW_SNACK', snack);
                  });
              });
          });
        });
      }
    },
    delete_Product({ commit }, { id, storage }) {
      firebase
        .firestore()
        .collection('products')
        .doc(id)
        .delete()
        .then(() => {
          const storageRef = firebase.storage().ref();
          const productRef = storageRef.child(storage);
          productRef
            .delete()
            .then(function () {
              const snack = {
                show: true,
                text: 'Producto eliminado con exito.',
                color: 'success',
              };
              commit('SHOW_SNACK', snack);
            })
            .catch(function (error) {
              const snack = {
                show: true,
                text: error.message,
                color: 'error',
              };
              commit('SHOW_SNACK', snack);
            });
        });
      const snack = {
        show: true,
        text: 'Curso eliminado con exito.',
        color: 'success',
      };
      commit('SHOW_SNACK', snack);
    },
    // FILTERED PRODUCTS
    filterForProducts({ commit, state: { products } }, searchKey) {
      const result = products.filter((obj) => {
        return Object.keys(obj).some((key) => {
          if (key === 'description' || key === 'name' || key === 'categories') {
            if (Array.isArray(obj[key])) {
              return obj[key].some(
                (element) => element.toLowerCase() === searchKey.toLowerCase(),
              );
            } else {
              return obj[key].toLowerCase().includes(searchKey.toLowerCase());
            }
          }
        });
      });
      commit('SET_FILTERED_PRODUCTS', result);
    },
    // USERS
    fetch_Users({ commit }) {
      firebase
        .firestore()
        .collection('users')
        .where('admin', '==', false)
        .get()
        .then((users) => {
          const usersArry = [];
          users.forEach((user) => {
            firebase
              .firestore()
              .collection('users')
              .doc(user.id)
              .collection('orders')
              .get()
              .then((orders) => {
                const ordersArry = [];
                orders.forEach((order) => {
                  ordersArry.push({
                    ...order.data(),
                    id: order.id,
                  });
                });
                usersArry.push({
                  ...user.data(),
                  id: user.id,
                  orders: ordersArry,
                });
                commit('SET_USERS', usersArry);
              })
              .catch((error) => {
                const snack = {
                  show: true,
                  text: error.message,
                  color: 'error',
                };
                commit('SHOW_SNACK', snack);
              });
          });
        });
    },
    // ORDERS
    fetch_Orders({ commit }) {
      firebase
        .firestore()
        .collection('orders')
        .get()
        .then((orders) => {
          const ordersArry = [];
          orders.forEach((order) => {
            ordersArry.push({
              ...order.data(),
              id: order.id,
            });
          });

          commit('SET_ORDERS', ordersArry);
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
  },
  getters: {
    snackbar: ({ snack }) => {
      return snack;
    },
    getDrawer: ({ drawer }) => {
      return drawer;
    },
    getUser: ({ user }) => {
      return user;
    },
    getUsers: ({ users }) => {
      return users;
    },
    getDialog: ({ dialog }) => {
      return dialog;
    },
    getProducts: ({ products }) => {
      return products;
    },
    getFilteredProducts: ({ filteredProducts }) => {
      return filteredProducts;
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
    getOrder: ({ order }) => {
      return order;
    },
    getOrders: ({ orders }) => {
      return orders;
    },
    getCategories: ({ categories }) => {
      return categories;
    },
    getItem:
      ({ products }) =>
      (id) => {
        const item = products.find((product) => product.id === id);
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
  plugins: [createPersistedState()],
});
