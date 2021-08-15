<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute class="hidden-md-and-up">
      <v-list nav dense>
        <v-list-item v-if="!getUser">
          <v-list-item-title>
            <v-btn text small rounded class="text-none" @click="openDialog(0)">
              Registrate
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!getUser">
          <v-list-item-title>
            <v-btn text small rounded class="text-none" @click="openDialog(1)">
              Iniciar Sesion
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="getUser">
          <v-list-item-content class="ml-3">
            <v-list-item-title>
              {{ name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="getUser">
          <v-list-item-title>
            <v-btn text small rounded class="text-none" @click="sign_Out">
              Salir
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="category in getCategories" :key="category.id">
            <v-list-item-title>
              <v-btn
                text
                small
                rounded
                class="text-none"
                :to="`/buscar?q=${category.name}`"
              >
                {{ category.name }}
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    group: null,
  }),
  methods: {
    ...mapActions(["show_Drawer", "show_Dialog", "sign_Out"]),

    openDialog(tabIndex) {
      this.show_Dialog({ state: true, tab: tabIndex });
    },
  },
  computed: {
    ...mapGetters(["getUser", "getDrawer", "getCategories"]),
    drawer: {
      get: function () {
        return this.getDrawer;
      },
      set: function (newValue) {
        this.show_Drawer(newValue);
      },
    },
    name() {
      return `${this.getUser.name} ${this.getUser.lastName}`;
    },
    email() {
      return this.getUser.email;
    },
  },
};
</script>

<style>
.v-navigation-drawer {
  top: 57px !important;
}
</style>
