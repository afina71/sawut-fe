<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Daftar Pelunasan Piutang</div>
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

      <!-- popup form -->
      <v-col class="d-flex justify-end col-md-4"></v-col>
    </v-row>

    <!-- data tabel -->
    <v-data-table
      :headers="headers"
      :items="dataPelunasan.data"
      :search="search"
      sort-by="tanggal_cicilan"
    >
      <template #cell(tanggal_cicilan)="{ item: { tanggal_cicilan } }">
        <span>{{ tanggal_cicilan }}</span>
      </template>
      <template #cell(nama_peminjam)="{ item: { nama_peminjam } }">
        <span>{{ nama_peminjam }}</span>
      </template>
      <template #cell(nik)="{ item: { nik } }">
        <span>{{ nik }}</span>
      </template>
      <template #cell(jumlah_cicilan)="{ item: { jumlah_cicilan } }">
        <span>{{ jumlah_cicilan }}</span>
      </template>
      <template #cell(kekurangan)="{ item: { kekurangan } }">
        <span>{{ kekurangan }}</span>
      </template>
      <template #cell(tanggal_jatuh_tempo)="{ item: { tanggal_jatuh_tempo } }">
        <span>{{ tanggal_jatuh_tempo }}</span>
      </template>
      <template #[`item.pelunasan`]="{ item }">
        <v-chip v-if="item.pelunasan === `Belum Lunas`" color="red" dark>
          {{ item.pelunasan }}
        </v-chip>
        <v-chip v-else color="green" dark>
          {{ item.pelunasan }}
        </v-chip>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  layout: 'beranda',
  async asyncData({ store }) {
    return {
      dataPelunasan: await store.dispatch('getDataPelunasan'),
    }
  },
  data: () => ({
    colorTheme: '#388E3C',
    search: '',
    headers: [
      { text: 'Tgl. Cicilan', value: 'tanggal_cicilan' },
      { text: 'Nama Peminjam', value: 'nama_peminjam' },
      { text: 'NIK', value: 'nik' },
      { text: 'Jumlah Cicilan', value: 'jumlah_cicilan' },
      { text: 'Kekurangan', value: 'kekurangan' },
      { text: 'Tgl. Jatuh Tempo', value: 'tanggal_jatuh_tempo' },
      { text: 'Status', value: 'pelunasan' },
      { text: 'Aksi', value: 'aksi', sortable: false },
      { text: '', value: 'aksi2', sortable: false },
    ],
    defaultItem: {
      id: '',
      tanggal_cicilan: '',
      nik: '',
      jumlah_cicilan: '',
    },
  }),
}
</script>
