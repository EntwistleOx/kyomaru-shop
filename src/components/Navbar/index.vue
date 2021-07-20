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
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn text small rounded class="text-none"> Registrate </v-btn>
      <v-btn text small rounded class="text-none"> Iniciar Sesion </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style></style>
