<template>
  <v-container class="mt-5">
    <v-stepper v-model="e1">
      <v-stepper-header flat>
        <v-stepper-step :complete="e1 > 1" step="1">
          Informacion de Contacto
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"> Envio </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Pago </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Nombre*" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Apellido*" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="RUT*" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Telefono*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Email*" required></v-text-field>
            </v-col>
          </v-row>

          <v-btn
            color="primary"
            @click="e1 = 2"
            class="text-none mr-3"
            outlined
            rounded
          >
            Continuar
          </v-btn>

          <v-btn text color="error" class="text-none" outlined rounded>
            Cancelar
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Pais*"
                required
                v-model="country"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="regions"
                v-model="region"
                label="Region*"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select :items="communes" label="Comuna*"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Codigo postal*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Direccion*" required></v-text-field>
            </v-col>
          </v-row>

          <v-btn
            color="primary mr-3"
            @click="e1 = 3"
            class="text-none mr-3"
            outlined
            rounded
          >
            Continuar
          </v-btn>

          <v-btn text color="error" class="text-none" outlined rounded>
            Cancelar
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-row>
            <v-col cols="12" md="6">
              <v-radio-group mandatory v-model="shipment">
                <template v-slot:label>
                  <div><strong>Valor del Envio</strong></div>
                </template>
                <v-radio
                  label="Caja hasta 1,8kg, Envío Standard - 7 a 20 días / $36.700"
                  value="36700"
                ></v-radio>
                <v-radio
                  label="Caja hasta 3kg, Envío Standard - 7 a 20 días / $49.900"
                  value="49900"
                ></v-radio>
                <v-radio
                  label="	Caja hasta 10kg, Envío Standard - 7 a 20 días / $76.500"
                  value="76500"
                ></v-radio>
              </v-radio-group>

              <v-btn
                color="primary mr-3"
                @click="e1 = 1"
                class="text-none mr-3"
                outlined
                rounded
              >
                Continuar
              </v-btn>

              <v-btn text color="error" class="text-none" outlined rounded>
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="mb-1" color="lime lighten-5">
                <v-card-text>
                  <div>
                    <strong> Resumen del Pedido </strong>
                  </div>

                  <v-divider class="my-5"></v-divider>

                  <v-row>
                    <v-col cols="6"> Subtotal </v-col>
                    <v-col cols="6"> ${{ getSubTotal }} </v-col>
                    <v-col cols="6"> Envio </v-col>
                    <v-col cols="6"> ${{ shipment }} </v-col>
                  </v-row>

                  <v-divider class="my-5"></v-divider>

                  <v-row>
                    <v-col cols="6">
                      <strong class="text-h6"> Total </strong>
                    </v-col>
                    <v-col cols="6">
                      <strong class="text-h6"> ${{ finalTotal }} </strong>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="success "
                    @click="initBuy"
                    class="text-none"
                    rounded
                    block
                  >
                    Pagar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      e1: 1,
      shipment: 0,
      country: 'Chile',
      region: '',
    };
  },
  computed: {
    ...mapGetters(['getSubTotal', 'getRegions']),
    finalTotal() {
      return this.getSubTotal + +this.shipment;
    },
    regions() {
      const search = this.getRegions.map((item) => item.region);
      return search;
    },
    communes() {
      const search = this.getRegions
        .filter((item) => item.region === this.region)
        .map((item) => item.comunas)[0];
      return search;
    },
  },

  methods: {
    async initBuy() {
      const { shipment } = this;
      window.location = `https://982eo.sse.codesandbox.io/webpay?monto=${shipment}&return_url=http://localhost:8080/`;
    },
  },
};
</script>

<style></style>
