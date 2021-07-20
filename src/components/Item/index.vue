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
          <p class="pl-6 text-h6">$147.100</p>
          <div class="pl-2">
            <v-subheader class="mb-2">Cantidad:</v-subheader>
            <v-slider
              class="pl-2"
              v-model="slider"
              :thumb-size="18"
              :max="10"
              :min="1"
              thumb-label="always"
              step="1"
              ticks="always"
            ></v-slider>
          </div>
          <v-btn class="ml-6" outlined color="red"> Agregar al Carrito </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    slider: 1,
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

<style></style>
