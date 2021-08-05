<template>
  <v-dialog v-model="getDialog" persistent max-width="600px">
    <v-card>
      <v-tabs v-model="tab" grow>
        <v-tab v-for="item in items" :key="item">
          <span class="text-none">
            {{ item }}
          </span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card-text>
            <Register ref="dialog" />
          </v-card-text>
        </v-tab-item>
        <v-tab-item>
          <v-card-text>
            <SignIn ref="dialog" />
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
      <v-card-actions>
        <v-btn
          text
          color="blue darken-1"
          @click="submit"
          class="text-none"
          outlined
          rounded
        >
          Enviar
        </v-btn>

        <v-btn
          text
          color="blue darken-1"
          @click="show_Dialog(false)"
          class="text-none"
          outlined
          rounded
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import SignIn from './SignIn';
import Register from './Register';

export default {
  name: 'Dialog',
  components: {
    SignIn,
    Register,
  },
  props: ['tab'],
  data: () => ({
    items: ['Registrate', 'Iniciar Sesion'],
  }),
  computed: {
    ...mapGetters(['getDialog']),
  },
  methods: {
    ...mapActions(['show_Dialog']),
    submit() {
      this.$refs.dialog.submit();
    },
  },
};
</script>

<style></style>
