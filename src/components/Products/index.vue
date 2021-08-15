<template>
  <div>
    <v-container>
      <p class="text--subtitle-1 font-weight-medium pl-0">{{ title }}</p>
      <Product :products="products" />
    </v-container>
  </div>
</template>

<script>
import Product from "./Product";

export default {
  name: "Products",
  props: ["products", "title"],
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
