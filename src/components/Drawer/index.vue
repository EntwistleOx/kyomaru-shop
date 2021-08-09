<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute class="hidden-md-and-up">
      <v-list nav dense>
        <v-list-item>
          <v-list-item-title>
            <v-btn text small rounded class="text-none" @click="openDialog(0)">
              Registrate
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-btn text small rounded class="text-none" @click="openDialog(1)">
              Iniciar Sesion
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Abanicos
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Ceremonia del Te
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Colgantes & Llaveros
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Daruma
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Furin
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Zodiaco Oriental
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Incienso
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Lucky Cat
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Omamori
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Papeleria
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Poleras
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Tazas
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text small rounded class="text-none" to="busqueda">
                Contacto
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    group: null,
  }),
  methods: {
    ...mapActions(['show_Drawer', 'show_Dialog']),

    openDialog(tabIndex) {
      this.show_Dialog({ state: true, tab: tabIndex });
    },
  },
  computed: {
    ...mapGetters(['getDrawer']),
    drawer: {
      get: function () {
        return this.getDrawer;
      },
      set: function (newValue) {
        this.show_Drawer(newValue);
      },
    },
  },
};
</script>

<style></style>
