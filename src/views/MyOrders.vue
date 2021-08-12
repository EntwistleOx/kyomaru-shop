<template>
  <v-container class="mt-5">
    <v-data-table
      :headers="headers"
      :items="getMyOrders"
      :items-per-page="5"
      class="elevation-1"
      loading-text="Cargando..."
      show-expand
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mis Ordenes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-container>
            <v-card :key="item.id" class="mb-3">
              <v-card-text>
                <div class="text-subtitle-1 mb-4">#{{ item.id }}</div>
                <div class="d-flex justify-space-between">
                  <div>
                    <div class="mt-3">
                      <div class="mb-1 text--primary font-weight-regular">
                        Informacion de contacto
                      </div>
                      <div>{{ `${getUser.name} ${getUser.lastName}` }}</div>
                      <div>{{ getUser.rut }}</div>
                      <div>
                        {{ getUser.email }}
                      </div>
                      <div>{{ getUser.phone }}</div>
                    </div>
                  </div>
                  <div>
                    <div class="mt-3">
                      <div class="mb-1 text--primary font-weight-regular">
                        Informacion de despacho
                      </div>
                      <div>{{ item.address.address }}</div>
                      <div>{{ item.address.zip }}</div>
                      <div>
                        {{ `${item.address.commune} ${item.address.region}` }}
                      </div>
                      <div>{{ item.address.country }}</div>
                    </div>
                    <div class="mt-3">
                      <div class="mb-1 text--primary font-weight-regular">
                        Items
                      </div>
                      <div v-for="item in item.cart" :key="item.id">
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
                      <v-col cols="6"> ${{ item.totals.subtotal }} </v-col>
                      <v-col cols="6"> Envio </v-col>
                      <v-col cols="6"> ${{ item.totals.shipment }} </v-col>
                    </v-row>

                    <v-divider class="my-5"></v-divider>

                    <v-row>
                      <v-col cols="6">
                        <strong class="text--primary"> Total </strong>
                      </v-col>
                      <v-col cols="6">
                        <strong class="text--primary">
                          ${{ item.totals.total }}
                        </strong>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-container>
        </td>
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ getDateFormat(item.createdAt) }}
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Recargar </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MyOrdersView',
  data: () => ({
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {
        text: 'Fecha',
        value: 'createdAt',
      },
      {
        text: 'Total',
        value: 'totals.total',
      },
    ],
  }),

  computed: {
    ...mapGetters(['getMyOrders', 'getUser']),
  },

  methods: {
    getDateFormat(date) {
      return `${date.toDate().toDateString()} ${date
        .toDate()
        .toLocaleTimeString()}`;
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
