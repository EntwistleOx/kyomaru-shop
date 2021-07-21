<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute class="hidden-md-and-up">
      <v-list nav dense>
        <v-list-item>
          <v-list-item-title>
            <v-btn text small rounded class="text-none"> Registrate </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-btn text small rounded class="text-none"> Iniciar Sesion </v-btn>
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
export default {
  data: () => ({
    drawer: true,
    group: null,
  }),
};
</script>

<style></style>
