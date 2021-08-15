<template>
  <v-app>
    <Navbar />
    <Drawer />
    <Snackbar />
    <v-main class="mt-14">
      <v-btn
        color="success"
        fab
        dark
        bottom
        absolute
        right
        class="v-btn--whatsapp"
        target="_blank"
        href="https://wa.me/56963472861?text=Hola!%20Me%20interesa%20un%20producto%20que%20estás%20vendiendo"
      >
        <v-icon x-large>mdi-whatsapp</v-icon>
      </v-btn>
      <router-view />
    </v-main>

    <Footer />
    <v-overlay :value="getOverlay" opacity="1" color="#fff">
      <v-img
        class="animate-flicker"
        src="https://cdn.shopify.com/s/files/1/0457/8174/5831/files/KyoMaru_LOGO_2021_WEB_360x.jpg?v=1614575281"
      ></v-img>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Drawer from '@/components/Drawer';
import Snackbar from '@/components/Snackbar';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Drawer,
    Snackbar,
  },
  data: () => ({}),
  mounted() {
    this.auth_State_Change();
    this.fetch_Categories();
    this.fetch_Products();
  },
  methods: {
    ...mapActions(['auth_State_Change', 'fetch_Categories', 'fetch_Products']),
  },
  computed: {
    ...mapGetters(['getOverlay']),
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

@keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes flickerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.animate-flicker {
  -webkit-animation: flickerAnimation 1.3s infinite;
  -moz-animation: flickerAnimation 1.3s infinite;
  -o-animation: flickerAnimation 1.3s infinite;
  animation: flickerAnimation 1.3s infinite;
}
</style>
