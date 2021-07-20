<template>
  <v-app>
    <Navbar />
    <Menu />

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

export default {
  name: 'App',
  components: {
    Navbar,
    Menu,
    Footer,
  },
  data: () => ({
    //
  }),
};
</script>
