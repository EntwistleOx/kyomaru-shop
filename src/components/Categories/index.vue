<template>
  <div>
    <v-container>
      <v-subheader class="pl-0">Categorias</v-subheader>

      <v-row>
        <v-col
          v-for="category in categories"
          :key="category.id"
          class="d-flex child-flex"
          cols="12"
          sm="4"
          md="2"
        >
          <router-link to="/categoria-sampler">
            <v-img
              :src="category.photo"
              aspect-ratio="1"
              gradient="to top right, rgba(165, 165, 165,.1), rgba(244,67,54,.3)"
              dark
            >
              <v-card-title class="subtitle-2">{{
                category.name
              }}</v-card-title>
            </v-img>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  data: () => ({
    categories: [
      {
        id: 1,
        name: 'Abanicos',
        photo: 'categoria-abanicos.jpg',
      },
      {
        id: 2,
        name: 'Ceremonia del Te',
        photo: 'categoria-ceremoniadelte.jpg',
      },
      {
        id: 3,
        name: 'Colgantes & Llaveros',
        photo: 'categoria-colgantes.jpg',
      },
      {
        id: 4,
        name: 'Daruma',
        photo: 'categoria-daruma.jpg',
      },
      {
        id: 5,
        name: 'Furin',
        photo: 'categoria-furin.jpg',
      },
      {
        id: 6,
        name: 'Zodiaco Oriental',
        photo: 'categoria-zodiaco.jpg',
      },
      {
        id: 7,
        name: 'Incienso',
        photo: 'categoria-incienso.jpg',
      },
      {
        id: 8,
        name: 'Lucky Cat',
        photo: 'categoria-luckycat.jpg',
      },
      {
        id: 9,
        name: 'Omamori',
        photo: 'categoria-omamori.jpg',
      },
      {
        id: 10,
        name: 'Papeleria',
        photo: 'categoria-papeleria.jpg',
      },
      {
        id: 11,
        name: 'Poleras',
        photo: 'categoria-poleras.jpg',
      },
      {
        id: 12,
        name: 'Tazas',
        photo: 'categoria-tazas.jpg',
      },
    ],
  }),
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.v-card__title {
  text-shadow: 3px 3px 5px black;
}
</style>
