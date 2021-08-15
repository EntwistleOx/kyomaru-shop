<template>
  <div>
    <Hero />
    <Products :products="getFilteredProducts" title="Productos" />
    <Categories />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Categories from '@/components/Categories';

export default {
  name: 'App',
  components: {
    Hero,
    Products,
    Categories,
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['getFilteredProducts']),
  },
};
</script>
