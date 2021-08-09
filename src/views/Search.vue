<template>
  <div>
    <Search :products="products" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Search from '@/components/Search';

export default {
  name: 'SearchView',
  components: {
    Search,
  },
  data: () => ({
    products: [],
  }),
  computed: {
    ...mapGetters(['getProducts']),
  },
  methods: {
    filterIt(arr, searchKey) {
      const result = arr.filter((obj) => {
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
      this.products = result;
    },
  },
  mounted() {
    const query = this.$route.query.q;
    this.filterIt(this.getProducts, query);
  },
};
</script>

<style></style>
