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
      <v-col class="d-flex justify-end col-md-4">
        <v-dialog v-model="dialog" max-width="600px">
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
            <v-card-actions class="white">
              <v-form ref="" class="px-10 py-5">
                <v-row justify="space-between">
                  <v-col cols="12" sm="6">
                    <div class="text-subtitle-2">Informasi Umum</div>
                    <v-text-field
                      v-model="form.nama_aset"
                      class="pt-1"
                      label="Nama Aset"
                      dense
                      required
                    ></v-text-field>
                    <v-autocomplete
                      v-model="form.kelompok"
                      class="pt-1"
                      :items="namaKelompok"
                      label="Kelompok"
                      dense
                      required
                    ></v-autocomplete>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="form.tanggal"
                      transition="scale-transition"
                      offset-x
                      min-width="auto"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.tanggal"
                          label="Tanggal Beli"
                          readonly
                          dense
                          required
                          append-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="form.tanggal" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(form.tanggal)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-text-field
                      v-model="form.harga_perolehan"
                      class="pt-1"
                      label="Harga Perolehan"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.nilai_bersih"
                      class="pt-1"
                      label="Nilai Bersih"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.nilai_residu"
                      class="pt-1"
                      label="Nilai Residu"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.umur_ekonomis"
                      class="pt-1"
                      label="Umur Ekonomis"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.lokasi"
                      class="pt-1"
                      label="Lokasi"
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="6">
                    <div class="text-subtitle-2">Akumulasi</div>
                    <v-text-field
                      v-model="form.no"
                      class="pt-1"
                      label="Nomor"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.departemen"
                      class="pt-1"
                      label="Departemen"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.akumulasi_beban"
                      class="pt-1"
                      label="Akumulasi beban"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.beban_pertahun"
                      class="pt-1"
                      label="Beban Pertahun"
                      dense
                      required
                    ></v-text-field>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="form.tanggal"
                      transition="scale-transition"
                      offset-x
                      min-width="auto"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.tanggal2"
                          label="Terhitung tanggal"
                          readonly
                          dense
                          required
                          append-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.tanggal2"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(form.tanggal2)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-text-field
                      v-model="form.nilai_buku"
                      class="pt-1"
                      label="Nilai Buku"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.beban_perbulan"
                      class="pt-1"
                      label="Beban Perbulan"
                      dense
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.nilai_penyusutan"
                      class="pt-1"
                      label="Nilai Penyusutan"
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-actions>

            <v-card-actions class="pt-0 pb-5">
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
      :items="dataAsetTetap.data"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      show-expand
      :search="search"
      sort-by="tanggal_beli"
    >
      <template #cell(tanggal_beli)="{ item: { tanggal_beli } }">
        <span>{{ tanggal_beli }}</span>
      </template>
      <template #cell(nama_aset)="{ item: { nama_aset } }">
        <span>{{ nama_aset }}</span>
      </template>
      <template #cell(kelompok)="{ item: { kelompok } }">
        <span>{{ kelompok }}</span>
      </template>
      <template #cell(harga_perolehan)="{ item: { harga_perolehan } }">
        <span>{{ harga_perolehan }}</span>
      </template>
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
  async asyncData({ store }) {
    return {
      dataAsetTetap: await store.dispatch('getDataAsetTetap'),
    }
  },
  data: () => ({
    colorTheme: '#388E3C',
    dialog: false,
    dialogDelete: false,
    search: '',
    namaKelompok: ['Kendaraan', 'Bangunan', 'Tanah'],
    menu: false,
    headers: [
      { text: 'Tanggal Beli', value: 'tanggal_beli' },
      { text: 'Nama Aset', value: 'nama_aset' },
      { text: 'Kelompok', value: 'kelompok' },
      { text: 'Harga Perolehan', value: 'harga_perolehan' },
      // { text: 'Nilai Bersih', value: 'nilai_bersih' },
      // { text: 'Nilai Residu', value: 'nilai_residu' },
      // { text: 'Umur Ekonomis', value: 'umur_ekonomis' },
      // { text: 'Lokasi', value: 'lokasi' },
      { text: 'Aksi', value: 'actions', sortable: false },
    ],
    dataAsetTetap: [],
    editedIndex: -1,
    form: {
      tanggal_beli: '',
      nama_aset: '',
      kelompok: '',
      harga_perolehan: '',
      nilai_bersih: '',
      nilai_residu: '',
      umur_ekonomis: '',
      lokasi: '',
      nomor: '',
      departemen: '',
      akumulasi_beban: '',
      beban_pertahun: '',
      tanggal2: '',
      nilai_buku: '',
      beban_perbulan: '',
      nilai_penyusutan: '',
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
    // initialize() {
    //   this.dataAsetTetap = [
    //     {
    //       tanggal: '',
    //       nama_aset: 'Mobil',
    //       kelompok: 'Kendaraan',
    //       harga_perolehan: '200.000.000',
    //       nilai_bersih: '',
    //       nilai_residu: '',
    //       umur_ekonomis: '',
    //       lokasi: 'Bantul',
    //     },
    //     {
    //       tanggal: '',
    //       nama_aset: 'Motor',
    //       kelompok: 'Kendaraan',
    //       harga_perolehan: '17.000.000',
    //       nilai_bersih: '',
    //       nilai_residu: '',
    //       umur_ekonomis: '',
    //       lokasi: 'Bantul',
    //     },
    //   ]
    // },

    editItem(item) {
      this.editedIndex = this.dataAsetTetap.indexOf(item)
      this.form = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.dataAsetTetap.indexOf(item)
      this.form = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.dataAsetTetap.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.form = Object.assign({}, this.form)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.form = Object.assign({}, this.form)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.dataAsetTetap[this.editedIndex], this.form)
      } else {
        this.dataAsetTetap.push(this.form)
      }
      this.close()
    },
  },
}
</script>
