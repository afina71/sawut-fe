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
        <!-- input data -->
        <v-dialog v-model="dialogInput" max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Input Data
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Input Data Wakaf</b></span
              >
            </v-card-title>
            <v-card-action class="white">
              <v-form class="px-10 py-5">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="inputItem.tanggal_transaksi"
                  transition="scale-transition"
                  offset-x
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="inputItem.tanggal_transaksi"
                      label="Tanggal Beli"
                      dense
                      required
                      append-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="inputItem.tanggal_transaksi"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(inputItem.tanggal_transaksi)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
                <v-text-field
                  v-model="inputItem.nama_wakif"
                  class="pt-1"
                  label="Nama Wakif"
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="inputItem.nik"
                  class="pt-1"
                  label="NIK"
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="inputItem.nomor_aiw"
                  class="pt-1"
                  label="Nomor AIW"
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="inputItem.telepon"
                  class="pt-1"
                  label="Nomor Telepon"
                  dense
                  required
                ></v-text-field>
                <v-autocomplete
                  v-model="inputItem.jenis_wakaf"
                  class="pt-1"
                  :items="jenisWakaf"
                  label="Jenis Wakaf"
                  dense
                  required
                ></v-autocomplete>
                <v-text-field
                  v-model="inputItem.jangka_waktu_temporer"
                  class="pt-1"
                  label="Jangka Waktu"
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="inputItem.nominal"
                  class="pt-1"
                  label="Nominal Wakaf"
                  dense
                  required
                ></v-text-field>
                <v-autocomplete
                  v-model="inputItem.metode_pembayaran"
                  class="pt-1"
                  :items="metode"
                  label="Metode Pembayaran"
                  dense
                  required
                ></v-autocomplete>
                <v-text-field
                  v-model="inputItem.alamat"
                  class="pt-1"
                  label="Alamat"
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="inputItem.keterangan"
                  class="pt-1"
                  label="Keterangan"
                  dense
                  required
                ></v-text-field>
              </v-form>
            </v-card-action>

            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeInput">
                Batal
              </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Simpan </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- edit data -->
        <v-dialog v-model="dialogEdit" max-width="450px">
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Edit Data Wakaf</b></span
              >
            </v-card-title>
            <v-card-action class="white">
              <v-form class="px-10 py-5">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="editedItem.tanggal_transaksi"
                  transition="scale-transition"
                  offset-x
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.tanggal_transaksi"
                      label="Tanggal Beli"
                      dense
                      required
                      append-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.tanggal_transaksi"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary"> Cancel </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.save(editItem.tanggal_transaksi)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
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
                  v-model="editedItem.nomor_aiw"
                  class="pt-1"
                  label="Nomor AIW"
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
                <v-text-field
                  v-model="editedItem.alamat"
                  class="pt-1"
                  label="Alamat"
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.keterangan"
                  class="pt-1"
                  label="Keterangan"
                  dense
                  required
                ></v-text-field>
              </v-form>
            </v-card-action>

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
        <!-- dialog delete -->
        <!-- <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="rounded-xl">
            <v-card-title class="headline"
              >Apa Anda yakin ingin menghapus data ini?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Batal</v-btn
              >
              <v-btn color="blue darken-1" text @click="handleDelete"
                >Iya</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
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
      <template #cell(metode_pembayaran)="{ item: { metode_pembayaran } }">
        <span>{{ metode_pembayaran }}</span>
      </template>
      <template #cell(nominal)="{ item: { nominal } }">
        <span>{{ nominal }}</span>
      </template>
      <template #[`item.aksi`]="row">
        <a @click="showEdit(row)"> Edit </a>
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
              <v-list-item-title>telepon</v-list-item-title>
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
              <v-list-item-title>Keterangan</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.keterangan }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-spacer></v-spacer>
          <v-col class="d-flex justify-end col-md-4">
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Apa Anda yakin ingin menghapus data Wakif atas nama
                  <b>{{ item.nama_wakif }}</b> ini?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Batal</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="handleDelete"
                    >Iya</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-btn text color="primary" @click="dialogDelete"> Delete </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  layout: 'default',
  async asyncData({ store }) {
    return {
      dataWakaf: await store.dispatch('getDataWakaf'),
    }
  },
  // async asyncData({ $axios }) {
  //   const dataWakaf = await $axios.$get(
  //     'http://127.0.0.1:8000/api/wakaf/penerimaan'
  //   )
  //   return dataWakaf
  // },
  data: () => ({
    colorTheme: '#388E3C',
    dialogInput: false,
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
      {
        text: 'Tanggal',
        align: 'start',
        sortable: false,
        value: 'tanggal_transaksi',
      },
      { text: 'Nama', value: 'nama_wakif' },
      // { text: 'NIK', value: 'NIK' },
      { text: 'Nomor AIW', value: 'nomor_aiw' },
      // { text: 'Alamat', value: 'alamat' },
      // { text: 'Phone', value: 'telepon' },
      { text: 'Jenis Wakaf', value: 'jenis_wakaf' },
      { text: 'Jangka Temporer', value: 'jangka_waktu_temporer' },
      { text: 'Metode Pembayaran', value: 'metode_pembayaran' },
      { text: 'Nominal Wakaf', value: 'nominal' },
      { text: 'Aksi', value: 'aksi' },
      // { text: 'Keterangan', value: 'keterangan' },
      { text: '', value: 'data-table-expand' },
    ],
    // dataWakaf: [],
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
      keterangan: '',
    },
    inputItem: {
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
      keterangan: '',
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
      keterangan: '',
    },
  }),

  computed: {},

  methods: {
    async save() {
      const {
        // eslint-disable-next-line camelcase
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
        keterangan,
      } = this.inputItem
      this.isLoading = true
      try {
        await this.$store.dispatch('createDataWakaf', {
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
          keterangan,
        })
        this.isLoading = false
        this.handleRefreshList()
      } catch (error) {
        this.isLoading = false
      }
      this.closeInput()
    },
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
        keterangan,
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
        keterangan,
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
            keterangan: this.editedItem.keterangan,
          },
        ])
        .then(() =>
          this.closeEdit()
            .then(() => this.handleRefreshList())
            .then(() => (this.isLoading = false))
        )
        // .then(
        //   this.handleRefreshList().then(
        //     () => (this.isLoading = false),
        //     (this.dialog = false),
        //     this.close()
        //   )
        // )
        .catch(() => (this.isLoading = false))
    },
    // eslint-disable-next-line camelcase
    showDelete({ item: { id, nama_wakif } }) {
      this.dialogDelete = true
      this.editedItem = { ...this.editedItem, id, nama_wakif }
    },
    handleDelete() {
      this.$store
        .dispatch('deleteDataWakafIndividu', this.editedItem.id)
        .then(() =>
          this.handleRefreshList().then(() => (this.isLoading = false))
        )
        .catch(() => (this.isLoading = false))
    },

    // deleteItem(item) {
    //   this.editedIndex = this.desserts.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialogDelete = true
    // },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    closeInput() {
      this.dialogInput = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeEdit() {
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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
