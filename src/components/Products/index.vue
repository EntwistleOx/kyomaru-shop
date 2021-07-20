<template>
  <div>
    <v-container>
      <v-subheader class="pl-0">Productos</v-subheader>

      <v-row>
        <v-spacer></v-spacer>
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
        >
          <router-link to="/producto-sampler">
            <v-card>
              <v-img :src="product.photo" height="300px"></v-img>

              <v-card-title>{{ product.name }}</v-card-title>

              <v-card-text class="mb-0">
                <v-row align="center" class="mx-0">
                  <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                </v-row>

                <div class="mt-4 text-subtitle-1">${{ product.price }}</div>
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data: () => ({
    products: [
      {
        id: 1,
        name: 'Set Ceremonia del te',
        price: 147100,
        photo: 'sampler.jpg',
        description:
          'El set incluye:\
          Bandeja de la escuela URASENKE circular, material Lacado\
          Batidor CHASEN\
          Cucharita medidor CHASHAKU\
          Envase para guardar el té NATSUME\
          Bowl para tomar té Matcha CHAWAN Tradicional\
          Corte de tela para limpiar los implementos CHAKIN\
          Bolsa de Té Matcha 20gr. calidad premium\
          Incienso Shoyeido Xiang Do de 20 Palitos con base portainciensos\
          EL CHAWAN y EL TE de la foto son REFERENCIALES ya que dependemos del STOCK en el momento de la compra. \
          Al realizar su pedido le enviaremos fotos de ambos productos en stock para tener su aprobación.',
      },
      {
        id: 2,
        name: 'Set Ceremonia del te',
        price: 147100,
        photo: 'sampler.jpg',
        description:
          'El set incluye:\
          Bandeja de la escuela URASENKE circular, material Lacado\
          Batidor CHASEN\
          Cucharita medidor CHASHAKU\
          Envase para guardar el té NATSUME\
          Bowl para tomar té Matcha CHAWAN Tradicional\
          Corte de tela para limpiar los implementos CHAKIN\
          Bolsa de Té Matcha 20gr. calidad premium\
          Incienso Shoyeido Xiang Do de 20 Palitos con base portainciensos\
          EL CHAWAN y EL TE de la foto son REFERENCIALES ya que dependemos del STOCK en el momento de la compra. \
          Al realizar su pedido le enviaremos fotos de ambos productos en stock para tener su aprobación.',
      },
      {
        id: 3,
        name: 'Set Ceremonia del te',
        price: 147100,
        photo: 'sampler.jpg',
        description:
          'El set incluye:\
          Bandeja de la escuela URASENKE circular, material Lacado\
          Batidor CHASEN\
          Cucharita medidor CHASHAKU\
          Envase para guardar el té NATSUME\
          Bowl para tomar té Matcha CHAWAN Tradicional\
          Corte de tela para limpiar los implementos CHAKIN\
          Bolsa de Té Matcha 20gr. calidad premium\
          Incienso Shoyeido Xiang Do de 20 Palitos con base portainciensos\
          EL CHAWAN y EL TE de la foto son REFERENCIALES ya que dependemos del STOCK en el momento de la compra. \
          Al realizar su pedido le enviaremos fotos de ambos productos en stock para tener su aprobación.',
      },
      {
        id: 4,
        name: 'Set Ceremonia del te',
        price: 147100,
        photo: 'sampler.jpg',
        description:
          'El set incluye:\
          Bandeja de la escuela URASENKE circular, material Lacado\
          Batidor CHASEN\
          Cucharita medidor CHASHAKU\
          Envase para guardar el té NATSUME\
          Bowl para tomar té Matcha CHAWAN Tradicional\
          Corte de tela para limpiar los implementos CHAKIN\
          Bolsa de Té Matcha 20gr. calidad premium\
          Incienso Shoyeido Xiang Do de 20 Palitos con base portainciensos\
          EL CHAWAN y EL TE de la foto son REFERENCIALES ya que dependemos del STOCK en el momento de la compra. \
          Al realizar su pedido le enviaremos fotos de ambos productos en stock para tener su aprobación.',
      },
      {
        id: 5,
        name: 'Set Ceremonia del te',
        price: 147100,
        photo: 'sampler.jpg',
        description:
          'El set incluye:\
          Bandeja de la escuela URASENKE circular, material Lacado\
          Batidor CHASEN\
          Cucharita medidor CHASHAKU\
          Envase para guardar el té NATSUME\
          Bowl para tomar té Matcha CHAWAN Tradicional\
          Corte de tela para limpiar los implementos CHAKIN\
          Bolsa de Té Matcha 20gr. calidad premium\
          Incienso Shoyeido Xiang Do de 20 Palitos con base portainciensos\
          EL CHAWAN y EL TE de la foto son REFERENCIALES ya que dependemos del STOCK en el momento de la compra. \
          Al realizar su pedido le enviaremos fotos de ambos productos en stock para tener su aprobación.',
      },
      {
        id: 6,
        name: 'Set Ceremonia del te',
        price: 147100,
        photo: 'sampler.jpg',
        description:
          'El set incluye:\
          Bandeja de la escuela URASENKE circular, material Lacado\
          Batidor CHASEN\
          Cucharita medidor CHASHAKU\
          Envase para guardar el té NATSUME\
          Bowl para tomar té Matcha CHAWAN Tradicional\
          Corte de tela para limpiar los implementos CHAKIN\
          Bolsa de Té Matcha 20gr. calidad premium\
          Incienso Shoyeido Xiang Do de 20 Palitos con base portainciensos\
          EL CHAWAN y EL TE de la foto son REFERENCIALES ya que dependemos del STOCK en el momento de la compra. \
          Al realizar su pedido le enviaremos fotos de ambos productos en stock para tener su aprobación.',
      },
      {
        id: 7,
        name: 'Set Ceremonia del te',
        price: 147100,
        photo: 'sampler.jpg',
        description:
          'El set incluye:\
          Bandeja de la escuela URASENKE circular, material Lacado\
          Batidor CHASEN\
          Cucharita medidor CHASHAKU\
          Envase para guardar el té NATSUME\
          Bowl para tomar té Matcha CHAWAN Tradicional\
          Corte de tela para limpiar los implementos CHAKIN\
          Bolsa de Té Matcha 20gr. calidad premium\
          Incienso Shoyeido Xiang Do de 20 Palitos con base portainciensos\
          EL CHAWAN y EL TE de la foto son REFERENCIALES ya que dependemos del STOCK en el momento de la compra. \
          Al realizar su pedido le enviaremos fotos de ambos productos en stock para tener su aprobación.',
      },
      {
        id: 8,
        name: 'Set Ceremonia del te',
        price: 147100,
        photo: 'sampler.jpg',
        description:
          'El set incluye:\
          Bandeja de la escuela URASENKE circular, material Lacado\
          Batidor CHASEN\
          Cucharita medidor CHASHAKU\
          Envase para guardar el té NATSUME\
          Bowl para tomar té Matcha CHAWAN Tradicional\
          Corte de tela para limpiar los implementos CHAKIN\
          Bolsa de Té Matcha 20gr. calidad premium\
          Incienso Shoyeido Xiang Do de 20 Palitos con base portainciensos\
          EL CHAWAN y EL TE de la foto son REFERENCIALES ya que dependemos del STOCK en el momento de la compra. \
          Al realizar su pedido le enviaremos fotos de ambos productos en stock para tener su aprobación.',
      },
      {
        id: 9,
        name: 'Set Ceremonia del te',
        price: 147100,
        photo: 'sampler.jpg',
        description:
          'El set incluye:\
          Bandeja de la escuela URASENKE circular, material Lacado\
          Batidor CHASEN\
          Cucharita medidor CHASHAKU\
          Envase para guardar el té NATSUME\
          Bowl para tomar té Matcha CHAWAN Tradicional\
          Corte de tela para limpiar los implementos CHAKIN\
          Bolsa de Té Matcha 20gr. calidad premium\
          Incienso Shoyeido Xiang Do de 20 Palitos con base portainciensos\
          EL CHAWAN y EL TE de la foto son REFERENCIALES ya que dependemos del STOCK en el momento de la compra. \
          Al realizar su pedido le enviaremos fotos de ambos productos en stock para tener su aprobación.',
      },
      {
        id: 10,
        name: 'Set Ceremonia del te',
        price: 147100,
        photo: 'sampler.jpg',
        description:
          'El set incluye:\
          Bandeja de la escuela URASENKE circular, material Lacado\
          Batidor CHASEN\
          Cucharita medidor CHASHAKU\
          Envase para guardar el té NATSUME\
          Bowl para tomar té Matcha CHAWAN Tradicional\
          Corte de tela para limpiar los implementos CHAKIN\
          Bolsa de Té Matcha 20gr. calidad premium\
          Incienso Shoyeido Xiang Do de 20 Palitos con base portainciensos\
          EL CHAWAN y EL TE de la foto son REFERENCIALES ya que dependemos del STOCK en el momento de la compra. \
          Al realizar su pedido le enviaremos fotos de ambos productos en stock para tener su aprobación.',
      },
      {
        id: 11,
        name: 'Set Ceremonia del te',
        price: 147100,
        photo: 'sampler.jpg',
        description:
          'El set incluye:\
          Bandeja de la escuela URASENKE circular, material Lacado\
          Batidor CHASEN\
          Cucharita medidor CHASHAKU\
          Envase para guardar el té NATSUME\
          Bowl para tomar té Matcha CHAWAN Tradicional\
          Corte de tela para limpiar los implementos CHAKIN\
          Bolsa de Té Matcha 20gr. calidad premium\
          Incienso Shoyeido Xiang Do de 20 Palitos con base portainciensos\
          EL CHAWAN y EL TE de la foto son REFERENCIALES ya que dependemos del STOCK en el momento de la compra. \
          Al realizar su pedido le enviaremos fotos de ambos productos en stock para tener su aprobación.',
      },
      {
        id: 12,
        name: 'Set Ceremonia del te',
        price: 147100,
        photo: 'sampler.jpg',
        description:
          'El set incluye:\
          Bandeja de la escuela URASENKE circular, material Lacado\
          Batidor CHASEN\
          Cucharita medidor CHASHAKU\
          Envase para guardar el té NATSUME\
          Bowl para tomar té Matcha CHAWAN Tradicional\
          Corte de tela para limpiar los implementos CHAKIN\
          Bolsa de Té Matcha 20gr. calidad premium\
          Incienso Shoyeido Xiang Do de 20 Palitos con base portainciensos\
          EL CHAWAN y EL TE de la foto son REFERENCIALES ya que dependemos del STOCK en el momento de la compra. \
          Al realizar su pedido le enviaremos fotos de ambos productos en stock para tener su aprobación.',
      },
    ],
  }),
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
