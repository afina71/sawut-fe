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
            <v-form class="px-10 pt-10">
              <v-autocomplete
                v-model="editedItem.akun_asal"
                class="pt-1"
                :items="namaKas"
                item-text="text"
                item-value="value"
                label="Akun Asal"
                dense
                required
              ></v-autocomplete>
              <v-autocomplete
                v-model="editedItem.akun_tujuan"
                class="pt-1"
                :items="namaKas"
                item-text="text"
                item-value="value"
                label="Akun Tujuan"
                dense
                required
              ></v-autocomplete>
              <v-text-field
                v-model="editedItem.saldo"
                class="pt-1"
                label="Jumlah"
                dense
                required
              ></v-text-field>
            </v-form>

            <v-card-actions class="py-5 pb-5 pr-10">
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="close"> Batal </v-btn>
              <v-btn
                depressed
                class="white--text rounded-lg green darken-1"
                :disabled="areAllEditsEmpty"
                @click="pindahSaldo"
              >
                Pindah
              </v-btn>
            </v-card-actions>
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
export default {
  layout: 'akuntan',
  async asyncData({ store }) {
    return {
      dataKas: await store.dispatch('getDataKas'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    dialog: false,
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

  computed: {
    areAllEditsEmpty() {
      return Object.values(this.editedItem).some((value) => !value)
    },
  },

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
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
  },
}
</script>
