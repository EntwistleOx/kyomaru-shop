<template>
  <v-container class="mt-5">
    <Menu />
    <v-data-table
      :headers="headers"
      :items="getProducts"
      :items-per-page="5"
      class="elevation-1"
      loading-text="Cargando..."
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Productos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo Producto
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
                      <v-switch
                        v-model="editedItem.state"
                        :label="`Estado: ${
                          editedItem.state ? 'Activo' : 'Desactivo'
                        }`"
                        :error-messages="stateErrors"
                        required
                        @input="$v.editedItem.state.$touch()"
                        @blur="$v.editedItem.state.$touch()"
                      ></v-switch>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.description"
                        label="Descripcion"
                        :error-messages="descriptionErrors"
                        required
                        @input="$v.editedItem.description.$touch()"
                        @blur="$v.editedItem.description.$touch()"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Precio"
                        :error-messages="priceErrors"
                        required
                        @input="$v.editedItem.price.$touch()"
                        @blur="$v.editedItem.price.$touch()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.categories"
                        :items="categories"
                        label="Categorias"
                        multiple
                        chips
                        :error-messages="categoriesErrors"
                        required
                        @input="$v.editedItem.name.$touch()"
                        @blur="$v.editedItem.name.$touch()"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <label class="v-label theme--light mb-0">
                        Dimenciones
                      </label>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.dimensions.height"
                        label="Alto (cm)"
                        :error-messages="heightErrors"
                        required
                        @input="$v.editedItem.dimensions.height.$touch()"
                        @blur="$v.editedItem.dimensions.height.$touch()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.dimensions.width"
                        label="Ancho (cm)"
                        :error-messages="widthErrors"
                        required
                        @input="$v.editedItem.dimensions.width.$touch()"
                        @blur="$v.editedItem.dimensions.width.$touch()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.weight"
                        label="Peso"
                        :error-messages="weightErrors"
                        required
                        @input="$v.editedItem.weight.$touch()"
                        @blur="$v.editedItem.weight.$touch()"
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
                >¿Seguro que quieres eliminar este producto?</v-card-title
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
      <template v-slot:[`item.dimensions`]="{ item }">
        {{ `${item.dimensions.height}cmX${item.dimensions.width}cm` }}
      </template>
      <template v-slot:[`item.price`]="{ item }">
        ${{ formatPrice(item.price) }}
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
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, requiredIf } from 'vuelidate/lib/validators';
import { formatCurrency } from '@/utils';

import Menu from '@/components/Admin/Menu';

export default {
  components: {
    Menu,
  },
  data: () => ({
    changePhoto: false,
    photoUrl: '',
    photoStorage: '',
    disable: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Estado',
        value: 'state',
      },
      {
        text: 'Descripcion',
        value: 'description',
      },
      {
        text: 'Precio',
        value: 'price',
      },
      {
        text: 'Categorias',
        value: 'categories',
      },
      {
        text: 'Dimensiones',
        value: 'dimensions',
      },
      {
        text: 'Peso',
        value: 'weight',
      },
      {
        text: 'Foto',
        value: 'photo',
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: null,
    editedItem: {
      name: '',
      state: false,
      description: '',
      price: '',
      categories: [],
      dimensions: {
        height: '',
        width: '',
      },
      weight: '',
      photo: null,
    },
    defaultItem: {
      name: '',
      state: false,
      description: '',
      price: '',
      categories: [],
      dimensions: {
        height: '',
        width: '',
      },
      weight: '',
      photo: null,
    },
  }),

  mixins: [validationMixin],
  validations: {
    editedItem: {
      name: { required },
      state: { required },
      description: { required },
      price: { required },
      categories: { required },
      dimensions: {
        height: { required },
        width: { required },
      },
      weight: { required },
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
    ...mapGetters(['getProducts', 'getCategories']),

    categories() {
      return this.getCategories.map((cat) => cat.name);
    },

    formTitle() {
      return !this.editedIndex ? 'Nuevo Producto' : 'Editar Producto';
    },

    nameErrors() {
      let errors = [];
      if (!this.$v.editedItem.name.$dirty) return errors;
      !this.$v.editedItem.name.required && errors.push('Nombre es requerido.');
      return errors;
    },

    stateErrors() {
      let errors = [];
      if (!this.$v.editedItem.state.$dirty) return errors;
      !this.$v.editedItem.state.required && errors.push('Estado es requerido.');
      return errors;
    },

    descriptionErrors() {
      let errors = [];
      if (!this.$v.editedItem.description.$dirty) return errors;
      !this.$v.editedItem.description.required &&
        errors.push('Descripcion es requerida.');
      return errors;
    },

    priceErrors() {
      let errors = [];
      if (!this.$v.editedItem.price.$dirty) return errors;
      !this.$v.editedItem.price.required && errors.push('Precio es requerido.');
      return errors;
    },

    categoriesErrors() {
      let errors = [];
      if (!this.$v.editedItem.categories.$dirty) return errors;
      !this.$v.editedItem.categories.required &&
        errors.push('Categorias es requerido.');
      return errors;
    },

    heightErrors() {
      let errors = [];
      if (!this.$v.editedItem.dimensions.height.$dirty) return errors;
      !this.$v.editedItem.dimensions.height.required &&
        errors.push('Altura es requerida.');
      return errors;
    },

    widthErrors() {
      let errors = [];
      if (!this.$v.editedItem.dimensions.width.$dirty) return errors;
      !this.$v.editedItem.dimensions.width.required &&
        errors.push('Anchura es requerida.');
      return errors;
    },

    weightErrors() {
      let errors = [];
      if (!this.$v.editedItem.weight.$dirty) return errors;
      !this.$v.editedItem.weight.required && errors.push('Peso es requerida.');
      return errors;
    },

    photoErrors() {
      let errors = [];
      if (!this.$v.editedItem.photo.$dirty) return errors;
      !this.$v.editedItem.photo.required &&
        errors.push('La Imagen es requerida.');
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
      'fetch_Products',
      'fetch_Categories',
      'delete_Product',
      'update_Product',
      'add_Product',
    ]),

    initialize() {
      this.fetch_Products();
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
      this.delete_Product({
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
          this.update_Product({
            id: this.editedIndex,
            product: { ...this.editedItem, photoStorage: this.photoStorage },
          });
          this.close();
        }
      } else {
        if (!this.$v.$invalid) {
          this.add_Product(this.editedItem);
          this.close();
        }
      }
    },

    formatPrice(number) {
      return formatCurrency(number);
    },
  },
};
</script>

<style></style>
