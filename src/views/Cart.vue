<template>
  <v-container class="mt-4">
    <v-col v-for="item in getCart" :key="item.id" cols="12" class="py-1 px-0">
      <v-card>
        <div class="d-flex">
          <v-avatar class="ma-3" size="125" tile>
            <v-img :src="item.photo"></v-img>
          </v-avatar>
          <div>
            <v-card-title class="text-h6">
              {{ item.name }}
            </v-card-title>

            <v-card-subtitle class="text-subtitle-1"
              >Precio:
              <strong> ${{ item.price }} </strong>
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                class="mx-2"
                fab
                dark
                x-small
                color="primary"
                @click="substract(item.id)"
              >
                <v-icon dark small> mdi-minus </v-icon>
              </v-btn>
              <v-text-field
                label="Cantidad"
                readonly
                light
                dense
                v-model="item.quantity"
                hide-details="auto"
              ></v-text-field>
              <v-btn
                class="mx-2"
                fab
                dark
                x-small
                color="primary"
                @click="add(item.id)"
              >
                <v-icon dark small> mdi-plus </v-icon>
              </v-btn>
            </v-card-actions>
          </div>
          <div class="ma-3 ml-auto">
            <v-btn fab dark x-small color="error" @click="deleteItem(item.id)">
              <v-icon dark> mdi-close </v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" class="py-1 px-0">
      <v-alert
        border="left"
        colored-border
        color="deep-purple accent-4"
        elevation="2"
      >
        <v-row align="center" v-if="getCart.length > 0">
          <v-col class="grow">
            <div class="text-h6">Sub Total: ${{ getSubTotal }}</div>
            <div>
              En la pantalla de pagos se incluye el impuesto y se calculan los
              gastos de envío.
            </div>
          </v-col>
          <v-col class="shrink">
            <v-btn color="info" class="text-none" outlined rounded to="checkout"
              >Pagar</v-btn
            >
          </v-col>
        </v-row>
        <v-row align="center" v-else>
          <v-col class="grow">
            <div>El carrito esta vacio.</div>
          </v-col>
        </v-row>
      </v-alert>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Cart",
  data: () => ({}),
  computed: {
    ...mapGetters(["getCart", "getSubTotal"]),
  },
  methods: {
    ...mapActions([
      "add_Item_Quantity",
      "substract_Item_Quantity",
      "delete_Item_From_Cart",
    ]),
    add(id) {
      this.add_Item_Quantity(id);
    },
    substract(id) {
      this.substract_Item_Quantity(id);
    },
    deleteItem(id) {
      this.delete_Item_From_Cart(id);
    },
  },
};
</script>

<style scoped>
.v-input {
  max-width: 52px;
}
</style>
