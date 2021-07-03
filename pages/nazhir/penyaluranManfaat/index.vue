<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Informasi Penyaluran Manfaat</div>
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
        <v-btn :color="colorTheme" dark depressed to="/dashboard/creditScoring">
          Input Data Penyaluran
        </v-btn>

        <!-- delete data -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="rounded-xl px-5 pt-10 pb-5">
            <v-card-subtitle class="headline text-body-1"
              >Apa Anda yakin ingin menghapus data ini?</v-card-subtitle
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeDelete"
                >Batal</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn :color="colorTheme" dark depressed @click="handleDelete"
                >Iya</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <!-- data tabel -->
    <v-data-table
      :headers="headers"
      :items="dataPenyaluran.data"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      show-expand
      :search="search"
      sort-by="nama_penerima"
    >
      <template #cell(nama_penerima)="{ item: { nama_penerima } }">
        <span>{{ nama_penerima }}</span>
      </template>
      <template #cell(nominal_peminjaman)="{ item: { nominal_peminjaman } }">
        <span>{{ nominal_peminjaman }}</span>
      </template>
      <template #cell(jenis_piutang)="{ item: { jenis_piutang } }">
        <span>{{ jenis_piutang }}</span>
      </template>
      <template #cell(periode_akhir)="{ item: { periode_akhir } }">
        <span>{{ periode_akhir }}</span>
      </template>
      <template #expanded-item="{ item }">
        <td :colspan="headers.length">
          <v-row>
            <v-col>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title
                    >Nomor Induk Kependudukan</v-list-item-title
                  >
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
            </v-col>
            <v-col>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Periode Pinjaman</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.periode_peminjaman }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Periode Awal</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.periode_awal }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Sumber Biaya</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.sumber_biaya }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </td>
      </template>
      <template #[`item.kelayakan`]="{ item }">
        <v-chip v-if="item.kelayakan === `0`" color="red" dark>
          Tidak Layak
        </v-chip>
        <v-chip v-else color="green" dark> Layak </v-chip>
      </template>
      <template #[`item.approval`]="{ item: { approval } }">
        <v-chip v-if="approval === `1`" color="green" dark>Approved</v-chip>
        <v-chip v-else color="red" dark> Unapprove </v-chip>
      </template>
      <template #[`item.penyaluran`]="{ item: { penyaluran } }">
        <v-chip v-if="penyaluran === `1`" color="green" dark>Disalurkan</v-chip>
        <v-chip v-else color="red" dark> Belum Disalurkan </v-chip>
      </template>
      <template #[`item.aksi2`]="row">
        <v-icon small @click="showDelete(row)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  layout: 'nazhir',
  async asyncData({ store }) {
    return {
      dataPenyaluran: await store.dispatch('getDataPenyaluran'),
    }
  },
  data: () => ({
    colorTheme: '#388E3C',
    dialogInput: false,
    dialogDelete: false,
    search: '',
    expanded: [],
    singleExpand: true,
    jenisUsaha: [
      { text: 'Perdagangan', value: 'perdagangan' },
      { text: 'Fashion', value: 'fashion' },
      { text: 'Otomotif', value: 'otomotif' },
      { text: 'Kerajinan', value: 'kerajinan' },
      { text: 'IT', value: 'it' },
      { text: 'Lainnya', value: 'lainnya' },
    ],
    sumberBiaya: [
      { text: 'Bagi Hasil', value: 'bagihasil' },
      { text: 'Non Bagi Hasil', value: 'nonbagihasil' },
    ],
    jenisPiutang: [
      { text: 'Piutang Jangka Pendek', value: 'pjp' },
      { text: 'Piutang Jangka Panjang', value: 'pja' },
    ],
    headers: [
      { text: 'Nama', value: 'nama_penerima' },
      { text: 'Nominal', value: 'nominal_peminjaman' },
      { text: 'Jenis Piutang', value: 'jenis_piutang' },
      { text: 'Periode Awal', value: 'periode_awal' },
      { text: 'Periode Akhir', value: 'periode_akhir' },
      { text: '', value: 'data-table-expand' },
      { text: 'Kelayakan', value: 'kelayakan' },
      { text: 'Status', value: 'approval' },
      { text: 'Penyaluran', value: 'penyaluran' },
      { text: 'Aksi', value: 'aksi2' },
    ],
    inputItem: {
      id: '',
      nama_penerima: '',
      nik: '',
      telepon: '',
      alamat: '',
      jenis_usaha: '',
      deskripsi_usaha: '',
      nominal_peminjaman: '',
      jenis_piutang: '',
      sumber_biaya: '',
      periode_peminjaman: '',
      periode_awal: '',
      periode_akhir: '',
    },
    defaultItem: {
      id: '',
      nama_penerima: '',
      nik: '',
      telepon: '',
      alamat: '',
      jenis_usaha: '',
      deskripsi_usaha: '',
      nominal_peminjaman: '',
      jenis_piutang: '',
      sumber_biaya: '',
      periode_peminjaman: '',
      periode_awal: '',
      periode_akhir: '',
    },
  }),

  methods: {
    async handleRefreshList() {
      this.dataPenyaluran = await this.$store.dispatch('getDataPenyaluran')
    },

    showDelete({ item: { id } }) {
      this.dialogDelete = true
      this.editedItem = { ...this.editedItem, id }
    },

    handleDelete() {
      this.$store
        .dispatch('deleteDataPenyaluran', this.editedItem.id)
        .then(() =>
          this.handleRefreshList()
            .then(() => this.closeDelete())
            .then(() => (this.isLoading = false))
        )
        .catch(() => (this.isLoading = false))
    },

    closeDelete() {
      this.dialogDelete = false
    },
  },
}
</script>
