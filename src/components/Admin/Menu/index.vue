<template>
  <div>
    <v-toolbar dense class="mb-5">
      <v-btn text small rounded class="text-none" to="/admin/home">
        Home
      </v-btn>
      <v-btn text small rounded class="text-none" to="/admin/categories">
        Categorias
      </v-btn>
      <v-btn text small rounded class="text-none" to="/admin/products">
        Productos
      </v-btn>
      <v-btn text small rounded class="text-none" to="/admin/users">
        Usuarios
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style></style>
