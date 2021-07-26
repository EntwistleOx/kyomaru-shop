<template>
  <v-app>
    <Navbar />
    <Drawer />
    <v-main>
      <v-btn
        color="success"
        fab
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
import Footer from '@/components/Footer';
import Drawer from '@/components/Drawer';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Drawer,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.v-btn--example {
  bottom: 0;
  position: fixed;
  margin: 0 -4px 40px 0;
}
</style>
