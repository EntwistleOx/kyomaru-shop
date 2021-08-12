<template>
  <v-container class="mt-5">
    <Menu />
    <v-row>
      <v-col cols="12">
        <router-link to="/admin/categories">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
              <div class="d-flex justify-space-between">
                <v-card-title>Categorias</v-card-title>
                <v-btn color="success" fab small class="mt-3 mr-3">
                  <v-icon>mdi-sitemap</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-hover>
        </router-link>
      </v-col>
      <v-col cols="12">
        <router-link to="/admin/products">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
              <div class="d-flex justify-space-between">
                <v-card-title>Productos</v-card-title>
                <v-btn color="warning" fab small class="mt-3 mr-3">
                  <v-icon>mdi-shape</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-hover>
        </router-link>
      </v-col>
      <v-col cols="12">
        <router-link to="/admin/users">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
              <div class="d-flex justify-space-between">
                <v-card-title>Usuarios</v-card-title>
                <v-btn color="info" fab small class="mt-3 mr-3">
                  <v-icon>mdi-account-group</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-hover>
        </router-link>
      </v-col>
      <v-col cols="12">
        <router-link to="/admin/orders">
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
              <div class="d-flex justify-space-between">
                <v-card-title>Ordenes</v-card-title>
                <v-btn color="error" fab small class="mt-3 mr-3">
                  <v-icon>mdi-file-document-multiple</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-hover>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Menu from '@/components/Admin/Menu';

export default {
  components: {
    Menu,
  },
};
</script>
