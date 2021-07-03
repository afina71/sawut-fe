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
      <v-col class="d-flex justify-end col-md-4">
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
                  <div class="text-subtitle-2">Informasi Wakif</div>
                  <v-text-field
                    v-model="editedItem.tanggal_transaksi"
                    class="pt-1"
                    label="Tanggal Transaksi"
                    dense
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.nama_wakif"
                    class="pt-1"
                    label="Nama Wakif"
                    dense
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.nik"
                    class="pt-1"
                    label="NIK"
                    dense
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.telepon"
                    class="pt-1"
                    label="Nomor Telepon"
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
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="6">
                  <div class="text-subtitle-2">Informasi Wakaf</div>
                  <v-text-field
                    v-model="editedItem.nomor_aiw"
                    class="pt-1"
                    label="Nomor AIW"
                    dense
                    required
                  ></v-text-field>
                  <v-autocomplete
                    v-model="editedItem.jenis_wakaf"
                    class="pt-1"
                    :items="jenisWakaf"
                    label="Jenis Wakaf"
                    dense
                    required
                  ></v-autocomplete>
                  <v-text-field
                    v-model="editedItem.jangka_waktu_temporer"
                    class="pt-1"
                    label="Jangka Waktu"
                    dense
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.nominal"
                    class="pt-1"
                    label="Nominal Wakaf"
                    dense
                    required
                  ></v-text-field>
                  <v-autocomplete
                    v-model="editedItem.metode_pembayaran"
                    class="pt-1"
                    :items="metode"
                    label="Metode Pembayaran"
                    dense
                    required
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-form>

            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeEdit">
                Batal
              </v-btn>
              <v-btn :color="colorTheme" dark depressed @click="handleEdit">
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
      dataWakaf: await store.dispatch('getDataWakaf'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    dialogEdit: false,
    dialogDelete: false,
    search: '',
    expanded: [],
    singleExpand: true,
    jenisWakaf: [
      { text: 'Wakaf Temporer', value: 'temporer' },
      { text: 'Wakaf Permanent', value: 'permanen' },
    ],

    metode: [
      { text: 'Tunai', value: 'tunai' },
      { text: 'Transfer', value: 'transfer' },
    ],

    headers: [
      { text: 'Tanggal', value: 'tanggal_transaksi' },
      { text: 'Nama', value: 'nama_wakif' },
      { text: 'Nomor AIW', value: 'nomor_aiw' },
      { text: 'Jenis Wakaf', value: 'jenis_wakaf' },
      { text: 'Jangka Temporer', value: 'jangka_waktu_temporer' },
      { text: 'Metode Pembayaran', value: 'metode_pembayaran' },
      { text: 'Nominal Wakaf', value: 'nominal' },
      { text: '', value: 'data-table-expand' },
      { text: 'Aksi', value: 'aksi' },
      { text: '', value: 'aksi2' },
    ],

    editedIndex: -1,
    editedItem: {
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

  methods: {
    async handleRefreshList() {
      this.dataWakaf = await this.$store.dispatch('getDataWakaf')
    },

    showEdit({
      item: {
        id, // eslint-disable-next-line camelcase
        tanggal_transaksi,
        // eslint-disable-next-line camelcase
        nama_wakif,
        nik,
        // eslint-disable-next-line camelcase
        nomor_aiw,
        alamat,
        telepon,
        // eslint-disable-next-line camelcase
        jenis_wakaf,
        // eslint-disable-next-line camelcase
        jangka_waktu_temporer,
        // eslint-disable-next-line camelcase
        metode_pembayaran,
        nominal,
      },
    }) {
      this.dialogEdit = true
      this.editedItem = {
        ...this.editedItem,
        id,
        tanggal_transaksi,
        nama_wakif,
        nik,
        nomor_aiw,
        alamat,
        telepon,
        jenis_wakaf,
        jangka_waktu_temporer,
        metode_pembayaran,
        nominal,
      }
    },

    handleEdit() {
      const { id } = this.editedItem
      this.isLoading = true
      this.$store
        .dispatch('updateDataWakafIndividu', [
          id,
          {
            tanggal_transaksi: this.editedItem.tanggal_transaksi,
            nama_wakif: this.editedItem.nama_wakif,
            nik: this.editedItem.nik,
            nomor_aiw: this.editedItem.nomor_aiw,
            alamat: this.editedItem.alamat,
            telepon: this.editedItem.telepon,
            jenis_wakaf: this.editedItem.jenis_wakaf,
            jangka_waktu_temporer: this.editedItem.jangka_waktu_temporer,
            metode_pembayaran: this.editedItem.metode_pembayaran,
            nominal: this.editedItem.nominal,
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
        .dispatch('deleteDataWakafIndividu', this.editedItem.id)
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
  },
}
</script>
