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

      <!-- popup add/edit data -->
      <v-col class="d-flex justify-end col-md-4">
        <v-dialog v-model="dialog" max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Input Pelunasan Piutang
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Input {{ formTitle }} Pelunasan Piutang</b></span
              >
            </v-card-title>
            <v-card-action class="white">
              <v-form ref="loginForm" class="px-10 py-5">
                <v-text-field
                  v-model="editedItem.nama_peminjam"
                  class="pt-1"
                  label="Nama Peminjam"
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
                  v-model="editedItem.nominal_pelunasan"
                  class="pt-1"
                  label="Nominal"
                  dense
                  required
                ></v-text-field>
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
    <v-data-table :headers="headers" :items="pelunasanPiutang" :search="search">
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
      <template #[`item.status`]="{ item }">
        <v-chip :color="getColor(item)" dark>
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  layout: 'default',
  data: () => ({
    colorTheme: '#1B7A13',
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      {
        text: 'Tanggal',
        align: 'start',
        sortable: false,
        value: 'tanggal',
      },
      { text: 'Nama Peminjam', value: 'nama_peminjam' },
      { text: 'NIK', value: 'nik' },
      { text: 'Jumlah Cicilan', value: 'nominal_pelunasan' },
      { text: 'Kekurangan', value: 'kekurangan' },
      { text: 'Tanggal Jatuh Tempo', value: 'tanggal_jatuh_tempo' },
      { text: 'Aksi', value: 'actions', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
    ],
    pelunasanPiutang: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      nama_peminjam: '',
      nik: '',
      nominal_pelunasan: '',
      kekurangan: '',
      tanggal_jatuh_tempo: '',
      status: '',
    },
    defaultItem: {
      id: '',
      nama_peminjam: '',
      nik: '',
      nominal_pelunasan: '',
      kekurangan: '',
      tanggal_jatuh_tempo: '',
      status: '',
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
      this.pelunasanPiutang = [
        {
          id: 0,
          tanggal: 5,
          nama_peminjam: 'budi',
          nik: 400833,
          nominal_pelunasan: 50000.0,
          kekurangan: 3000.0,
          tanggal_jatuh_tempo: 4,
          status: 'Belum Lunas',
        },
        {
          id: 1,
          tanggal: 6,
          nama_peminjam: 'budi',
          nik: 400833,
          nominal_pelunasan: 3000.0,
          kekurangan: 0.0,
          tanggal_jatuh_tempo: 4,
          status: 'Lunas',
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.pelunasanPiutang.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.pelunasanPiutang.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.pelunasanPiutang.splice(this.editedIndex, 1)
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
        Object.assign(this.pelunasanPiutang[this.editedIndex], this.editedItem)
      } else {
        this.pelunasanPiutang.push(this.editedItem)
      }
      this.close()
    },

    getColor(item) {
      if (this.editedItem.kekurangan <= 0.0) return 'green'
      else return 'red'
    },
  },
}
</script>
