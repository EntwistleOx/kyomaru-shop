<template>
  <v-container class="mt-5 container">
    <div class="d-flex align-center">
      <v-icon x-large color="error" class="mr-3">
        mdi-alert-circle-outline
      </v-icon>
      <h1 class="text-h6">¡Ups!</h1>
    </div>
    <v-card class="mt-5">
      <v-card-text>
        <h3 class="text-h6 text--primary mb-2">
          Ha ocurrido un error con tu orden
        </h3>
        <div>Por favor intenta nuevamente..</div>
      </v-card-text>
    </v-card>
    <v-btn color="info" class="text-none mt-4" block to="/">
      Seguir comprando
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {};
  },
  mounted() {
    this.setData();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
