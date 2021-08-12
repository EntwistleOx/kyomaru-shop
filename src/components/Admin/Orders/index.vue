<template>
  <v-container class="mt-5">
    <Menu />
    <v-data-table
      :headers="headers"
      :items="getOrders"
      :items-per-page="5"
      class="elevation-1"
      loading-text="Cargando..."
      show-expand
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Ordenes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <!-- <template v-slot:expanded-item="{ headers, item: { orders } }">
        <td :colspan="headers.length">
          <v-container>
            <v-card v-for="order in orders" :key="order.id" class="mb-3">
              <v-card-text>
                <div class="text-subtitle-1 mb-4">
                  #{{ `${order.id} - ${paymentStatus(order)}` }}
                </div>
                <div class="d-flex justify-space-between">
                  <div>
                    <div class="mt-3">
                      <div class="mb-1 text--primary font-weight-regular">
                        Informacion de despacho
                      </div>
                      <div>{{ order.address.address }}</div>
                      <div>{{ order.address.zip }}</div>
                      <div>
                        {{ `${order.address.commune} ${order.address.region}` }}
                      </div>
                      <div>{{ order.address.country }}</div>
                    </div>
                    <div class="mt-3">
                      <div class="mb-1 text--primary font-weight-regular">
                        Items
                      </div>
                      <div v-for="item in order.cart" :key="item.id">
                        {{ `${item.quantity} ${item.name}` }}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="mb-1 text--primary font-weight-regular">
                      Resumen de la orden
                    </div>

                    <v-divider class="my-5"></v-divider>

                    <v-row>
                      <v-col cols="6"> Subtotal </v-col>
                      <v-col cols="6"> ${{ order.totals.subtotal }} </v-col>
                      <v-col cols="6"> Envio </v-col>
                      <v-col cols="6"> ${{ order.totals.shipment }} </v-col>
                    </v-row>

                    <v-divider class="my-5"></v-divider>

                    <v-row>
                      <v-col cols="6">
                        <strong class="text--primary"> Total </strong>
                      </v-col>
                      <v-col cols="6">
                        <strong class="text--primary">
                          ${{ order.totals.total }}
                        </strong>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-container>
        </td>
      </template> -->
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Recargar </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Menu from '@/components/Admin/Menu';

export default {
  components: {
    Menu,
  },
  data: () => ({
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
    ],
  }),

  computed: {
    ...mapGetters(['getOrders']),
  },

  mounted() {
    this.initialize();
  },

  methods: {
    ...mapActions(['fetch_Orders']),

    initialize() {
      this.fetch_Orders();
    },

    paymentStatus(order) {
      if (order.payment) {
        return 'Pago Autorizado';
      } else {
        return 'Pago No Autorizado';
      }
    },
  },
};
</script>

<style></style>
