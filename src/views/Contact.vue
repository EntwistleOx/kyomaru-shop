<template>
  <v-container class="mt-5">
    <v-row>
      <v-col cols="12" md="6">
        <v-parallax src="contact.jpg"> </v-parallax>
      </v-col>
      <v-col cols="12" md="6"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    // async sendMail() {
    //   const mail = {
    //     to: 'nodemailerADL@gmail.com',
    //     subject: 'Hola desde JD',
    //     params: { text: 'briiiigido!' },
    //   };
    //   await fetch('http://localhost:3000/mail', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(mail), // body data type must match "Content-Type" header
    //   });
    // },
  },
};
</script>

<style></style>
