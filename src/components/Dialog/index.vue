<template>
  <v-dialog v-model="getDialog.state" max-width="600px">
    <v-card>
      <v-tabs v-model="getDialog.tab" grow>
        <v-tab v-for="item in items" :key="item">
          <span class="text-none">
            {{ item }}
          </span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="getDialog.tab">
        <v-tab-item>
          <v-card-text>
            <Register ref="register" />
          </v-card-text>
        </v-tab-item>
        <v-tab-item>
          <v-card-text>
            <SignIn ref="login" />
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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

import SignIn from "./SignIn";
import Register from "./Register";

export default {
  name: "Dialog",
  components: {
    SignIn,
    Register,
  },
  data: () => ({
    items: ["Registrate", "Iniciar Sesion"],
  }),
  computed: {
    ...mapGetters(["getDialog"]),
  },
  methods: {
    submit() {
      if (this.getDialog.tab === 0) {
        this.$refs.register.submit();
      } else {
        this.$refs.login.submit();
      }
    },
  },
};
</script>

<style></style>
