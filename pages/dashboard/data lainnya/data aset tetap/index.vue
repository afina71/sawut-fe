<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Data Aset Tetap</div>
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
      <v-col class="d-flex justify-end" cols="12">
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
              <v-form ref="" class="px-10 py-5">
                <v-row justify="space-between">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.nama_aset"
                      class="pt-1"
                      label="Nama Aset"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.kelompok"
                      class="pt-1"
                      label="Kelompok"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.tanggal"
                      class="pt-1"
                      label="Tanggal Beli"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.harga_perolehan"
                      class="pt-1"
                      label="Harga Perolehan"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.nilai_bersih"
                      class="pt-1"
                      label="Nilai Bersih"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.nilai_residu"
                      class="pt-1"
                      label="Nilai Residu"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.umur_ekonomis"
                      class="pt-1"
                      label="Umur Ekonomis"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.lokasi"
                      class="pt-1"
                      label="Lokasi"
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.nama_aset"
                      class="pt-1"
                      label="Nama Aset"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.kelompok"
                      class="pt-1"
                      label="Kelompok"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.tanggal"
                      class="pt-1"
                      label="Tanggal Beli"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.harga_perolehan"
                      class="pt-1"
                      label="Harga Perolehan"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.nilai_bersih"
                      class="pt-1"
                      label="Nilai Bersih"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.nilai_residu"
                      class="pt-1"
                      label="Nilai Residu"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.umur_ekonomis"
                      class="pt-1"
                      label="Umur Ekonomis"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.lokasi"
                      class="pt-1"
                      label="Lokasi"
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
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
    <v-data-table :headers="headers" :items="dataAsetTetap" :search="search">
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
    colorTheme: '#1B7A13',
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      { text: 'Tanggal Beli', value: 'tanggal' },
      { text: 'Nama Aset', value: 'nama_aset' },
      { text: 'Kelompok', value: 'kelompok' },
      { text: 'Harga Perolehan', value: 'harga_perolehan' },
      { text: 'Nilai Bersih', value: 'nilai_bersih' },
      { text: 'Nilai Residu', value: 'nilai_residu' },
      { text: 'Umur Ekonomis', value: 'umur_ekonomis' },
      { text: 'Lokasi', value: 'lokasi' },
      { text: 'Aksi', value: 'actions', sortable: false },
    ],
    dataAsetTetap: [],
    editedIndex: -1,
    editedItem: {
      tanggal: '',
      nama_aset: '',
      kelompok: '',
      harga_perolehan: '',
      nilai_bersih: '',
      nilai_residu: '',
      umur_ekonomis: '',
      lokasi: '',
    },
    defaultItem: {
      tanggal: '',
      nama_aset: '',
      kelompok: '',
      harga_perolehan: '',
      nilai_bersih: '',
      nilai_residu: '',
      umur_ekonomis: '',
      lokasi: '',
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
      this.dataAsetTetap = [
        {
          tanggal: '',
          nama_aset: 'Mobil',
          kelompok: 'Kendaraan',
          harga_perolehan: '200.000.000',
          nilai_bersih: '',
          nilai_residu: '',
          umur_ekonomis: '',
          lokasi: 'Bantul',
        },
        {
          tanggal: '',
          nama_aset: 'Motor',
          kelompok: 'Kendaraan',
          harga_perolehan: '17.000.000',
          nilai_bersih: '',
          nilai_residu: '',
          umur_ekonomis: '',
          lokasi: 'Bantul',
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.dataAsetTetap.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.dataAsetTetap.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.dataAsetTetap.splice(this.editedIndex, 1)
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
        Object.assign(this.dataAsetTetap[this.editedIndex], this.editedItem)
      } else {
        this.dataAsetTetap.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
