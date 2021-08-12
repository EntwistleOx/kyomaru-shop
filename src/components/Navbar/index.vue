<template>
  <div>
    <v-app-bar color="white">
      <router-link to="/">
        <div class="d-flex align-center">
          <v-img
            alt="kyomaru logo"
            class="shrink mr-2"
            contain
            src="../../assets/kyomaru-logo.webp"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="kyomaru nombre"
            class="shrink hidden-sm-and-down"
            contain
            min-width="100"
            src="../../assets/kyomaru-name.webp"
            width="120"
          />
        </div>
      </router-link>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="query"
        label="Buscar en KyoMaru"
        append-icon="mdi-magnify"
        class="mt-7 hidden-sm-and-down"
        solo
        dense
        rounded
        style="max-width: 277px"
        @keyup="search"
      ></v-text-field>

      <v-menu
        v-if="getUser"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="hidden-sm-and-down" v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar color="red">
                  <span class="white--text text-h5">{{ avatar }}</span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ email }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list v-if="!getUser.admin">
            <!-- <v-list-item>
              <v-list-item-title>Mi Cuenta</v-list-item-title>
            </v-list-item> -->
            <v-list-item to="/mi-cuenta/ordenes">
              <v-list-item-title>Ordenes</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-list v-if="getUser.admin">
            <v-list-item to="/admin/home">
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="sign_Out"> Salir </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-btn icon to="/carrito" v-if="getUser">
        <v-badge
          color="blue"
          :content="getTotalCountInCart"
          :value="getTotalCountInCart"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn text rounded class="hidden-md-and-up" @click="showDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-divider
        vertical
        class="hidden-sm-and-down mx-2"
        v-if="!getUser"
      ></v-divider>

      <v-btn
        text
        small
        rounded
        class="text-none hidden-sm-and-down"
        @click="openDialog(0)"
        v-if="!getUser"
      >
        Registrate
      </v-btn>
      <v-btn
        text
        small
        rounded
        class="text-none hidden-sm-and-down"
        @click="openDialog(1)"
        v-if="!getUser"
      >
        Iniciar Sesion
      </v-btn>

      <Dialog />
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Dialog from "@/components/Dialog";

export default {
  name: "Navbar",
  components: {
    Dialog,
  },
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    query: "",
  }),
  methods: {
    ...mapActions([
      "show_Dialog",
      "sign_Out",
      "show_Drawer",
      "filterForProducts",
    ]),
    openDialog(tabIndex) {
      this.show_Dialog({ state: true, tab: tabIndex });
    },
    search() {
      this.filterForProducts(this.query);
    },
    showDrawer() {
      this.show_Drawer(!this.getDrawer);
    },
  },
  computed: {
    ...mapGetters(["getUser", "getTotalCountInCart", "getDrawer"]),
    name() {
      return `${this.getUser.name} ${this.getUser.lastName}`;
    },
    email() {
      return this.getUser.email;
    },
    avatar() {
      return this.getUser.name
        ? `${this.getUser.name.split("")[0]}${
            this.getUser.lastName.split("")[0]
          }`
        : "";
    },
  },
};
</script>

<style></style>
