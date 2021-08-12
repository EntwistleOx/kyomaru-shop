<template>
  <div>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <router-link :to="`/producto/${product.id}`">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
              <v-chip
                class="ma-2"
                color="red"
                text-color="white"
                v-if="product.stock === 0"
              >
                Agotado
              </v-chip>
              <v-img :src="product.photo.url" height="300px"></v-img>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-text>
                <div class="text-subtitle-1">
                  <strong> ${{ formatPrice(product.price) }} </strong>
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { formatCurrency } from "@/utils";

export default {
  name: "Product",
  props: ["products"],
  data: () => ({}),
  methods: {
    formatPrice(number) {
      return formatCurrency(number);
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.v-card {
  position: relative;
}

.v-chip {
  position: absolute;
  z-index: 1;
}
</style>
