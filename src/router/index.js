import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import Search from '../views/Search.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';
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
    path: '/admin-login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path: '/admin-home',
    name: 'AdminHome',
    component: AdminHome,
  },
  {
    path: '/admin-categories',
    name: 'AdminCategories',
    component: AdminCategories,
  },
  {
    path: '/admin-products',
    name: 'AdminProducts',
    component: AdminProducts,
  },
  {
    path: '/admin-orders',
    name: 'AdminOrders',
    component: AdminOrders,
  },
  {
    path: '/admin-users',
    name: 'AdminUsers',
    component: AdminUsers,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
