<template>
  <v-app>
    <Navbar />
    <Menu />
    <Drawer />
    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';
import Drawer from '@/components/Drawer';

export default {
  name: 'App',
  components: {
    Navbar,
    Menu,
    Footer,
    Drawer,
  },
  data: () => ({
    //
  }),
};
</script>
