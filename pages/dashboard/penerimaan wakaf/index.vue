<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Data Wakif dan Nominal Aset Wakaf</div>
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
        <v-dialog v-model="dialog" max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Input Data
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form {{ formTitle }} Wakaf</b></span
              >
            </v-card-title>
            <v-card-action class="white">
              <v-form ref="loginForm" class="px-10 py-5">
                <v-text-field
                  v-model="editedItem.nama"
                  class="pt-1"
                  label="Nama Wakif"
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.nik"
                  class="pt-1"
                  label="NIK"
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.nomor"
                  class="pt-1"
                  label="Nomor AIW"
                  dense
                  required
                ></v-text-field>
                <v-autocomplete
                  v-model="editedItem.jenis_wakaf"
                  class="pt-1"
                  :items="jenisWakaf"
                  label="Jenis Wakaf"
                  dense
                  required
                ></v-autocomplete>
                <v-text-field
                  v-model="editedItem.jangka_waktu"
                  class="pt-1"
                  label="Jangka Waktu"
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.nominal_wakaf"
                  class="pt-1"
                  label="Nominal Wakaf"
                  dense
                  required
                ></v-text-field>
                <v-autocomplete
                  v-model="editedItem.metode_pembayaran"
                  class="pt-1"
                  :items="metode"
                  label="Metode Pembayaran"
                  dense
                  required
                ></v-autocomplete>
              </v-form>
            </v-card-action>

            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Batal </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Simpan </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Apa Anda yakin ingin menghapus data ini?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Batal</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
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
      :items="desserts"
      :search="search"
      sort-by="tanggal"
    >
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  layout: 'default',
  data: () => ({
    jenisWakaf: ['Wakaf Temporer', 'Wakaf Permanent'],
    metode: ['Tunai Permanen', 'Temporer'],
    colorTheme: '#1B7A13',
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      {
        text: 'Tanggal',
        align: 'start',
        sortable: false,
        value: 'tanggal_transaksi',
      },
      { text: 'Nama', value: 'nama' },
      { text: 'NIK', value: 'nik' },
      { text: 'Nomor AIW', value: 'nomor_aiw' },
      { text: 'Jenis Wakaf', value: 'jenis_wakaf' },
      { text: 'Jangka Waktu', value: 'jangka_waktu' },
      { text: 'Metode Pembayaran', value: 'metode_pembayaran' },
      { text: 'Nominal Wakaf', value: 'nominal' },
      { text: 'Aksi', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      nama: '',
      tanggal: '',
      nik: '',
      nomor: '',
      jenis_wakaf: '',
      jangka_waktu: '',
      metode_pembayaran: '',
      nominal_wakaf: '',
    },
    defaultItem: {
      nama: '',
      tanggal: '',
      nik: '',
      nomor: '',
      jenis_wakaf: '',
      jangka_waktu: '',
      metode_pembayaran: '',
      nominal_wakaf: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Input Data' : 'Edit Data'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          nama: 'Pak eko dianto',
          tanggal: 92301,
          nik: 6.0,
          nomor: 28,
          jenis_wakaf: 4.0,
          jangka_waktu: 6.0,
          metode_pembayaran: 24,
          nominal_wakaf: 4.0,
        },
        {
          nama: 'Pak eko dianto',
          tanggal: 92301,
          nik: 6.0,
          nomor: 29,
          jenis_wakaf: 4.0,
          jangka_waktu: 6.0,
          metode_pembayaran: 24,
          nominal_wakaf: 4.0,
        },
        {
          nama: 'Pak eko dianto',
          tanggal: 923931,
          nik: 6.0,
          nomor: 14,
          jenis_wakaf: 4.0,
          jangka_waktu: 6.0,
          metode_pembayaran: 24,
          nominal_wakaf: 4.0,
        },
        {
          nama: 'Pak eko dianto',
          tanggal: 939301,
          nik: 6.0,
          nomor: 54,
          jenis_wakaf: 4.0,
          jangka_waktu: 6.0,
          metode_pembayaran: 24,
          nominal_wakaf: 4.0,
        },
        {
          nama: 'Pak eko dianto',
          tanggal: 92391,
          nik: 6.0,
          nomor: 94,
          jenis_wakaf: 4.0,
          jangka_waktu: 6.0,
          metode_pembayaran: 24,
          nominal_wakaf: 4.0,
        },
        {
          nama: 'Pak eko dianto',
          tanggal: 99301,
          nik: 6.0,
          nomor: 34,
          jenis_wakaf: 4.0,
          jangka_waktu: 6.0,
          metode_pembayaran: 24,
          nominal_wakaf: 4.0,
        },
        {
          nama: 'Pak eko dianto',
          tanggal: 92301,
          nik: 6.0,
          nomor: 29,
          jenis_wakaf: 4.0,
          jangka_waktu: 6.0,
          metode_pembayaran: 24,
          nominal_wakaf: 4.0,
        },
        {
          nama: 'Pak eko dianto',
          tanggal: 92391,
          nik: 6.0,
          nomor: 25,
          jenis_wakaf: 4.0,
          jangka_waktu: 6.0,
          metode_pembayaran: 24,
          nominal_wakaf: 4.0,
        },
        {
          nama: 'Pak eko dianto',
          tanggal: 92301,
          nik: 6.0,
          nomor: 22,
          jenis_wakaf: 4.0,
          jangka_waktu: 6.0,
          metode_pembayaran: 24,
          nominal_wakaf: 4.0,
        },
        {
          nama: 'Pak eko dianto',
          tanggal: 92328,
          nik: 6.0,
          nomor: 34,
          jenis_wakaf: 4.0,
          jangka_waktu: 6.0,
          metode_pembayaran: 24,
          nominal_wakaf: 4.0,
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
