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
        <!-- edit data -->
        <v-dialog v-model="dialogEdit" max-width="600px">
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Edit Data Penyaluran</b></span
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
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.nominal_peminjaman"
                    class="pt-1"
                    label="Nominal Peminjaman"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.nik"
                    class="pt-1"
                    label="Nomor Induk Kependudukan"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.telepon"
                    class="pt-1"
                    label="Telepon"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.alamat"
                    class="pt-1"
                    label="Alamat"
                    dense
                  ></v-text-field>
                  <v-autocomplete
                    v-model="editedItem.jenis_usaha"
                    class="pt-1"
                    :items="jenisUsaha"
                    label="Jenis Usaha"
                    dense
                  ></v-autocomplete>
                  <v-text-field
                    v-model="editedItem.deskripsi_usaha"
                    class="pt-1"
                    label="Deskripsi Usaha"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="editedItem.jenis_piutang"
                    class="pt-1"
                    :items="jenisPiutang"
                    label="Jenis Piutang"
                    dense
                  ></v-autocomplete>
                  <v-autocomplete
                    v-model="editedItem.sumber_biaya"
                    class="pt-1"
                    :items="sumberBiaya"
                    label="Sumber Biaya"
                    dense
                  ></v-autocomplete>
                  <v-text-field
                    v-model="editedItem.periode_peminjaman"
                    class="pt-1"
                    label="Periode Peminjaman (Bulan)"
                    dense
                  ></v-text-field>
                  <v-menu
                    v-model="editedTanggal1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.periode_awal"
                        label="Periode Awal"
                        append-icon="mdi-calendar"
                        readonly
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.periode_awal"
                      color="green darken-1"
                      @input="editedTanggal1 = false"
                    ></v-date-picker>
                  </v-menu>
                  <v-menu
                    v-model="editedTanggal2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.periode_akhir"
                        label="Periode Akhir"
                        append-icon="mdi-calendar"
                        readonly
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.periode_akhir"
                      color="green darken-1"
                      @input="editedTanggal2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-form>

            <v-card-actions class="py-5 pb-5 pr-10">
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeEdit">
                Batal
              </v-btn>
              <v-btn
                depressed
                class="white--text rounded-lg green darken-1"
                :disabled="areAllEditsEmpty"
                @click="handleEdit"
              >
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
      <template #[`item.approval`]="{ item: { approval } }">
        <v-chip v-if="approval === 1" color="green" dark>Approved</v-chip>
        <v-chip v-else color="red" dark> Unapprove </v-chip>
      </template>
      <template #[`item.penyaluran`]="{ item: { penyaluran } }">
        <v-chip v-if="penyaluran === 1" color="green" dark>Disalurkan</v-chip>
        <v-chip v-else color="red" dark> Belum Disalurkan </v-chip>
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
  layout: 'akuntan',
  async asyncData({ store }) {
    return {
      dataPenyaluran: await store.dispatch('getDataPenyaluran'),
    }
  },
  data: () => ({
    colorTheme: '#388E3C',
    dialogEdit: false,
    dialogDelete: false,
    editedTanggal1: false,
    editedTanggal2: false,
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

  computed: {
    areAllEditsEmpty() {
      return Object.values(this.editedItem).some((value) => !value)
    },
  },

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
    },
  },
}
</script>
