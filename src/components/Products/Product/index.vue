<template>
  <div>
    <v-row>
      <v-spacer></v-spacer>
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
              <v-img :src="product.photo" height="300px"></v-img>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-text>
                <div class="text-subtitle-1">
                  <strong> ${{ product.price }} </strong>
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
export default {
  name: "Product",
  props: ["products"],
  data: () => ({}),
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
