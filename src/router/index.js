import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

// Views
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import Search from '../views/Search.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';
import Contact from '../views/Contact.vue';
import PostTransaction from '../views/PostTransaction';
import PostTransactionError from '../views/PostTransactionError';
import AdminLogin from '../views/Admin/Login.vue';
import AdminHome from '../views/Admin/Home.vue';
import AdminCategories from '../views/Admin/Categories';
import AdminProducts from '../views/Admin/Products';
import AdminOrders from '../views/Admin/Orders';
import AdminUsers from '../views/Admin/Users';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/producto/:id',
    name: 'Product',
    component: Product,
  },
  {
    path: '/busqueda',
    name: 'Search',
    component: Search,
  },
  {
    path: '/contacto',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/carrito',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/:userId/orden/:orderId',
    name: 'PostTransaction',
    component: PostTransaction,
    props: true,
  },
  {
    path: '/orden/error',
    name: 'PostTransactionError',
    component: PostTransactionError,
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: {
      admin: true,
    },
  },
  {
    path: '/admin/home',
    name: 'AdminHome',
    component: AdminHome,
    meta: {
      admin: true,
    },
  },
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: AdminCategories,
    meta: {
      admin: true,
    },
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts,
    meta: {
      admin: true,
    },
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: AdminOrders,
    meta: {
      admin: true,
    },
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    meta: {
      admin: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 300);
  firebase.auth().onAuthStateChanged((user) => {
    let adminRequired = to.matched.some((route) => route.meta.admin);
    if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        const admin = idTokenResult.claims.admin;
        if (adminRequired && !admin) next('/');
        else next();
      });
    } else {
      if (adminRequired) next('/');
      else next();
    }
  });
  next();
});

export default router;
