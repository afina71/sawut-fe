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

      <!-- popup -->
      <v-col class="d-flex justify-end col-md-4">
        <!-- dialog input data -->
        <v-dialog v-model="dialogInput" max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Input Data Aset Tetap
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Input Data Aset Tetap</b></span
              >
            </v-card-title>
            <v-form class="px-10 pt-10">
              <v-row justify="space-between">
                <v-col cols="12" sm="6">
                  <div class="text-subtitle-2">Informasi Umum</div>
                  <v-text-field
                    v-model="inputItem.nama_aset"
                    class="pt-1"
                    label="Nama Aset"
                    dense
                  ></v-text-field>
                  <v-autocomplete
                    v-model="inputItem.kelompok"
                    class="pt-1"
                    :items="namaKelompok"
                    label="Kelompok"
                    dense
                  ></v-autocomplete>
                  <v-menu
                    v-model="inputTanggal1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="inputItem.tanggal_beli"
                        label="Tanggal Beli"
                        append-icon="mdi-calendar"
                        readonly
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="inputItem.tanggal_beli"
                      color="green darken-1"
                      @input="inputTanggal1 = false"
                    ></v-date-picker>
                  </v-menu>
                  <v-text-field
                    v-model="inputItem.harga_perolehan"
                    class="pt-1"
                    label="Harga Perolehan"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="inputItem.nilai_bersih"
                    class="pt-1"
                    label="Nilai Bersih"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="inputItem.nilai_residu"
                    class="pt-1"
                    label="Nilai Residu"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="inputItem.umur_ekonomis"
                    class="pt-1"
                    label="Umur Ekonomis"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="inputItem.lokasi"
                    class="pt-1"
                    label="Lokasi"
                    dense
                  ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="6">
                  <div class="text-subtitle-2">Akumulasi</div>
                  <v-text-field
                    v-model="inputItem.nomor"
                    class="pt-1"
                    label="Nomor"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="inputItem.departemen"
                    class="pt-1"
                    label="Departemen"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="inputItem.akumulasi_beban"
                    class="pt-1"
                    label="Akumulasi beban"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="inputItem.beban_per_tahun_ini"
                    class="pt-1"
                    label="Beban Pertahun"
                    dense
                  ></v-text-field>
                  <v-menu
                    v-model="inputTanggal2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="inputItem.terhitung_tanggal"
                        label="Terhitung Tanggal"
                        append-icon="mdi-calendar"
                        readonly
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="inputItem.terhitung_tanggal"
                      color="green darken-1"
                      @input="inputTanggal2 = false"
                    ></v-date-picker>
                  </v-menu>
                  <v-text-field
                    v-model="inputItem.nilai_buku"
                    class="pt-1"
                    label="Nilai Buku"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="inputItem.beban_per_bulan"
                    class="pt-1"
                    label="Beban Perbulan"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="inputItem.nilai_penyusutan"
                    class="pt-1"
                    label="Nilai Penyusutan"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>

            <v-card-actions class="py-5 pb-5 pr-10">
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeInput">
                Batal
              </v-btn>
              <v-btn
                depressed
                class="white--text rounded-lg green darken-1"
                :disabled="areAllInputsEmpty"
                @click="handleInput"
              >
                Simpan
              </v-btn>
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
      <template #[`item.kelompok`]="{ item: { kelompok } }">
        <span v-if="kelompok === 'kendaraan'">Kendaraan</span>
        <span v-else-if="kelompok === 'gedung'">Gedung</span>
        <span v-else-if="kelompok === 'tanah'">Tanah</span>
        <span v-else-if="kelompok === 'peralatan'">Peralatan</span>
        <span v-else>Lainnya</span>
      </template>
      <template #cell(harga_perolehan)="{ item: { harga_perolehan } }">
        <span>{{ harga_perolehan }}</span>
      </template>
      <template #expanded-item="{ item }">
        <td :colspan="headers.length">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Nilai Bersih</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.nilai_bersih }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Nilai Residu</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.nilai_bersih }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Umur Ekonomis</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.umur_ekonomis }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Lokasi</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.lokasi }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </td>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  layout: 'nazhir',
  async asyncData({ store }) {
    return {
      dataAsetTetap: await store.dispatch('getDataAsetTetap'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    dialogInput: false,
    inputTanggal1: false,
    inputTanggal2: false,
    expanded: [],
    singleExpand: true,
    search: '',
    isLoading: false,
    namaKelompok: [
      { text: 'Kendaraan', value: 'kendaraan' },
      { text: 'Gedung', value: 'gedung' },
      { text: 'Tanah', value: 'tanah' },
      { text: 'Peralatan', value: 'peralatan' },
      { text: 'Aset Lain', value: 'lainnya' },
    ],
    headers: [
      { text: 'Tanggal Beli', value: 'tanggal_beli' },
      { text: 'Nama Aset', value: 'nama_aset' },
      { text: 'Kelompok', value: 'kelompok' },
      { text: 'Harga Perolehan', value: 'harga_perolehan' },
      { text: '', value: 'data-table-expand' },
    ],

    defaultItem: {
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
      beban_per_tahun_ini: '',
      terhitung_tanggal: '',
      nilai_buku: '',
      beban_per_bulan: '',
      nilai_penyusutan: '',
    },
    inputItem: {
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
      beban_per_tahun_ini: '',
      terhitung_tanggal: '',
      nilai_buku: '',
      beban_per_bulan: '',
      nilai_penyusutan: '',
    },
  }),

  computed: {
    areAllInputsEmpty() {
      return Object.values(this.inputItem).some((v) => !v)
    },
  },

  methods: {
    async handleRefreshList() {
      this.dataAsetTetap = await this.$store.dispatch('getDataAsetTetap')
    },

    async handleInput() {
      const {
        // eslint-disable-next-line camelcase
        tanggal_beli,
        // eslint-disable-next-line camelcase
        nama_aset,
        kelompok,
        // eslint-disable-next-line camelcase
        harga_perolehan,
        // eslint-disable-next-line camelcase
        nilai_bersih,
        // eslint-disable-next-line camelcase
        nilai_residu,
        // eslint-disable-next-line camelcase
        umur_ekonomis,
        lokasi,
        nomor,
        departemen,
        // eslint-disable-next-line camelcase
        akumulasi_beban,
        // eslint-disable-next-line camelcase
        beban_per_tahun_ini,
        // eslint-disable-next-line camelcase
        terhitung_tanggal,
        // eslint-disable-next-line camelcase
        nilai_buku,
        // eslint-disable-next-line camelcase
        beban_per_bulan,
        // eslint-disable-next-line camelcase
        nilai_penyusutan,
      } = this.inputItem
      this.isLoading = true
      try {
        await this.$store.dispatch('createDataAsetTetap', {
          tanggal_beli,
          nama_aset,
          kelompok,
          harga_perolehan,
          nilai_bersih,
          nilai_residu,
          umur_ekonomis,
          lokasi,
          nomor,
          departemen,
          akumulasi_beban,
          beban_per_tahun_ini,
          terhitung_tanggal,
          nilai_buku,
          beban_per_bulan,
          nilai_penyusutan,
        })
        this.isLoading = false
        this.handleRefreshList()
      } catch (error) {
        this.isLoading = false
      }
      this.closeInput()
    },

    closeInput() {
      this.dialogInput = false
      this.$nextTick(() => {
        this.inputItem = Object.assign({}, this.defaultItem)
      })
    },
  },
}
</script>
