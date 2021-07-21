import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import Search from '../views/Search.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/producto-sampler',
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
