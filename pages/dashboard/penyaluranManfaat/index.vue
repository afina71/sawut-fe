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
            <!-- <v-card-action class="white">
              <v-form class="px-10 py-5">
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
            </v-card-action> -->

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
      :items="dataPenyaluran"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      show-expand
      :search="search"
      sort-by="nama"
    >
      <template #cell(nama)="{ item: { nama } }">
        <span>{{ nama }}</span>
      </template>
      <template #cell(nominal)="{ item: { nominal } }">
        <span>{{ nominal }}</span>
      </template>
      <template #cell(sumber_biaya)="{ item: { sumber_biaya } }">
        <span>{{ sumber_biaya }}</span>
      </template>
      <template #cell(telepon)="{ item: { telepon } }">
        <span>{{ telepon }}</span>
      </template>
      <template #cell(jenis_wakaf)="{ item: { jenis_wakaf } }">
        <span>{{ jenis_wakaf }}</span>
      </template>
      <template
        #cell(jangka_waktu_temporer)="{ item: { jangka_waktu_temporer } }"
      >
        <span>{{ jangka_waktu_temporer }}</span>
      </template>
      <template #cell(metode_pembayaran)="{ item: { metode_pembayaran } }">
        <span>{{ metode_pembayaran }}</span>
      </template>
      <template #cell(jenis_piutang)="{ item: { jenis_piutang } }">
        <span>{{ jenis_piutang }}</span>
      </template>
      <template #cell(periode_peminjaman)="{ item: { periode_peminjaman } }">
        <span>{{ periode_peminjaman }}</span>
      </template>
      <template #cell(periode_awal)="{ item: { periode_awal } }">
        <span>{{ periode_awal }}</span>
      </template>
      <template #cell(periode_akhir)="{ item: { periode_akhir } }">
        <span>{{ periode_akhir }}</span>
      </template>
      <template #[`item.aksi`]="row">
        <a @click="showEdit(row)"> Edit </a>
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
              <v-list-item-title>telepon</v-list-item-title>
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
              <v-list-item-title>Jenis Usaha</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.jenis_usaha }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Deskripsi Usaha</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.deskripsi_usaha }}
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
  layout: 'default',
  async asyncData({ store }) {
    return {
      dataPenyaluran: await store.dispatch('getDataPenyaluran'),
    }
  },
  data: () => ({
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
    colorTheme: '#388E3C',
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Nama', value: 'nama' },
      { text: 'Nominal', value: 'nominal' },
      { text: 'Sumber Pencairan Dana', value: 'sumber_biaya' },
      { text: 'Jenis Piutang', value: 'jenis_piutang' },
      { text: 'Periode Peminjaman', value: 'periode_peminjaman' },
      { text: 'Periode Awal', value: 'periode_awal' },
      { text: 'Periode Akhir', value: 'periode_akhir' },
      { text: 'Aksi', value: 'aksi' },
      { text: '', value: 'data-table-expand' },
    ],
    // pengelolaanwakaf: [],
    // // editedIndex: -1,
    // editedItem: { akun_asal: '', akun_tujuan: '', saldo: '' },
    defaultItem: { akun_asal: '', akun_tujuan: '', saldo: '' },
  }),

  computed: {},

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {
    // async pindahSaldo() {
    //   const {
    //     // eslint-disable-next-line camelcase
    //     akun_asal,
    //     // eslint-disable-next-line camelcase
    //     akun_tujuan,
    //     saldo,
    //   } = this.editedItem
    //   this.isLoading = true
    //   try {
    //     await this.$store.dispatch('createDataKas', {
    //       akun_asal,
    //       akun_tujuan,
    //       saldo,
    //     })
    //     this.isLoading = false
    //     this.handleRefreshList()
    //   } catch (error) {
    //     this.isLoading = false
    //   }
    //   this.close()
    // },
    // async handleRefreshList() {
    //   this.dataWakaf = await this.$store.dispatch('getDataKas')
    // },
    // close() {
    //   this.dialog = false
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem)
    //     this.editedIndex = -1
    //   })
    // },
  },
}
</script>
