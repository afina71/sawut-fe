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
      <v-col class="d-flex justify-end col-md-4"></v-col>
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
  layout: 'bendahara',
  async asyncData({ store }) {
    return {
      dataAsetTetap: await store.dispatch('getDataAsetTetap'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    expanded: [],
    singleExpand: true,
    search: '',
    isLoading: false,
    headers: [
      { text: 'Tanggal Beli', value: 'tanggal_beli' },
      { text: 'Nama Aset', value: 'nama_aset' },
      { text: 'Kelompok', value: 'kelompok' },
      { text: 'Harga Perolehan', value: 'harga_perolehan' },
      { text: '', value: 'data-table-expand' },
    ],
  }),
}
</script>
