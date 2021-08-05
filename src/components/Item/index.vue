<template>
  <div>
    <v-container class="my-5">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card>
            <v-img
              :src="item.photo"
              aspect-ratio="1"
              class="grey lighten-2"
            ></v-img>
          </v-card>
          <div class="mt-5">
            <h3>Descripcion</h3>
            {{ item.description }}
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <v-breadcrumbs class="pt-0" :items="items">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
          <h1 class="pl-6 text-h5">{{ item.name }}</h1>
          <p class="pl-6 text-h6">
            Precio:
            <span> ${{ item.price }} </span>
          </p>

          <div class="pl-4 mt-5 d-flex" v-if="getUser">
            <v-btn
              class="mx-2"
              fab
              dark
              x-small
              color="primary"
              @click="substract"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
            <v-text-field
              label="Cantidad"
              light
              dense
              v-model="item.quantity"
              hide-details="auto"
            ></v-text-field>
            <v-btn class="mx-2" fab dark x-small color="primary" @click="add">
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </div>
          <v-btn
            class="ml-6 mt-5 text-none"
            outlined
            rounded
            color="error"
            @click="addToCart"
            v-if="getUser"
          >
            Agregar al Carrito
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    item: {
      id: '',
      name: '',
      description: '',
      photo: '',
      price: '',
      quantity: 1,
    },
    items: [
      {
        text: 'Inicio',
        disabled: false,
        href: '/',
      },
      {
        text: 'Ceremonia del Te',
        disabled: false,
        href: 'busqueda',
      },
      {
        text: 'Set Ceremonia del Te',
        disabled: true,
        href: '',
      },
    ],
  }),
  computed: {
    ...mapGetters(['getUser', 'getItem']),
  },
  methods: {
    ...mapActions(['add_To_Cart']),
    add() {
      this.item.quantity >= 10 ? this.item.quantity : this.item.quantity++;
    },
    substract() {
      this.item.quantity <= 1 ? this.item.quantity : this.item.quantity--;
    },
    addToCart() {
      this.add_To_Cart(this.item);
    },
  },
  created() {
    // created
    const result = this.getItem(this.$route.params.id);
    this.item.id = result.id;
    this.item.name = result.name;
    this.item.description = result.description;
    this.item.photo = result.photo;
    this.item.price = result.price;
  },
};
</script>

<style scoped>
.v-input {
  max-width: 52px;
}
</style>
