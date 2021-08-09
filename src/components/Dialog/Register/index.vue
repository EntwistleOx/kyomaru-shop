<template>
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
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
  sameAs,
} from "vuelidate/lib/validators";
import { validate } from "rut.js";

const validateRut = (value) => validate(value);

export default {
  name: "Dialog",
  data: () => ({
    name: "",
    lastName: "",
    rut: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      sameAs: sameAs("password"),
    },
  },
  methods: {
    ...mapActions(["register"]),
    submit() {
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
      }
    },
  },
  computed: {
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
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("El Password es requerido.");
      !this.$v.password.minLength &&
        errors.push("El largo minimo del Password es 6 caracteres.");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required &&
        errors.push("El campo es requerido.");
      !this.$v.confirmPassword.sameAs &&
        errors.push("Debe coincidir con el campo Password.");
      return errors;
    },
  },
};
</script>

<style></style>
