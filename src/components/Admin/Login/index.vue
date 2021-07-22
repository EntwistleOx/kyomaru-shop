<template>
  <v-container class="mt-5">
    <v-card>
      <v-card-title>Ingreso de Administrador</v-card-title>

      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="first"
                label="Email"
                rounded
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="last"
                label="Contraseña"
                rounded
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          color="primary "
          class="text-none ml-2"
          outlined
          rounded
          to="admin-home"
        >
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
