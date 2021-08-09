<template>
  <div>
    <Hero />
    <Products :products="getProducts" />
    <Categories />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
  mounted() {
    this.initialize();
  },

  methods: {
    ...mapActions(['fetch_Categories', 'fetch_Products']),
    initialize() {
      this.fetch_Categories();
      this.fetch_Products();
    },
  },
  computed: {
    ...mapGetters(['getProducts']),
  },
};
</script>
