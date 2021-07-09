<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Informasi Saldo Pengelolaan Wakaf</div>
    </v-row>
    <v-row class="pb-10">
      <v-spacer></v-spacer>

      <!-- popup pindah data -->
      <v-col class="d-flex justify-end col-md-4"></v-col>
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
    headers: [
      { text: 'Nama Akun', value: 'kas' },
      { text: 'Saldo', value: 'saldo' },
    ],
  }),
}
</script>
