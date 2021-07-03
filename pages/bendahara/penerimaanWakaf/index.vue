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
      <v-col class="d-flex justify-end col-md-4"></v-col>
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
      <template #cell(jenis_wakaf)="{ item: { jenis_wakaf } }">
        <span>{{ jenis_wakaf }}</span>
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
              <v-list-item-subtitle>
                {{ item.metode_pembayaran }}
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
  layout: 'bendahara',
  async asyncData({ store }) {
    return {
      dataWakaf: await store.dispatch('getDataWakaf'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    search: '',
    expanded: [],
    singleExpand: true,

    headers: [
      { text: 'Tanggal', value: 'tanggal_transaksi' },
      { text: 'Nama', value: 'nama_wakif' },
      { text: 'Nomor AIW', value: 'nomor_aiw' },
      { text: 'Jenis Wakaf', value: 'jenis_wakaf' },
      { text: 'Jangka Temporer', value: 'jangka_waktu_temporer' },
      { text: 'Metode Pembayaran', value: 'metode_pembayaran' },
      { text: 'Nominal Wakaf', value: 'nominal' },
    ],

    defaultItem: {
      id: '',
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
}
</script>
