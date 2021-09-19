<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Daftar Pelunasan Piutang</div>
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

      <!-- popup form -->
      <v-col class="d-flex justify-end col-md-4">
        <!-- popup edit data -->
        <v-dialog v-model="dialogEdit" max-width="450px">
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Edit Data Pelunasan</b></span
              >
            </v-card-title>

            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form class="pa-10" @submit.prevent="handleEdit">
                <v-menu
                  v-model="editedTanggal"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Tanggal Transaksi"
                      rules="required"
                    >
                      <v-text-field
                        v-model="editedItem.tanggal_cicilan"
                        :error-messages="errors"
                        label="Tanggal Cicilan"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </validation-provider>
                  </template>
                  <v-date-picker
                    v-model="editedItem.tanggal_cicilan"
                    color="green darken-1"
                    @input="editedTanggal = false"
                  ></v-date-picker>
                </v-menu>
                <validation-provider
                  v-slot="{ errors }"
                  name="NIK"
                  rules="required|numeric|is_not:0"
                >
                  <v-text-field
                    v-model="editedItem.nik"
                    :error-messages="errors"
                    label="NIK"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Jumlah Cicilan"
                  rules="required|numeric|is_not:0"
                >
                  <v-text-field
                    v-model="editedItem.jumlah_cicilan"
                    :error-messages="errors"
                    label="Jumlah Cicilan"
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

        <!-- popup delete data -->
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
    <v-data-table
      :headers="headers"
      :items="dataPelunasan.data"
      :search="search"
      sort-by="tanggal_cicilan"
    >
      <template #cell(tanggal_cicilan)="{ item: { tanggal_cicilan } }">
        <span>{{ tanggal_cicilan }}</span>
      </template>
      <template #cell(nama_peminjam)="{ item: { nama_peminjam } }">
        <span>{{ nama_peminjam }}</span>
      </template>
      <template #cell(nik)="{ item: { nik } }">
        <span>{{ nik }}</span>
      </template>
      <template #cell(jumlah_cicilan)="{ item: { jumlah_cicilan } }">
        <span>{{ jumlah_cicilan }}</span>
      </template>
      <template #cell(kekurangan)="{ item: { kekurangan } }">
        <span>{{ kekurangan }}</span>
      </template>
      <template #cell(tanggal_jatuh_tempo)="{ item: { tanggal_jatuh_tempo } }">
        <span>{{ tanggal_jatuh_tempo }}</span>
      </template>
      <template #[`item.pelunasan`]="{ item }">
        <v-chip v-if="item.pelunasan === `Belum Lunas`" color="red" dark>
          {{ item.pelunasan }}
        </v-chip>
        <v-chip v-else color="green" dark>
          {{ item.pelunasan }}
        </v-chip>
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
      dataPelunasan: await store.dispatch('getDataPelunasan'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    dialogEdit: false,
    dialogDelete: false,
    editedTanggal: false,
    search: '',
    headers: [
      { text: 'Tgl. Cicilan', value: 'tanggal_cicilan' },
      { text: 'Nama Peminjam', value: 'nama_peminjam' },
      { text: 'NIK', value: 'nik' },
      { text: 'Jumlah Cicilan', value: 'jumlah_cicilan' },
      { text: 'Kekurangan', value: 'kekurangan' },
      { text: 'Tgl. Jatuh Tempo', value: 'tanggal_jatuh_tempo' },
      { text: 'Status', value: 'pelunasan' },
      { text: 'Aksi', value: 'aksi', sortable: false },
      { text: '', value: 'aksi2', sortable: false },
    ],

    editedItem: {
      id: '',
      tanggal_cicilan: '',
      nik: '',
      jumlah_cicilan: '',
    },
    defaultItem: {
      tanggal_cicilan: '',
      nik: '',
      jumlah_cicilan: '',
    },
  }),

  computed: {
    areAllEditsEmpty() {
      return Object.values(this.editedItem).some((value) => !value)
    },
  },

  methods: {
    async handleRefreshList() {
      this.dataPelunasan = await this.$store.dispatch('getDataPelunasan')
    },

    showEdit({
      item: {
        id, // eslint-disable-next-line camelcase
        tanggal_cicilan,
        nik,
        // eslint-disable-next-line camelcase
        jumlah_cicilan,
      },
    }) {
      this.dialogEdit = true
      this.editedItem = {
        ...this.editedItem,
        id,
        tanggal_cicilan,
        nik,
        jumlah_cicilan,
      }
    },

    handleEdit() {
      const { id } = this.editedItem
      this.isLoading = true
      this.$store
        .dispatch('updateDataPelunasanIndividu', [
          id,
          {
            tanggal_cicilan: this.editedItem.tanggal_cicilan,
            nik: this.editedItem.nik,
            jumlah_cicilan: this.editedItem.jumlah_cicilan,
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
        .dispatch('deleteDataPelunasanIndividu', this.editedItem.id)
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
