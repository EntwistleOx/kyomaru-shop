<template>
  <div>
    <Products :products="products" />
  </div>
</template>

<script>
import Products from '@/components/Products';

export default {
  name: 'Search',
  props: ['products'],
  components: {
    Products,
  },
};
</script>

<style></style>
