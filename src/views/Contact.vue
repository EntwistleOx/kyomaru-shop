<template>
  <v-container class="mt-5">
    <v-row>
      <v-col cols="12" sm="6">
        <v-parallax src="contact.jpg"> </v-parallax>
      </v-col>
      <v-col cols="12" sm="6">
        <h1 class="text-h4 mb-4">Contacto</h1>
        <p class="text-subtitle-1 mb-5">
          Envía tus consultas o dudas. Recuerda que hacemos pedidos especiales.
          Si está en Japón, lo podemos buscar y enviar.
        </p>
        <p class="text-h5 mb-5" v-if="show">
          Mensaje enviado! te responderemos lo antes posible =)
        </p>
        <div v-if="!show">
          <v-text-field
            label="Nombre"
            rounded
            filled
            solo
            dense
            background-color="white"
            v-model="name"
            :error-messages="nameErrors"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            label="Email"
            rounded
            filled
            solo
            dense
            background-color="white"
            v-model="email"
            :error-messages="emailErrors"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            label="Fono"
            rounded
            filled
            solo
            dense
            background-color="white"
            v-model="phone"
            :error-messages="phoneErrors"
            required
            @input="$v.phone.$touch()"
            @blur="$v.phone.$touch()"
          ></v-text-field>
          <v-textarea
            label="Mensaje"
            shaped
            filled
            solo
            dense
            background-color="white"
            v-model="msg"
            :error-messages="msgErrors"
            required
            @input="$v.msg.$touch()"
            @blur="$v.msg.$touch()"
          ></v-textarea>
          <v-btn
            color="success"
            class="text-none"
            block
            rounded
            @click="sendMail"
          >
            Enviar
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
} from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      msg: '',
      show: false,
    };
  },
  mixins: [validationMixin],
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11),
      numeric,
    },
    msg: {
      required,
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push('El Nombre es requerido.');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('El Email es requerido.');
      !this.$v.email.email && errors.push('El Email es invalido.');
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
    msgErrors() {
      const errors = [];
      if (!this.$v.msg.$dirty) return errors;
      !this.$v.msg.required && errors.push('El Envio es requerido.');
      return errors;
    },
  },
  methods: {
    async sendMail() {
      if (
        this.$v.name.$invalid ||
        this.$v.email.$invalid ||
        this.$v.phone.$invalid ||
        this.$v.msg.$invalid
      ) {
        this.$v.name.$touch();
        this.$v.email.$touch();
        this.$v.phone.$touch();
        this.$v.msg.$touch();
        return false;
      } else {
        const body = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          msg: this.msg,
        };
        const result = await fetch('http://localhost:5000/api/v1/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        if (result.ok) {
          this.show = true;
        }
      }
    },
  },
};
</script>

<style></style>
