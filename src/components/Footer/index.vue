<template>
  <v-footer dark padless>
    <v-card class="flex red" flat tile>
      <v-card-title>
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" sm="6">
              <img
                src="../../assets/kyomaru-footer.webp"
                width="200"
                class="mb-1"
              />
              <p class="body-1">
                Japon en tu casa. Hacemos pedidos especiales, si necesitas algo
                de Japón y lo podemos enviar, haremos todo lo posible para que
                llegue a sus manos. Envíenos un mensaje y responderemos a la
                brevedad!
              </p>
            </v-col>

            <v-col cols="12" sm="3">
              <div class="h6 mb-5">Ayuda</div>
              <p class="body-2">Preguntas Frecuentes</p>
              <p class="body-2">Terminos y Condiciones</p>
              <p class="body-2">Politicas de Privacidad</p>
            </v-col>
            <v-col cols="12" sm="3">
              <div class="h6 mb-5">Contactanos</div>
              <p class="body-2">1218-84, Otsuka, Sakamaki, Jimokuji-cho</p>
              <p class="body-2">Fono: +8126-228-9627</p>
              <p class="body-2">Email: hola@kyomaru.cl</p>
              <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mr-4 justify-start"
                dark
                icon
              >
                <v-icon size="24px">
                  {{ icon }}
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>

      <v-card-text class="kyomaru-red py-2 white--text">
        <v-container class="py-0 d-flex justify-space-between">
          <p class="mt-5">
            &copy; <strong>{{ new Date().getFullYear() }} KyoMaru</strong>
          </p>
          <p class="font-italic mt-5"><strong>Japon en tu casa.</strong></p>
        </v-container>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    icons: ['mdi-facebook', 'mdi-instagram', 'mdi-youtube'],
  }),
};
</script>

<style>
.kyomaru-red {
  background: #fb050d;
}
</style>
