<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Informasi Saldo Pengelolaan Wakaf</div>
    </v-row>
    <v-row class="pb-10">
      <v-spacer></v-spacer>

      <!-- popup add data -->
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
                ><b> Pemindahan Saldo {{ formTitle }} Pengelolaan </b></span
              >
            </v-card-title>
            <v-card-action class="white">
              <v-form ref="loginForm" class="px-10 py-5">
                <v-autocomplete
                  v-model="editedItem.akun_asal"
                  class="pt-1"
                  :items="namaakun"
                  item-text="text"
                  item-value="value"
                  label="Akun Asal"
                  dense
                  required
                ></v-autocomplete>
                <v-autocomplete
                  v-model="editedItem.akun_tujuan"
                  class="pt-1"
                  :items="namaakun"
                  item-text="text"
                  item-value="value"
                  label="Akun Tujuan"
                  dense
                  required
                ></v-autocomplete>
                <v-text-field
                  v-model="editedItem.jumlah_pemindahan"
                  class="pt-1"
                  label="Jumlah"
                  dense
                  required
                ></v-text-field>
              </v-form>
            </v-card-action>

            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Batal </v-btn>
              <v-btn color="blue darken-1" text @click="pindahSaldo">
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
      :items="pengelolaanwakaf"
      :hide-default-footer="true"
    >
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  layout: 'default',
  data: () => ({
    namaakun: [
      {
        value: 0,
        text: 'Kas Tunai',
      },
      {
        value: 1,
        text: 'Kas Tabungan Wakaf',
      },
      {
        value: 2,
        text: 'Kas Deposito',
      },
      {
        value: 3,
        text: 'Kas Tabungan Bagi Hasil',
      },
      {
        value: 4,
        text: 'Kas Tabungan Non Bagi Hasil',
      },
    ],
    colorTheme: '#1B7A13',
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Nama Akun', value: 'nama_akun' },
      { text: 'Saldo', value: 'jumlah_pemindahan' },
    ],
    pengelolaanwakaf: [],
    editedIndex: -1,
    editedItem: { nama_akun: '', jumlah_pemindahan: '' },
    defaultItem: { nama_akun: '', jumlah_pemindahan: '' },
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
      this.pengelolaanwakaf = [
        {
          nama_akun: 'Kas Tunai',
          jumlah_pemindahan: 50.0,
        },
        {
          nama_akun: 'Kas Tabungan Wakaf',
          jumlah_pemindahan: 50.0,
        },
        {
          nama_akun: 'Kas Tabungan Deposito',
          jumlah_pemindahan: 50.0,
        },
        {
          nama_akun: 'Kas Tabungan Bagi Hasil',
          jumlah_pemindahan: 50.0,
        },
        {
          nama_akun: 'Kas Tabungan Non Bagi Hasil',
          jumlah_pemindahan: 50.0,
        },
      ]
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    pindahSaldo() {
      // mengecek akun asal tidak sama dengan akun tujuan
      if (this.editedItem.akun_asal === this.editedItem.akun_tujuan) {
        this.close()
      }

      // mengecek sisa saldo lebih besar saldo pemindahan
      if (
        this.pengelolaanwakaf[this.editedItem.akun_asal].jumlah_pemindahan >
        parseInt(this.editedItem.jumlah_pemindahan)
      ) {
        this.close()
      }

      this.pengelolaanwakaf[
        this.editedItem.akun_asal
      ].jumlah_pemindahan -= parseInt(this.editedItem.jumlah_pemindahan)

      this.pengelolaanwakaf[
        this.editedItem.akun_tujuan
      ].jumlah_pemindahan += parseInt(this.editedItem.jumlah_pemindahan)

      this.close()
    },
  },
}
</script>
