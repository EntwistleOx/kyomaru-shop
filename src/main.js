import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Firebase config
import firebaseConfig from './config/firebase';

// Init firebase
firebase.initializeApp(firebaseConfig);

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
