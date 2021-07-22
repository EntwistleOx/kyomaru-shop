<template>
  <div>
    <v-container class="my-5">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card>
            <v-img src="sampler.jpg" aspect-ratio="1" class="grey lighten-2">
            </v-img>
          </v-card>
          <div class="mt-5">
            <h3>Descripcion</h3>
            El set incluye: Bandeja de la escuela URASENKE circular, material
            Lacado Batidor CHASEN Cucharita medidor CHASHAKU Envase para guardar
            el té NATSUME Bowl para tomar té Matcha CHAWAN Tradicional Corte de
            tela para limpiar los implementos CHAKIN Bolsa de Té Matcha 20gr.
            calidad premium Incienso Shoyeido Xiang Do de 20 Palitos con base
            portainciensos
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <v-breadcrumbs class="pt-0" :items="items">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
          <h1 class="pl-6 text-h5">Set Ceremonia Del Te</h1>
          <p class="pl-6 text-h6">Precio: $147.100</p>
          <div class="pl-4 mt-5 d-flex">
            <v-btn class="mx-2" fab dark x-small color="primary">
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
            <v-text-field
              label="Cantidad"
              light
              dense
              v-model="qty"
              hide-details="auto"
            ></v-text-field>
            <v-btn class="mx-2" fab dark x-small color="primary">
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </div>
          <v-btn class="ml-6 mt-5 text-none" outlined rounded color="error">
            Agregar al Carrito
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    slider: 1,
    qty: 1,
    items: [
      {
        text: 'Inicio',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        text: 'Ceremonia del Te',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },
      {
        text: 'Set Ceremonia del Te',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
    ],
  }),
};
</script>

<style scoped>
.v-input {
  max-width: 52px;
}
</style>
