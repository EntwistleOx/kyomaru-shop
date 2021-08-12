<template>
  <div>
    <Products
      :products="products"
      :title="`La busqueda ha arrojado ${products.length} ${
        products.length === 1 ? 'resultado' : 'resultados'
      }`"
    />
  </div>
</template>

<script>
import Products from "@/components/Products";

export default {
  name: "Search",
  props: ["products"],
  components: {
    Products,
  },
};
</script>

<style></style>
