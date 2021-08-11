<template>
  <div>
    <v-container>
      <v-subheader class="pl-0">{{ title }}</v-subheader>
      <Product :products="products" />
    </v-container>
  </div>
</template>

<script>
import Product from './Product';

export default {
  name: 'Products',
  props: ['products', 'title'],
  components: {
    Product,
  },
  data: () => ({}),
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
