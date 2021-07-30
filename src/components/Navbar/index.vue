<template>
  <div>
    <v-app-bar color="white">
      <router-link to="/">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="../../assets/kyomaru-logo.webp"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Kyomaru Name"
            class="shrink hidden-sm-and-down"
            contain
            min-width="100"
            src="../../assets/kyomaru-name.webp"
            width="120"
          />
        </div>
      </router-link>

      <v-spacer></v-spacer>
      <v-btn icon to="/busqueda" class="hidden-sm-and-down">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon class="hidden-sm-and-down" to="/admin-login">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon to="/carrito">
        <v-badge
          color="blue"
          :content="getTotalCountInCart"
          :value="getTotalCountInCart"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn text rounded class="hidden-md-and-up">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-divider vertical class="hidden-sm-and-down mx-2"></v-divider>

      <Dialog />
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Dialog from './Dialog';

export default {
  name: 'Navbar',
  components: {
    Dialog,
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['getTotalCountInCart']),
  },
};
</script>

<style></style>
