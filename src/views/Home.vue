<template>
  <div>
    <Hero />
    <Products />
    <Categories />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Categories from "@/components/Categories";

export default {
  name: "App",
  components: {
    Hero,
    Products,
    Categories,
  },
  data: () => ({}),
  mounted() {
    this.fetchCategories();
  },

  methods: {
    ...mapActions(["fetch_Categories"]),

    fetchCategories() {
      this.fetch_Categories();
    },
  },
};
</script>
