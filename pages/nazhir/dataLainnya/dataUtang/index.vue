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

      <!-- popup -->
      <v-col class="d-flex justify-end col-md-4">
        <!-- dialog input data -->
        <v-dialog v-model="dialogInput" max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Input Data Utang
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Input Data Utang</b></span
              >
            </v-card-title>

            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form class="pa-10" @submit.prevent="handleInput">
                <validation-provider
                  v-slot="{ errors }"
                  name="Kategori Utang"
                  rules="required"
                >
                  <v-autocomplete
                    v-model="inputItem.kategori_utang"
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
                    v-model="inputItem.nominal"
                    :error-messages="errors"
                    label="Nominal (Rupiah)"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Keterangan Utang"
                  rules="required"
                >
                  <v-text-field
                    v-model="inputItem.keterangan_utang"
                    :error-messages="errors"
                    label="Keterangan Utang"
                  ></v-text-field>
                </validation-provider>

                <v-row class="pt-5">
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

  layout: 'nazhir',
  async asyncData({ store }) {
    return {
      dataUtang: await store.dispatch('getDataUtang'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    dialogInput: false,
    kategoriUtang: [
      { text: 'Utang Biaya', value: 'biaya' },
      { text: 'Utang Jangka Panjang', value: 'jangkapanjang' },
    ],
    search: '',
    headers: [
      { text: 'Kategori Utang', value: 'kategori_utang' },
      { text: 'Nominal', value: 'nominal' },
      { text: 'Keterangan', value: 'keterangan_utang' },
    ],

    inputItem: {
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

  computed: {},

  methods: {
    async handleRefreshList() {
      this.dataUtang = await this.$store.dispatch('getDataUtang')
    },

    async handleInput() {
      const {
        // eslint-disable-next-line camelcase
        kategori_utang,
        nominal,
        // eslint-disable-next-line camelcase
        keterangan_utang,
      } = this.inputItem
      this.isLoading = true
      try {
        await this.$store.dispatch('createDataUtang', {
          kategori_utang,
          nominal,
          keterangan_utang,
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
