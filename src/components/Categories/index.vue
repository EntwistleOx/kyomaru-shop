<template>
  <div>
    <v-container>
      <v-subheader class="pl-0">Categorias</v-subheader>

      <v-row>
        <v-col
          v-for="category in getCategories"
          :key="category.id"
          class="d-flex child-flex"
          cols="12"
          sm="4"
          md="2"
        >
          <router-link :to="`/buscar?q=${category.name}`">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 16 : 2"
                :class="{ 'on-hover': hover }"
              >
                <v-img
                  :src="category.photo.url"
                  aspect-ratio="1"
                  gradient="to top right, rgba(165, 165, 165,.1), rgba(244,67,54,.3)"
                  dark
                  class="rounded"
                >
                  <v-card-title class="subtitle-2">{{
                    category.name
                  }}</v-card-title>
                </v-img>
              </v-card>
            </v-hover>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Categories",
  data: () => ({}),
  computed: {
    ...mapGetters(["getCategories"]),
  },
  methods: {},
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
