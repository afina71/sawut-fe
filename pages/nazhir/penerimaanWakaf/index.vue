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

      <!-- popup -->
      <v-col class="d-flex justify-end col-md-4">
        <!-- input data -->
        <v-dialog v-model="dialogInput" max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Input Data Penerimaan
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Input Data Penerimaan</b></span
              >
            </v-card-title>

            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form class="pa-10" @submit.prevent="handleInput">
                <v-row>
                  <v-col cols="12" sm="6">
                    <div class="text-subtitle-2">Informasi Wakif</div>
                    <v-menu
                      v-model="inputTanggal"
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
                            v-model="inputItem.tanggal_transaksi"
                            :error-messages="errors"
                            label="Tanggal Transaksi"
                            append-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </validation-provider>
                      </template>
                      <v-date-picker
                        v-model="inputItem.tanggal_transaksi"
                        color="green darken-1"
                        @input="inputTanggal = false"
                      ></v-date-picker>
                    </v-menu>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nama Wakif"
                      rules="required|alpha_spaces"
                    >
                      <v-text-field
                        v-model="inputItem.nama_wakif"
                        :error-messages="errors"
                        label="Nama Wakif"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="NIK"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.nik"
                        :error-messages="errors"
                        label="NIK"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nomor Telepon"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.telepon"
                        :error-messages="errors"
                        label="Nomor Telepon"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Alamat"
                      rules="required"
                    >
                      <v-text-field
                        v-model="inputItem.alamat"
                        :error-messages="errors"
                        label="Alamat"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="6">
                    <div class="text-subtitle-2">Informasi Wakaf</div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nomor AIW"
                      rules="required|numeric|is_not:0"
                    >
                      <v-text-field
                        v-model="inputItem.nomor_aiw"
                        :error-messages="errors"
                        label="Nomor AIW"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Jenis Wakaf"
                      rules="required"
                    >
                      <v-autocomplete
                        v-model="inputItem.jenis_wakaf"
                        :error-messages="errors"
                        :items="jenisWakaf"
                        label="Jenis Wakaf"
                      ></v-autocomplete>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Jangka Waktu"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="inputItem.jangka_waktu_temporer"
                        :error-messages="errors"
                        label="Jangka Waktu (Bulan)"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nominal Wakaf"
                      rules="required|numeric|is_not:0"
                    >
                      <v-text-field
                        v-model="inputItem.nominal"
                        :error-messages="errors"
                        label="Nominal Wakaf"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Metode Pembayaran"
                      rules="required"
                    >
                      <v-autocomplete
                        v-model="inputItem.metode_pembayaran"
                        :error-messages="errors"
                        :items="metode"
                        label="Metode Pembayaran"
                      ></v-autocomplete>
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
      :items="dataWakaf.data"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      show-expand
      :search="search"
      sort-by="tanggal_transaksi"
    >
      <template #cell(tanggal_transaksi)="{ item: { tanggal_transaksi } }">
        <span>{{ tanggal_transaksi }}</span>
      </template>
      <template #cell(nama_wakif)="{ item: { nama_wakif } }">
        <span>{{ nama_wakif }}</span>
      </template>
      <template #cell(nomor_aiw)="{ item: { nomor_aiw } }">
        <span>{{ nomor_aiw }}</span>
      </template>
      <template #cell(telepon)="{ item: { telepon } }">
        <span>{{ telepon }}</span>
      </template>
      <template #[`item.jenis_wakaf`]="{ item: { jenis_wakaf } }">
        <span v-if="jenis_wakaf === 'temporer'">Wakaf Temporer</span>
        <span v-else>Wakaf Permanen</span>
      </template>
      <template
        #cell(jangka_waktu_temporer)="{ item: { jangka_waktu_temporer } }"
      >
        <span>{{ jangka_waktu_temporer }}</span>
      </template>
      <template #cell(nominal)="{ item: { nominal } }">
        <span>{{ nominal }}</span>
      </template>
      <template #expanded-item="{ item }">
        <td :colspan="headers.length">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Nomor Induk Kependudukan</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.nik }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Telepon</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.telepon }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Alamat</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.alamat }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Metode Pembayaran</v-list-item-title>
              <v-list-item-subtitle
                v-if="item.metode_pembayaran === 'transfer'"
              >
                Transfer
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else> Tunai </v-list-item-subtitle>
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
  // eslint-disable-next-line camelcase
  alpha_spaces,
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

extend('alpha_spaces', {
  // eslint-disable-next-line camelcase
  ...alpha_spaces,
  message: '{_field_} hanya dapat diisi dengan huruf',
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

  layout: 'nazhir',

  async asyncData({ store }) {
    return {
      dataWakaf: await store.dispatch('getDataWakaf'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    dialogInput: false,
    inputTanggal: false,
    isLoading: false,
    search: '',
    expanded: [],
    singleExpand: true,
    jenisWakaf: [
      { text: 'Wakaf Temporer', value: 'temporer' },
      { text: 'Wakaf Permanent', value: 'permanen' },
    ],

    metode: [
      { text: 'Tunai', value: 'tunai' },
      { text: 'Transfer', value: 'transfer' },
    ],

    headers: [
      { text: 'Tanggal', value: 'tanggal_transaksi' },
      { text: 'Nama', value: 'nama_wakif' },
      { text: 'Nomor AIW', value: 'nomor_aiw' },
      { text: 'Jenis Wakaf', value: 'jenis_wakaf' },
      { text: 'Jangka Temporer', value: 'jangka_waktu_temporer' },
      { text: 'Nominal Wakaf', value: 'nominal' },
      { text: '', value: 'data-table-expand' },
    ],

    inputItem: {
      tanggal_transaksi: '',
      nama_wakif: '',
      nik: '',
      nomor_aiw: '',
      alamat: '',
      telepon: '',
      jenis_wakaf: '',
      jangka_waktu_temporer: '',
      metode_pembayaran: '',
      nominal: '',
    },
    defaultItem: {
      tanggal_transaksi: '',
      nama_wakif: '',
      nik: '',
      nomor_aiw: '',
      alamat: '',
      telepon: '',
      jenis_wakaf: '',
      jangka_waktu_temporer: '',
      metode_pembayaran: '',
      nominal: '',
    },
  }),

  computed: {},

  methods: {
    async handleRefreshList() {
      this.dataWakaf = await this.$store.dispatch('getDataWakaf')
    },

    async handleInput() {
      const {
        // eslint-disable-next-line camelcase
        tanggal_transaksi,
        // eslint-disable-next-line camelcase
        nama_wakif,
        nik,
        // eslint-disable-next-line camelcase
        nomor_aiw,
        alamat,
        telepon,
        // eslint-disable-next-line camelcase
        jenis_wakaf,
        // eslint-disable-next-line camelcase
        jangka_waktu_temporer,
        // eslint-disable-next-line camelcase
        metode_pembayaran,
        nominal,
      } = this.inputItem
      this.isLoading = true
      try {
        await this.$store.dispatch('createDataWakaf', {
          tanggal_transaksi,
          nama_wakif,
          nik,
          nomor_aiw,
          alamat,
          telepon,
          jenis_wakaf,
          jangka_waktu_temporer,
          metode_pembayaran,
          nominal,
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
