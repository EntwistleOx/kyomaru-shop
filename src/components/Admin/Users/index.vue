<template>
  <v-container class="mt-5">
    <Menu />
    <v-data-table
      :headers="headers"
      :items="getUsers"
      :items-per-page="5"
      class="elevation-1"
      loading-text="Cargando..."
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
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
        text: 'Nombre',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Apellido',
        value: 'lastName',
      },
      {
        text: 'RUT',
        value: 'rut',
      },
      {
        text: 'Email',
        value: 'email',
      },
      {
        text: 'Fono',
        value: 'phone',
      },
    ],
  }),

  computed: {
    ...mapGetters(['getUsers']),
  },

  mounted() {
    this.initialize();
  },

  methods: {
    ...mapActions(['fetch_Users']),

    initialize() {
      this.fetch_Users();
    },
  },
};
</script>

<style></style>
