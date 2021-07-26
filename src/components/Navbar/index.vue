<template>
  <div>
    <v-app-bar color="white">
      <router-link to="/">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="../../assets/kyomaru-logo.webp"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Kyomaru Name"
            class="shrink hidden-sm-and-down"
            contain
            min-width="100"
            src="../../assets/kyomaru-name.webp"
            width="120"
          />
        </div>
      </router-link>

      <v-spacer></v-spacer>
      <v-btn icon to="busqueda" class="hidden-sm-and-down">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon class="hidden-sm-and-down" to="admin-login">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon to="carrito">
        <v-badge
          color="blue"
          :content="getTotalCountInCart"
          :value="getTotalCountInCart"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn text rounded class="hidden-md-and-up">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-divider vertical class="hidden-sm-and-down mx-2"></v-divider>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            small
            rounded
            class="text-none hidden-sm-and-down"
            v-bind="attrs"
            v-on="on"
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
            <!-- <v-tab-item v-for="item in items" :key="item"> </v-tab-item> -->
            <v-tab-item>
              <v-card-text>
                <v-container>
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
                    <v-col cols="12">
                      <v-text-field
                        label="Contraseña*"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Confirmar Contraseña*"
                        type="password"
                        required
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
                      <v-text-field label="Email*" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Contraseña*"
                        type="password"
                        required
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
              @click="dialog = false"
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
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Navbar',
  data: () => ({
    dialog: false,
    tab: null,
    items: ['Registrate', 'Iniciar Sesion'],
  }),
  computed: {
    ...mapGetters(['getTotalCountInCart']),
  },
};
</script>

<style></style>
