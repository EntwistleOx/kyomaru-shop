<template>
  <v-container class="mt-5">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Informacion de Contacto
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"> Envio </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Pago </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary mr-3" @click="e1 = 2" rounded>
            Continuar
          </v-btn>

          <v-btn text rounded outlined color="error"> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary mr-3" @click="e1 = 3" rounded>
            Continuar
          </v-btn>

          <v-btn text rounded outlined color="error"> Cancelar </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary mr-3" @click="e1 = 1" rounded> Continue </v-btn>

          <v-btn text rounded outlined color="error"> Cancel </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      e1: 1,
    };
  },
};
</script>

<style></style>
