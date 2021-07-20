<template>
  <div>
    <Hero />
    <Products />
    <Categories />
  </div>
</template>

<script>
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
  data: () => ({
    //
  }),
};
</script>
