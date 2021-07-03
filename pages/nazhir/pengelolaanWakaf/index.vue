<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Informasi Saldo Pengelolaan Wakaf</div>
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
  layout: 'nazhir',
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
  }),
}
</script>
