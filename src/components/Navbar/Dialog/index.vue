<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        small
        rounded
        class="text-none hidden-sm-and-down"
        v-bind="attrs"
        v-on="on"
        @click="setTab(1)"
      >
        Iniciar Sesion
      </v-btn>
      <v-btn
        text
        small
        rounded
        class="text-none hidden-sm-and-down"
        v-bind="attrs"
        v-on="on"
        @click="setTab(0)"
      >
        Registrate
      </v-btn>
    </template>
    <v-card>
      <v-tabs v-model="tab" grow>
        <v-tab v-for="item in items" :key="item">
          <span class="text-none">
            {{ item }}
          </span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card-text>
            <v-container>
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
                <v-col cols="12">
                  <v-text-field
                    type="password"
                    label="Contraseña*"
                    v-model="password"
                    :error-messages="passwordErrors"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    type="password"
                    label="Confirmar Contraseña*"
                    v-model="confirmPassword"
                    :error-messages="confirmPasswordErrors"
                    required
                    @input="$v.confirmPassword.$touch()"
                    @blur="$v.confirmPassword.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-tab-item>
        <v-tab-item>
          <v-card-text>
            <v-container>
              <v-row>
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
                <v-col cols="12">
                  <v-text-field
                    type="password"
                    label="Contraseña*"
                    v-model="password"
                    :error-messages="passwordErrors"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
      <v-card-actions>
        <v-btn
          text
          color="blue darken-1"
          @click="submit"
          class="text-none"
          outlined
          rounded
        >
          Enviar
        </v-btn>

        <v-btn
          text
          color="blue darken-1"
          @click="dialog = false"
          class="text-none"
          outlined
          rounded
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
  sameAs,
} from 'vuelidate/lib/validators';
import { validate } from 'rut.js';

const validateRut = (value) => validate(value);

export default {
  name: 'Dialog',
  data: () => ({
    dialog: false,
    tab: null,
    items: ['Registrate', 'Iniciar Sesion'],
    name: '',
    lastName: '',
    rut: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  }),
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
    password: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      required,
      sameAs: sameAs('password'),
    },
  },
  methods: {
    ...mapActions(['register', 'sign_In']),
    setTab(value) {
      this.tab = value;
    },
    submit() {
      if (this.tab === 0) {
        if (
          this.$v.name.$invalid ||
          this.$v.lastName.$invalid ||
          this.$v.rut.$invalid ||
          this.$v.phone.$invalid ||
          this.$v.email.$invalid ||
          this.$v.password.$invalid ||
          this.$v.confirmPassword.$invalid
        ) {
          this.$v.name.$touch();
          this.$v.lastName.$touch();
          this.$v.rut.$touch();
          this.$v.phone.$touch();
          this.$v.email.$touch();
          this.$v.password.$touch();
          this.$v.confirmPassword.$touch();
          return false;
        } else {
          const formData = {
            name: this.name,
            lastName: this.lastName,
            rut: this.rut,
            phone: this.phone,
            email: this.email,
            password: this.password,
          };
          this.register(formData);
          this.dialog = false;
        }
      } else if (this.tab === 1) {
        if (this.$v.email.$invalid || this.$v.password.$invalid) {
          this.$v.email.$touch();
          this.$v.password.$touch();
          return false;
        } else {
          const formData = {
            email: this.email,
            password: this.password,
          };
          this.sign_In(formData);
          this.dialog = false;
        }
      }
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push('El Nombre es requerido.');
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push('El Apellido es requerido.');
      return errors;
    },
    rutErrors() {
      const errors = [];
      if (!this.$v.rut.$dirty) return errors;
      !this.$v.rut.required && errors.push('El RUT es requerido.');
      !this.$v.rut.validateRut && errors.push('El RUT es invalido.');
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.required && errors.push('El Telefono es requerido.');
      !this.$v.phone.numeric &&
        errors.push('El Telefono debe ser de valor numerico.');
      !this.$v.phone.minLength &&
        errors.push('El largo minimo del Telefono es 11 caracteres.');
      !this.$v.phone.maxLength &&
        errors.push('El largo maximo del Telefono es 11 caracteres.');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('El Email es requerido.');
      !this.$v.email.email && errors.push('El Email es invalido.');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('El Password es requerido.');
      !this.$v.password.minLength &&
        errors.push('El largo minimo del Password es 6 caracteres.');
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required &&
        errors.push('El campo es requerido.');
      !this.$v.confirmPassword.sameAs &&
        errors.push('Debe coincidir con el campo Password.');
      return errors;
    },
  },
};
</script>

<style></style>
