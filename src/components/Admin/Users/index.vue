<template>
  <v-container class="mt-5">
    <Menu />
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.lastname"
                        label="Apellido"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.rut"
                        label="Rut"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Telefono"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6"
                >¿Seguro que quieres eliminar esta categoria?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Menu from '@/components/Admin/Menu';

export default {
  components: {
    Menu,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Apellido', value: 'lastname' },
      { text: 'RUT', value: 'rut' },
      { text: 'Email', value: 'email' },
      { text: 'Telefono', value: 'phone' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
    },
    defaultItem: {
      name: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Producto';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          id: 1,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 2,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 3,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 4,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 5,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 6,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 7,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 8,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 9,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 10,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 11,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 12,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 13,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 14,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 15,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 16,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 17,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 18,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 19,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 20,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 21,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
        {
          id: 22,
          name: 'John',
          lastname: 'Doe',
          rut: '11.111.111-1',
          email: 'johnd@gmail.com',
          phone: '+56912345678',
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style></style>
