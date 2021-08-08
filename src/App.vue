<template>
  <v-app>
    <Navbar />
    <!-- <Drawer /> -->
    <Snackbar />
    <v-main>
      <v-btn
        color="success"
        fab
        dark
        bottom
        absolute
        right
        class="v-btn--whatsapp"
      >
        <v-icon x-large>mdi-whatsapp</v-icon>
      </v-btn>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import Drawer from '@/components/Drawer';
import Snackbar from "@/components/Snackbar";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    // Drawer,
    Snackbar,
  },
  data: () => ({
    //
  }),
  mounted() {
    this.auth_State_Change();
  },
  methods: {
    ...mapActions(["auth_State_Change"]),
  },
};
</script>

<style>
html {
  scroll-behavior: smooth !important;
}

.v-btn--whatsapp {
  bottom: 0;
  position: fixed;
  margin: 0 -4px 40px 0;
}
</style>
