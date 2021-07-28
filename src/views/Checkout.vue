<template>
  <v-container class="mt-5">
    <v-stepper v-model="step">
      <v-stepper-header flat>
        <v-stepper-step :complete="step > 1" step="1">
          Informacion de Contacto
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2"> Envio </v-stepper-step>

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
            @click="goStepTwo"
            class="text-none mr-3"
            outlined
            rounded
          >
            Continuar
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
            @click="backStepOne"
            class="text-none mr-3"
            outlined
            rounded
          >
            Volver
          </v-btn>

          <v-btn
            color="primary mr-3"
            @click="goStepThree"
            class="text-none mr-3"
            outlined
            rounded
          >
            Continuar
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
                  v-for="shiping in getShiping"
                  :key="shiping.id"
                  :label="shiping.text"
                  :value="shiping.price"
                ></v-radio>
              </v-radio-group>

              <v-btn
                color="primary mr-3"
                @click="backStepTwo"
                class="text-none mr-3"
                outlined
                rounded
              >
                Volver
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
import { required } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      step: 1,
      name: '',
      lastName: '',
      rut: '',
      phone: '',
      email: '',
      country: 'Chile',
      region: '',
      commune: '',
      zip: '',
      address: '',
      shipment: '',
    };
  },
  validations: {
    name: {
      required,
    },
    lastName: {
      required,
    },
    rut: {
      required,
    },
    phone: {
      required,
    },
    email: {
      required,
    },
    country: {
      required,
    },
    region: {
      required,
    },
    commune: {
      required,
    },
    zip: {
      required,
    },
    address: {
      required,
    },
    shipment: {
      required,
    },
    // discount: {
    //   required: requiredIf(function (model) {
    //     return model.haveDiscount;
    //   }),
    //   integer,
    //   minValue: (price) => price >= 0,
    // },
  },
  computed: {
    ...mapGetters(['getSubTotal', 'getRegions', 'getShiping']),
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
    goStepTwo() {
      this.step = 2;
    },
    goStepThree() {
      this.step = 3;
    },
    backStepOne() {
      this.step = 1;
    },
    backStepTwo() {
      this.step = 2;
    },
    async initBuy() {
      const { shipment } = this;
      window.location = `https://982eo.sse.codesandbox.io/webpay?monto=${shipment}&return_url=http://localhost:8080/`;
    },
  },
};
</script>

<style></style>
