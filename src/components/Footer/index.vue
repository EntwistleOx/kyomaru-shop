<template>
  <v-footer dark padless>
    <v-card class="flex red" flat tile>
      <v-card-title>
        <strong class="subheading"> JAPÓN EN TU CASA. </strong>

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="my-red py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>KyoMaru</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    icons: ['mdi-facebook', 'mdi-instagram'],
  }),
};
</script>

<style>
.my-red {
  background: #fb050d;
}
</style>
