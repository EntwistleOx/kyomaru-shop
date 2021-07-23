<template>
  <div>
    <v-parallax height="500" src="hero3.webp">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="text-h2 text-sm-h1 font-weight-thin mb-4">KyoMaru</h1>
          <h4 class="text-h5 mb-5">Japon en tu casa!</h4>
          <div class="d-flex justify-center">
            <v-text-field
              label="Buscar en KyoMaru"
              filled
              outlined
              rounded
              dark
              append-icon="mdi-magnify"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-parallax>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h1,
h4 {
  text-shadow: 3px 3px 5px black;
}

.v-input {
  max-width: 500px;
}
</style>
