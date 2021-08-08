<template>
  <v-container class="mt-5">
    <Menu />
    <v-data-table
      :headers="headers"
      :items="getCategories"
      :items-per-page="5"
      class="elevation-1"
      loading-text="Cargando..."
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Categorias</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nueva Categoria
              </v-btn>
            </template>
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
                        :error-messages="nameErrors"
                        required
                        @input="$v.editedItem.name.$touch()"
                        @blur="$v.editedItem.name.$touch()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-img
                        v-if="editedIndex && !changePhoto"
                        :src="photoUrl"
                        aspect-ratio="1"
                        max-height="100"
                        max-width="100"
                      />
                      <v-switch
                        v-if="editedIndex"
                        v-model="changePhoto"
                        label="Cambiar Imagen"
                      ></v-switch>
                      <v-file-input
                        v-if="changePhoto || !editedIndex"
                        accept="image/*"
                        prepend-icon="mdi-camera"
                        chips
                        show-size
                        counter
                        v-model="editedItem.photo"
                        label="Imagen"
                        :error-messages="photoErrors"
                        required
                        @input="$v.editedItem.photo.$touch()"
                        @blur="$v.editedItem.photo.$touch()"
                      ></v-file-input>
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
      <template v-slot:[`item.photo`]="{ item }">
        <v-img
          :src="item.photo.url"
          aspect-ratio="1"
          max-height="80"
          max-width="80"
        ></v-img>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Recargar </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, requiredIf } from "vuelidate/lib/validators";

import Menu from "@/components/Admin/Menu";

export default {
  components: {
    Menu,
  },
  data: () => ({
    changePhoto: false,
    photoUrl: "",
    photoStorage: "",
    disable: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Foto",
        value: "photo",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: null,
    editedItem: {
      name: "",
      photo: null,
    },
    defaultItem: {
      name: "",
      photo: null,
    },
  }),

  mixins: [validationMixin],
  validations: {
    editedItem: {
      name: { required },
      photo: {
        required: requiredIf(function () {
          if (!this.editedIndex) {
            return true;
          } else {
            if (this.changePhoto) {
              return true;
            } else {
              return false;
            }
          }
        }),
      },
    },
  },

  computed: {
    ...mapGetters(["getCategories"]),

    formTitle() {
      return !this.editedIndex ? "Nueva Categoria" : "Editar Categoria";
    },

    nameErrors() {
      let errors = [];
      if (!this.$v.editedItem.name.$dirty) return errors;
      !this.$v.editedItem.name.required && errors.push("Nombre es requerido.");
      return errors;
    },

    photoErrors() {
      let errors = [];
      if (!this.$v.editedItem.photo.$dirty) return errors;
      !this.$v.editedItem.photo.required &&
        errors.push("La Imagen es requerida.");
      return errors;
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

  mounted() {
    this.editedItem = { ...this.defaultItem };
  },

  methods: {
    ...mapActions([
      "fetch_Categories",
      "delete_Category",
      "update_Category",
      "add_Category",
    ]),

    initialize() {
      this.fetch_Categories();
    },

    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem = { ...item };
      this.photoUrl = this.editedItem.photo.url;
      this.photoStorage = this.editedItem.photo.storage;
      this.editedItem.photo = null;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = item.id;
      this.photoStorage = item.photo.storage;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.delete_Category({
        id: this.editedIndex,
        storage: this.photoStorage,
      });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = null;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = null;
      });
    },

    save() {
      this.$v.$touch();
      if (this.editedIndex) {
        if (!this.$v.$invalid) {
          this.update_Category({
            id: this.editedIndex,
            category: { ...this.editedItem, photoStorage: this.photoStorage },
          });
          this.close();
        }
      } else {
        if (!this.$v.$invalid) {
          this.add_Category(this.editedItem);
          this.close();
        }
      }
    },
  },
};
</script>

<style></style>
