<template>
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
</template>

<script>
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'Dialog',
  data: () => ({
    email: '',
    password: '',
  }),
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions(['sign_In']),
    submit() {
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
      }
    },
  },
  computed: {
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
      return errors;
    },
  },
};
</script>

<style></style>
