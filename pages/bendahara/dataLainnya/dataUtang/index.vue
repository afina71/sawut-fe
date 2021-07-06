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

      <!-- popup add/edit data -->
      <v-col class="d-flex justify-end col-md-4"></v-col>
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
export default {
  layout: 'bendahara',
  async asyncData({ store }) {
    return {
      dataUtang: await store.dispatch('getDataUtang'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    search: '',
    headers: [
      { text: 'Kategori Utang', value: 'kategori_utang' },
      { text: 'Nominal', value: 'nominal' },
      { text: 'Keterangan', value: 'keterangan_utang' },
    ],
  }),
}
</script>
