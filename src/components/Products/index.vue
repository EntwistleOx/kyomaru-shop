<template>
  <div>
    <v-container>
      <v-subheader class="pl-0">Productos</v-subheader>
      <Product :products="products" />
    </v-container>
  </div>
</template>

<script>
import Product from './Product';
import { mapGetters } from 'vuex';

export default {
  name: 'Products',
  components: {
    Product,
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['getProducts']),
    products() {
      return this.getProducts;
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
