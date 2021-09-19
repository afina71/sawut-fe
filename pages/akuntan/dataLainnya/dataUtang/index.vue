<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Data Utang</div>
    </v-row>
    <v-row class="pb-10">
      <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          outlined
          dense
          hide-details
        ></v-text-field>
      </v-col>
      <v-spacer></v-spacer>

      <!-- popup add/edit data -->
      <v-col class="d-flex justify-end col-md-4">
        <!-- dialog edit data -->
        <v-dialog v-model="dialogEdit" max-width="450px">
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Edit Data Utang</b></span
              >
            </v-card-title>

            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form class="pa-10" @submit.prevent="handleEdit">
                <validation-provider
                  v-slot="{ errors }"
                  name="Kategori Utang"
                  rules="required"
                >
                  <v-autocomplete
                    v-model="editedItem.kategori_utang"
                    :error-messages="errors"
                    :items="kategoriUtang"
                    label="Kategori Utang"
                  ></v-autocomplete>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Nominal"
                  rules="required|numeric"
                >
                  <v-text-field
                    v-model="editedItem.nominal"
                    :error-messages="errors"
                    label="Nominal"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Keterangan Utang"
                  rules="required"
                >
                  <v-text-field
                    v-model="editedItem.keterangan_utang"
                    :error-messages="errors"
                    label="Keterangan Utang"
                  ></v-text-field>
                </validation-provider>

                <v-row class="pt-5">
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="closeEdit">
                    Batal
                  </v-btn>
                  <v-btn
                    depressed
                    class="white--text rounded-lg green darken-1"
                    type="submit"
                    :disabled="invalid"
                  >
                    Simpan
                  </v-btn>
                </v-row>
              </v-form>
            </validation-observer>
          </v-card>
        </v-dialog>

        <!-- dialog delete -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="rounded-xl px-5 pt-10 pb-5">
            <v-card-subtitle class="headline text-body-1"
              >Apa Anda yakin ingin menghapus data ini?</v-card-subtitle
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeDelete"
                >Batal</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn :color="colorTheme" dark depressed @click="handleDelete"
                >Iya</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <!-- data tabel -->
    <v-data-table :headers="headers" :items="dataUtang.data" :search="search">
      <template #[`item.kategori_utang`]="{ item: { kategori_utang } }">
        <span v-if="kategori_utang === 'biaya'">Biaya</span>
        <span v-else>Jangka Panjang</span>
      </template>
      <template #cell(nominal)="{ item: { nominal } }">
        <span>{{ nominal }}</span>
      </template>
      <template #cell(keterangan_utang)="{ item: { keterangan_utang } }">
        <span>{{ keterangan_utang }}</span>
      </template>
      <template #[`item.aksi`]="row">
        <v-icon small @click="showEdit(row)"> mdi-pencil </v-icon>
      </template>
      <template #[`item.aksi2`]="row">
        <v-icon small @click="showDelete(row)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
import {
  required,
  numeric,
  // eslint-disable-next-line camelcase
  is_not,
} from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: '{_field_} tidak boleh kosong',
})

extend('numeric', {
  ...numeric,
  message: '{_field_} hanya dapat diisi dengan angka',
})

extend('is_not', {
  // eslint-disable-next-line camelcase
  ...is_not,
  message: '{_field_} tidak boleh bernilai 0',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  layout: 'akuntan',
  async asyncData({ store }) {
    return {
      dataUtang: await store.dispatch('getDataUtang'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    dialogEdit: false,
    dialogDelete: false,
    kategoriUtang: [
      { text: 'Utang Biaya', value: 'biaya' },
      { text: 'Utang Jangka Panjang', value: 'jangkapanjang' },
    ],
    search: '',
    headers: [
      { text: 'Kategori Utang', value: 'kategori_utang' },
      { text: 'Nominal', value: 'nominal' },
      { text: 'Keterangan', value: 'keterangan_utang' },
      { text: 'Aksi', value: 'aksi', sortable: false },
      { text: '', value: 'aksi2', sortable: false },
    ],

    editedItem: {
      id: '',
      kategori_utang: '',
      nominal: '',
      keterangan_utang: '',
    },
    defaultItem: {
      kategori_utang: '',
      nominal: '',
      keterangan_utang: '',
    },
  }),

  computed: {
    areAllEditsEmpty() {
      return Object.values(this.editedItem).some((value) => !value)
    },
  },

  methods: {
    async handleRefreshList() {
      this.dataUtang = await this.$store.dispatch('getDataUtang')
    },

    showEdit({
      item: {
        id, // eslint-disable-next-line camelcase
        kategori_utang,
        nominal,
        // eslint-disable-next-line camelcase
        keterangan_utang,
      },
    }) {
      this.dialogEdit = true
      this.editedItem = {
        ...this.editedItem,
        id,
        kategori_utang,
        nominal,
        keterangan_utang,
      }
    },

    handleEdit() {
      const { id } = this.editedItem
      this.isLoading = true
      this.$store
        .dispatch('updateDataUtang', [
          id,
          {
            kategori_utang: this.editedItem.kategori_utang,
            nominal: this.editedItem.nominal,
            keterangan_utang: this.editedItem.keterangan_utang,
          },
        ])
        .then(() =>
          this.handleRefreshList()
            .then(() => this.closeEdit())
            .then(() => (this.isLoading = false))
        )
        .catch(() => (this.isLoading = false))
    },

    closeEdit() {
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },

    showDelete({ item: { id } }) {
      this.dialogDelete = true
      this.editedItem = { ...this.editedItem, id }
    },

    handleDelete() {
      this.$store
        .dispatch('deleteDataUtang', this.editedItem.id)
        .then(() =>
          this.handleRefreshList()
            .then(() => this.closeDelete())
            .then(() => (this.isLoading = false))
        )
        .catch(() => (this.isLoading = false))
    },

    closeDelete() {
      this.dialogDelete = false
    },
  },
}
</script>
