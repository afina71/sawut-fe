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
        <!-- edit data -->
        <v-dialog v-model="dialogEdit" max-width="600px">
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Edit Data Wakaf</b></span
              >
            </v-card-title>
            <v-form class="px-10 pt-10">
              <v-row justify="space-between">
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editedItem.nama_penerima"
                    class="pt-1"
                    label="Nama Penerima"
                    dense
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.nominal_peminjaman"
                    class="pt-1"
                    label="Nominal Peminjaman"
                    dense
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.nik"
                    class="pt-1"
                    label="Nomor Induk Kependudukan"
                    dense
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.telepon"
                    class="pt-1"
                    label="Telepon"
                    dense
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.alamat"
                    class="pt-1"
                    label="Alamat"
                    dense
                    required
                  ></v-text-field>
                  <v-autocomplete
                    v-model="editedItem.jenis_usaha"
                    class="pt-1"
                    :items="jenisUsaha"
                    label="Jenis Usaha"
                    dense
                    required
                  ></v-autocomplete>
                  <v-text-field
                    v-model="editedItem.deskripsi_usaha"
                    class="pt-1"
                    label="Deskripsi Usaha"
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="editedItem.jenis_piutang"
                    class="pt-1"
                    :items="jenisPiutang"
                    label="Jenis Piutang"
                    dense
                    required
                  ></v-autocomplete>
                  <v-autocomplete
                    v-model="editedItem.sumber_biaya"
                    class="pt-1"
                    :items="sumberBiaya"
                    label="Sumber Biaya"
                    dense
                    required
                  ></v-autocomplete>
                  <v-text-field
                    v-model="editedItem.periode_peminjaman"
                    class="pt-1"
                    label="Periode Peminjaman"
                    dense
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.periode_awal"
                    class="pt-1"
                    label="Periode Awal"
                    dense
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.periode_akhir"
                    class="pt-1"
                    label="Periode Akhir"
                    dense
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>

            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeEdit">
                Batal
              </v-btn>
              <v-btn color="blue darken-1" text @click.prevent="handleEdit">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- delete data -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="rounded-xl">
            <v-card-subtitle class="headline pt-10 text-body-1"
              >Apa Anda yakin ingin menghapus data ini?</v-card-subtitle
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Batal</v-btn
              >
              <v-btn color="blue darken-1" text @click="handleDelete"
                >Iya</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- dialog approval -->
        <v-dialog v-model="dialogApprove" max-width="500px">
          <v-card class="rounded-xl">
            <v-card-subtitle class="headline pt-10 px-10 text-body-1"
              >Setujui Pengajuan dana ini?</v-card-subtitle
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeApprove"
                >Batal</v-btn
              >
              <v-btn color="blue darken-1" text @click="handleApprove"
                >Iya</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- dialog penyaluran -->
        <v-dialog v-model="dialogPenyaluran" max-width="500px">
          <v-card class="rounded-xl">
            <v-card-subtitle class="headline pt-10 px-10 text-body-1"
              >Apakah Pengajuan dana ini sudah disalurkan?</v-card-subtitle
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closePenyaluran"
                >Belum</v-btn
              >
              <v-btn color="blue darken-1" text @click="handlePenyaluran"
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
      <template #[`item.approval`]="{ item: { id, approval } }">
        <v-chip v-if="approval === `1`" color="green" dark>Approved</v-chip>
        <v-chip v-else color="red" dark @click="showApprove(id)">
          Unapprove
        </v-chip>
      </template>
      <template #[`item.penyaluran`]="{ item: { id, penyaluran } }">
        <v-chip v-if="penyaluran === `1`" color="green" dark>Disalurkan</v-chip>
        <v-chip v-else color="red" dark @click="showPenyaluran(id)">
          Belum Disalurkan
        </v-chip>
      </template>
      <template #[`item.aksi`]="row">
        <v-icon small @click="showEdit(row)"> mdi-pencil </v-icon>
      </template>
      <template #[`item.aksi2`]="row">
        <v-icon small @click="showDelete(row)"> mdi-delete </v-icon>
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
    colorTheme: '#388E3C',
    dialogInput: false,
    dialogEdit: false,
    dialogDelete: false,
    dialogApprove: false,
    dialogPenyaluran: false,
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
      { text: 'Aksi', value: 'aksi' },
      { text: '', value: 'aksi2' },
    ],
    editedIndex: -1,
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

    showEdit({
      item: {
        id, // eslint-disable-next-line camelcase
        nama_penerima,
        nik,
        telepon,
        alamat,
        // eslint-disable-next-line camelcase
        jenis_usaha,
        // eslint-disable-next-line camelcase
        deskripsi_usaha,
        // eslint-disable-next-line camelcase
        nominal_peminjaman,
        // eslint-disable-next-line camelcase
        jenis_piutang,
        // eslint-disable-next-line camelcase
        sumber_biaya,
        // eslint-disable-next-line camelcase
        periode_peminjaman,
        // eslint-disable-next-line camelcase
        periode_awal,
        // eslint-disable-next-line camelcase
        periode_akhir,
      },
    }) {
      this.dialogEdit = true
      this.editedItem = {
        ...this.editedItem,
        id,
        nama_penerima,
        nik,
        telepon,
        alamat,
        jenis_usaha,
        deskripsi_usaha,
        nominal_peminjaman,
        jenis_piutang,
        sumber_biaya,
        periode_peminjaman,
        periode_awal,
        periode_akhir,
      }
    },

    handleEdit() {
      const { id } = this.editedItem
      this.isLoading = true
      this.$store
        .dispatch('updateDataPenyaluran', [
          id,
          {
            nama_penerima: this.editedItem.nama_penerima,
            nik: this.editedItem.nik,
            telepon: this.editedItem.telepon,
            alamat: this.editedItem.alamat,
            jenis_usaha: this.editedItem.jenis_usaha,
            deskripsi_usaha: this.editedItem.deskripsi_usaha,
            nominal_peminjaman: this.editedItem.nominal_peminjaman,
            jenis_piutang: this.editedItem.jenis_piutang,
            sumber_biaya: this.editedItem.sumber_biaya,
            periode_peminjaman: this.editedItem.periode_peminjaman,
            periode_awal: this.editedItem.periode_awal,
            periode_akhir: this.editedItem.periode_akhir,
          },
        ])
        .then(() =>
          this.handleRefreshList()
            .then(() => this.closeEdit())
            .then(() => (this.isLoading = false))
        )
        .catch(() => (this.isLoading = false))
    },

    closeEdit() {
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
}
</script>
