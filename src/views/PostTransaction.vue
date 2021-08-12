<template>
  <v-container class="mt-5 container">
    <div class="d-flex align-center">
      <v-icon x-large color="success" class="mr-3">
        mdi-checkbox-marked-circle
      </v-icon>
      <div>
        <h1 class="grey--text text--darken-1 text-subtitle-2">
          Orden #{{ orderId }}
        </h1>
        <h2 class="text-h6">¡Gracias {{ getOrder.user.name }}!</h2>
      </div>
    </div>
    <v-card class="mt-5">
      <v-card-text>
        <h3 class="text-h6 text--primary mb-2">Tu orden esta confirmada</h3>
        <div>Recibiras un correo cuando tu orden este lista.</div>
      </v-card-text>
    </v-card>
    <v-card class="mt-5">
      <v-card-text>
        <h3 class="text-h6 text--primary mb-2">Informacion de la Orden</h3>

        <div class="d-flex justify-space-between">
          <div>
            <div>
              <div class="mb-1 text--primary font-weight-regular">
                Informacion de contacto
              </div>
              <div>{{ getOrder.user.email }}</div>
              <div>{{ getOrder.user.phone }}</div>
            </div>
            <div class="mt-3">
              <div class="mb-1 text--primary font-weight-regular">
                Informacion de despacho
              </div>
              <div>{{ `${getOrder.user.name} ${getOrder.user.lastName}` }}</div>
              <div>{{ getOrder.address.address }}</div>
              <div>{{ getOrder.address.zip }}</div>
              <div>
                {{ `${getOrder.address.commune} ${getOrder.address.region}` }}
              </div>
              <div>{{ getOrder.address.country }}</div>
            </div>
          </div>
          <div>
            <div class="mb-1 text--primary font-weight-regular">
              Resumen de la orden
            </div>

            <v-divider class="my-5"></v-divider>

            <v-row>
              <v-col cols="6"> Subtotal </v-col>
              <v-col cols="6">
                ${{ formatPrice(getOrder.totals.subtotal) }}
              </v-col>
              <v-col cols="6"> Envio </v-col>
              <v-col cols="6">
                ${{ formatPrice(getOrder.totals.shipment) }}
              </v-col>
            </v-row>

            <v-divider class="my-5"></v-divider>

            <v-row>
              <v-col cols="6">
                <strong class="text--primary"> Total </strong>
              </v-col>
              <v-col cols="6">
                <strong class="text--primary">
                  ${{ formatPrice(getOrder.totals.total) }}
                </strong>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-btn color="info" class="text-none mt-4" block to="/">
      Seguir comprando
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatCurrency } from "@/utils";

export default {
  name: "Product",
  props: ["userId", "orderId"],
  data() {
    return {};
  },
  mounted() {
    this.setData();
  },
  computed: {
    ...mapGetters(["getOrder"]),
  },
  methods: {
    ...mapActions(["get_Order"]),
    setData() {
      this.get_Order({ userId: this.userId, orderId: this.orderId });
    },
    formatPrice(number) {
      return formatCurrency(number);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
