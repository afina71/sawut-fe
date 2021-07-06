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
        <!-- dialog approval -->
        <v-dialog v-model="dialogApprove" max-width="500px">
          <v-card class="rounded-xl px-5 pt-10 pb-5">
            <v-card-subtitle class="headline text-body-1"
              >Setujui Pengajuan dana ini?</v-card-subtitle
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeApprove"
                >Batal</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn :color="colorTheme" dark depressed @click="handleApprove"
                >Setujui</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- dialog penyaluran -->
        <v-dialog v-model="dialogPenyaluran" max-width="500px">
          <v-card class="rounded-xl px-5 pt-10 pb-5">
            <v-card-subtitle class="headline text-body-1"
              >Apakah Pengajuan dana ini sudah disalurkan?</v-card-subtitle
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closePenyaluran"
                >Belum</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                :color="colorTheme"
                dark
                depressed
                @click="handlePenyaluran"
                >Sudah</v-btn
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
      <template #[`item.jenis_piutang`]="{ item: { jenis_piutang } }">
        <span v-if="jenis_piutang === 'pjp'">Jangka Pendek</span>
        <span v-else>Jangka Panjang</span>
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
                  <v-list-item-subtitle
                    v-if="item.jenis_usaha === 'perdagangan'"
                  >
                    Perdagangan
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-else-if="item.jenis_usaha === 'fashion'"
                  >
                    Fashion
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="item.jenis_usaha === 'otomotif'">
                    Otomotif
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-else-if="item.jenis_usaha === 'kerajinan'"
                  >
                    Kerajinan
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else-if="item.jenis_usaha === 'it'">
                    IT
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else> Lainnya </v-list-item-subtitle>
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
                  <v-list-item-subtitle
                    v-if="item.sumber_biaya === 'bagihasil'"
                  >
                    Bagi Hasil
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else>
                    Non Bagi Hasil
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </td>
      </template>
      <template #[`item.kelayakan`]="{ item }">
        <v-chip v-if="item.kelayakan === 0" color="red" dark>
          Tidak Layak
        </v-chip>
        <v-chip v-else color="green" dark> Layak </v-chip>
      </template>
      <template #[`item.approval`]="{ item: { id, approval } }">
        <v-chip v-if="approval === 1" color="green" dark>Approved</v-chip>
        <v-chip v-else color="red" dark @click="showApprove(id)">
          Unapprove
        </v-chip>
      </template>
      <template #[`item.penyaluran`]="{ item: { id, penyaluran } }">
        <v-chip v-if="penyaluran === 1" color="green" dark>Disalurkan</v-chip>
        <v-chip v-else color="red" dark @click="showPenyaluran(id)">
          Belum Disalurkan
        </v-chip>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  layout: 'bendahara',
  async asyncData({ store }) {
    return {
      dataPenyaluran: await store.dispatch('getDataPenyaluran'),
    }
  },
  data: () => ({
    colorTheme: '#388E3C',
    dialogApprove: false,
    dialogPenyaluran: false,
    search: '',
    expanded: [],
    singleExpand: true,
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
    ],
    editedItem: {
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

    showApprove(id) {
      this.dialogApprove = true
      this.editedItem = { ...this.editedItem, id }
    },

    handleApprove() {
      this.$store
        .dispatch('persetujuanPenyaluran', this.editedItem.id)
        .then(() =>
          this.handleRefreshList()
            .then(() => this.closeApprove())
            .then(() => (this.isLoading = false))
        )
        .catch(() => (this.isLoading = false))
    },

    closeApprove() {
      this.dialogApprove = false
    },

    showPenyaluran(id) {
      this.dialogPenyaluran = true
      this.editedItem = { ...this.editedItem, id }
    },

    handlePenyaluran() {
      this.$store
        .dispatch('penyaluranManfaat', this.editedItem.id)
        .then(() =>
          this.handleRefreshList()
            .then(() => this.closePenyaluran())
            .then(() => (this.isLoading = false))
        )
        .catch(() => (this.isLoading = false))
    },

    closePenyaluran() {
      this.dialogPenyaluran = false
    },
  },
}
</script>
