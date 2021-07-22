<template>
  <v-app>
    <Navbar />
    <!-- <Menu /> -->
    <Drawer />
    <v-main>
      <v-btn
        color="success"
        fab
        large
        dark
        bottom
        absolute
        right
        class="v-btn--example"
      >
        <v-icon x-large>mdi-whatsapp</v-icon>
      </v-btn>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';
// import Menu from '@/components/Menu';
import Footer from '@/components/Footer';
import Drawer from '@/components/Drawer';

export default {
  name: 'App',
  components: {
    Navbar,
    // Menu,
    Footer,
    Drawer,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
.v-btn--example {
  bottom: 0;
  position: fixed;
  margin: 0 0 48px 0;
}
</style>
