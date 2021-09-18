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

            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form class="pa-10" @submit.prevent="handleInput">
                <v-row>
                  <v-col cols="12" sm="6">
                    <div class="text-subtitle-2">Informasi Umum</div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nama Aset"
                      rules="required|alpha_spaces"
                    >
                      <v-text-field
                        v-model="inputItem.nama_aset"
                        :error-messages="errors"
                        label="Nama Aset"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Kelompok"
                      rules="required"
                    >
                      <v-autocomplete
                        v-model="inputItem.kelompok"
                        :error-messages="errors"
                        :items="namaKelompok"
                        label="Kelompok"
                      ></v-autocomplete>
                    </validation-provider>
                    <v-menu
                      v-model="inputTanggal1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template #activator="{ on, attrs }">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Tanggal Beli"
                          rules="required"
                        >
                          <v-text-field
                            v-model="inputItem.tanggal_beli"
                            :error-messages="errors"
                            label="Tanggal Beli"
                            append-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </validation-provider>
                      </template>
                      <v-date-picker
                        v-model="inputItem.tanggal_beli"
                        color="green darken-1"
                        @input="inputTanggal1 = false"
                      ></v-date-picker>
                    </v-menu>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Harga Perolehan"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.harga_perolehan"
                        :error-messages="errors"
                        label="Harga Perolehan"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nilai Bersih"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.nilai_bersih"
                        :error-messages="errors"
                        label="Nilai Bersih"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nilai Residu"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.nilai_residu"
                        :error-messages="errors"
                        label="Nilai Residu"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Umur Ekonomis"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.umur_ekonomis"
                        :error-messages="errors"
                        label="Umur Ekonomis"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Lokasi"
                      rules="required"
                    >
                      <v-text-field
                        v-model="inputItem.lokasi"
                        :error-messages="errors"
                        label="Lokasi"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="6">
                    <div class="text-subtitle-2">Akumulasi</div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nomor"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.nomor"
                        :error-messages="errors"
                        label="Nomor"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Departemen"
                      rules="required"
                    >
                      <v-text-field
                        v-model="inputItem.departemen"
                        :error-messages="errors"
                        label="Departemen"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Akumulasi Beban"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.akumulasi_beban"
                        :error-messages="errors"
                        label="Akumulasi beban"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Beban Pertahun"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.beban_per_tahun_ini"
                        :error-messages="errors"
                        label="Beban Pertahun"
                      ></v-text-field>
                    </validation-provider>
                    <v-menu
                      v-model="inputTanggal2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template #activator="{ on, attrs }">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Tanggal"
                          rules="required"
                        >
                          <v-text-field
                            v-model="inputItem.terhitung_tanggal"
                            :error-messages="errors"
                            label="Terhitung Tanggal"
                            append-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </validation-provider>
                      </template>
                      <v-date-picker
                        v-model="inputItem.terhitung_tanggal"
                        color="green darken-1"
                        @input="inputTanggal2 = false"
                      ></v-date-picker>
                    </v-menu>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nilai Buku"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.nilai_buku"
                        :error-messages="errors"
                        label="Nilai Buku"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Beban Perbulan"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.beban_per_bulan"
                        :error-messages="errors"
                        label="Beban Perbulan"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nilai Penyusutan"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.nilai_penyusutan"
                        :error-messages="errors"
                        label="Nilai Penyusutan"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>

                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="closeInput">
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
import {
  required,
  numeric,
  // eslint-disable-next-line camelcase
  alpha_spaces,
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

extend('alpha_spaces', {
  // eslint-disable-next-line camelcase
  ...alpha_spaces,
  message: '{_field_} hanya dapat diisi dengan huruf',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

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

  computed: {},

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
        this.$refs.observer.reset()
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
        this.$refs.observer.reset()
        this.inputItem = Object.assign({}, this.defaultItem)
      })
    },
  },
}
</script>
