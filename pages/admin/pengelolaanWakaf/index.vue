<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Informasi Saldo Pengelolaan Wakaf</div>
    </v-row>
    <v-row class="pb-10">
      <v-spacer></v-spacer>

      <!-- popup pindah data -->
      <v-col class="d-flex justify-end col-md-4">
        <v-dialog v-model="dialog" max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Pindah Pengelolaan Wakaf
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Pemindahan Saldo Kas </b></span
              >
            </v-card-title>

            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form class="pa-10" @submit.prevent="pindahSaldo">
                <validation-provider
                  v-slot="{ errors }"
                  name="Akun Asal"
                  rules="required"
                >
                  <v-autocomplete
                    v-model="editedItem.akun_asal"
                    :error-messages="errors"
                    :items="namaKas"
                    item-text="text"
                    item-value="value"
                    label="Akun Asal"
                  ></v-autocomplete>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Akun Tujuan"
                  rules="required"
                >
                  <v-autocomplete
                    v-model="editedItem.akun_tujuan"
                    :error-messages="errors"
                    :items="namaKas"
                    item-text="text"
                    item-value="value"
                    label="Akun Tujuan"
                  ></v-autocomplete>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Jumlah"
                  rules="required|numeric|is_not:0"
                >
                  <v-text-field
                    v-model="editedItem.saldo"
                    :error-messages="errors"
                    label="Jumlah"
                  ></v-text-field>
                </validation-provider>

                <v-row class="pt-5">
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="close">
                    Batal
                  </v-btn>
                  <v-btn
                    depressed
                    class="white--text rounded-lg green darken-1"
                    type="submit"
                    :disabled="invalid"
                  >
                    Pindah
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
      :items="dataKas"
      :search="search"
      sort-by="kas"
    >
      <template #cell(kas)="{ item: { kas } }">
        <span>{{ kas }}</span>
      </template>
      <template #cell(saldo)="{ item: { saldo } }">
        <span>{{ saldo }}</span>
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

  layout: 'default',
  async asyncData({ store }) {
    return {
      dataKas: await store.dispatch('getDataKas'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    dialog: false,
    dialogDelete: false,
    search: '',
    namaKas: [
      {
        text: 'Kas Tunai',
        value: 'tunai',
      },
      {
        text: 'Kas Tabungan Wakaf',
        value: 'tabwakaf',
      },
      {
        text: 'Kas Deposito',
        value: 'deposito',
      },
      {
        text: 'Kas Tabungan Bagi Hasil',
        value: 'tabbagihasil',
      },
      {
        text: 'Kas Tabungan Non Bagi Hasil',
        value: 'tabnonbagihasil',
      },
    ],
    headers: [
      { text: 'Nama Akun', value: 'kas' },
      { text: 'Saldo', value: 'saldo' },
    ],
    editedItem: { akun_asal: '', akun_tujuan: '', saldo: '' },
    defaultItem: { akun_asal: '', akun_tujuan: '', saldo: '' },
  }),

  computed: {},

  methods: {
    async pindahSaldo() {
      const {
        // eslint-disable-next-line camelcase
        akun_asal,
        // eslint-disable-next-line camelcase
        akun_tujuan,
        saldo,
      } = this.editedItem
      this.isLoading = true
      try {
        await this.$store.dispatch('createDataKas', {
          akun_asal,
          akun_tujuan,
          saldo,
        })
        this.$refs.observer.reset()
        this.isLoading = false
        this.handleRefreshList()
      } catch (error) {
        this.isLoading = false
      }
      this.close()
    },
    async handleRefreshList() {
      this.dataKas = await this.$store.dispatch('getDataKas')
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.$refs.observer.reset()
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
  },
}
</script>
