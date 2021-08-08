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
              <v-text-field
                label="Nombre*"
                v-model="name"
                :error-messages="nameErrors"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Apellido*"
                v-model="lastName"
                :error-messages="lastNameErrors"
                required
                @input="$v.lastName.$touch()"
                @blur="$v.lastName.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="RUT*"
                v-model="rut"
                :error-messages="rutErrors"
                required
                @input="$v.rut.$touch()"
                @blur="$v.rut.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                prepend-inner-icon="mdi-plus"
                placeholder="56911112222"
                label="Telefono*"
                v-model="phone"
                :error-messages="phoneErrors"
                required
                @input="$v.phone.$touch()"
                @blur="$v.phone.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email*"
                v-model="email"
                :error-messages="emailErrors"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn
            color="primary"
            @click="goNextStep"
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
                readonly
                label="Pais*"
                v-model="country"
                :error-messages="countryErrors"
                required
                @input="$v.country.$touch()"
                @blur="$v.country.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="regions"
                label="Region*"
                v-model="region"
                :error-messages="regionErrors"
                required
                @input="$v.region.$touch()"
                @blur="$v.region.$touch()"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="communes"
                :disabled="$v.region.$invalid ? true : false"
                label="Comuna*"
                v-model="commune"
                :error-messages="communeErrors"
                required
                @input="$v.commune.$touch()"
                @blur="$v.commune.$touch()"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Codigo postal*"
                v-model="zip"
                :error-messages="zipErrors"
                required
                @input="$v.zip.$touch()"
                @blur="$v.zip.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Direccion*"
                v-model="address"
                :error-messages="addressErrors"
                required
                @input="$v.address.$touch()"
                @blur="$v.address.$touch()"
              ></v-text-field>
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
            @click="goNextStep"
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
              <v-radio-group
                mandatory
                v-model="shipment"
                :error-messages="shipmentErrors"
                required
                @input="$v.shipment.$touch()"
                @blur="$v.shipment.$touch()"
              >
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
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
} from "vuelidate/lib/validators";
import { validate } from "rut.js";

const validateRut = (value) => validate(value);

export default {
  data() {
    return {
      step: 1,
      name: "",
      lastName: "",
      rut: "",
      phone: "",
      email: "",
      country: "Chile",
      region: "",
      commune: "",
      zip: "",
      address: "",
      shipment: "",
    };
  },
  mixins: [validationMixin],
  validations: {
    name: {
      required,
    },
    lastName: {
      required,
    },
    rut: {
      required,
      validateRut,
    },
    phone: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11),
      numeric,
    },
    email: {
      required,
      email,
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
  },
  computed: {
    ...mapGetters([
      "getUser",
      "getCart",
      "getSubTotal",
      "getRegions",
      "getShiping",
    ]),
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
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("El Nombre es requerido.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("El Apellido es requerido.");
      return errors;
    },
    rutErrors() {
      const errors = [];
      if (!this.$v.rut.$dirty) return errors;
      !this.$v.rut.required && errors.push("El RUT es requerido.");
      !this.$v.rut.validateRut && errors.push("El RUT es invalido.");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.required && errors.push("El Telefono es requerido.");
      !this.$v.phone.numeric &&
        errors.push("El Telefono debe ser de valor numerico.");
      !this.$v.phone.minLength &&
        errors.push("El largo minimo del Telefono es 11 caracteres.");
      !this.$v.phone.maxLength &&
        errors.push("El largo maximo del Telefono es 11 caracteres.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("El Email es requerido.");
      !this.$v.email.email && errors.push("El Email es invalido.");
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.country.$dirty) return errors;
      !this.$v.country.required && errors.push("El Pais es requerido.");
      return errors;
    },
    regionErrors() {
      const errors = [];
      if (!this.$v.region.$dirty) return errors;
      !this.$v.region.required && errors.push("La Region es requerida.");
      return errors;
    },
    communeErrors() {
      const errors = [];
      if (!this.$v.commune.$dirty) return errors;
      !this.$v.commune.required && errors.push("La Comuna es requerida.");
      return errors;
    },
    zipErrors() {
      const errors = [];
      if (!this.$v.zip.$dirty) return errors;
      !this.$v.zip.required && errors.push("El Codigo postal es requerido.");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.required && errors.push("La Direccion es requerida.");
      return errors;
    },
    shipmentErrors() {
      const errors = [];
      if (!this.$v.shipment.$dirty) return errors;
      !this.$v.shipment.required && errors.push("El Envio es requerido.");
      return errors;
    },
  },
  mounted() {
    this.setCheckoutData();
  },
  methods: {
    ...mapActions(["save_Cart"]),
    setCheckoutData() {
      this.name = this.getUser.name;
      this.lastName = this.getUser.lastName;
      this.rut = this.getUser.rut;
      this.phone = this.getUser.phone;
      this.email = this.getUser.email;
    },
    goNextStep() {
      const { step } = this;
      if (step === 1) {
        if (
          this.$v.name.$invalid ||
          this.$v.lastName.$invalid ||
          this.$v.rut.$invalid ||
          this.$v.phone.$invalid ||
          this.$v.email.$invalid
        ) {
          this.$v.name.$touch();
          this.$v.lastName.$touch();
          this.$v.rut.$touch();
          this.$v.phone.$touch();
          this.$v.email.$touch();
          return false;
        } else {
          return (this.step = 2);
        }
      } else if (step === 2) {
        if (
          this.$v.country.$invalid ||
          this.$v.region.$invalid ||
          this.$v.commune.$invalid ||
          this.$v.zip.$invalid ||
          this.$v.address.$invalid
        ) {
          this.$v.country.$touch();
          this.$v.region.$touch();
          this.$v.commune.$touch();
          this.$v.zip.$touch();
          this.$v.address.$touch();
          return false;
        } else {
          return (this.step = 3);
        }
      }
    },
    backStepOne() {
      this.step = 1;
    },
    backStepTwo() {
      this.step = 2;
    },
    async initBuy() {
      const address = {
        country: this.country,
        region: this.region,
        commune: this.commune,
        zip: this.zip,
        address: this.address,
        shipment: this.shipment,
      };
      const totals = {
        subtotal: this.getSubTotal,
        shipment: +this.shipment,
        total: this.finalTotal,
      };
      this.save_Cart({ address, totals });
    },
  },
};
</script>

<style></style>
