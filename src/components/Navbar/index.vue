<template>
  <div>
    <v-app-bar color="white">
      <router-link to="/">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="kyomaru-logo.webp"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Kyomaru Name"
            class="shrink hidden-sm-and-down"
            contain
            min-width="100"
            src="kyomaru-name.webp"
            width="120"
          />
        </div>
      </router-link>

      <v-spacer></v-spacer>
      <v-btn icon to="busqueda" class="hidden-sm-and-down">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon class="hidden-sm-and-down">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon to="carrito">
        <v-badge color="blue" content="3">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn text rounded class="hidden-md-and-up"> Menu </v-btn>

      <v-divider vertical class="hidden-sm-and-down mx-2"></v-divider>

      <v-btn text small rounded class="text-none hidden-sm-and-down">
        Registrate
      </v-btn>
      <v-btn text small rounded class="text-none hidden-sm-and-down">
        Iniciar Sesion
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style></style>
