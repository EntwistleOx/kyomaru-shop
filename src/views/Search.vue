<template>
  <div>
    <Search :products="getFilteredProducts" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Search from '@/components/Search';

export default {
  name: 'SearchView',
  components: {
    Search,
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['getFilteredProducts']),
  },
  methods: {
    ...mapActions(['filterForProducts']),
  },
  mounted() {
    const query = this.$route.query.q;
    this.filterForProducts(query);
  },
};
</script>

<style></style>
