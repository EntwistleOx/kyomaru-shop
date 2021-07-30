<template>
  <div>Contacto</div>
</template>

<script>
export default {
  mounted() {
    this.sendMail();
  },
  methods: {
    async sendMail() {
      const mail = {
        to: 'nodemailerADL@gmail.com',
        subject: 'Hola desde JD',
        params: { text: 'briiiigido!' },
      };
      await fetch('http://localhost:3000/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mail), // body data type must match "Content-Type" header
      });
    },
  },
};
</script>

<style></style>
