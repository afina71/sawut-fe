<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Daftar Pengajuan Biaya Operasional</div>
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
      <v-col class="d-flex justify-end col-md-4">
        <v-dialog v-model="dialog" max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Input Pengajuan Biaya
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Input {{ formTitle }} Pengajuan Biaya</b></span
              >
            </v-card-title>
            <v-card-action class="white">
              <v-form ref="loginForm" class="px-10 py-5">
                <v-text-field
                  v-model="editedItem.nama_pengaju"
                  class="pt-1"
                  label="Nama Pengaju"
                  dense
                  required
                ></v-text-field>
                <v-autocomplete
                  v-model="editedItem.kategori_biaya"
                  class="pt-1"
                  :items="kategoriBiaya"
                  label="Kategori Biaya"
                  dense
                  required
                  item-text="name"
                  item-value="name"
                ></v-autocomplete>
                <v-text-field
                  v-model="editedItem.keterangan"
                  class="pt-1"
                  label="Keterangan"
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.nominal_pengajuan"
                  class="pt-1"
                  label="Nominal"
                  dense
                  required
                ></v-text-field>
                <v-autocomplete
                  v-model="editedItem.sumber_biaya"
                  class="pt-1"
                  :items="sumberBiaya"
                  label="Sumber Biaya"
                  dense
                  required
                ></v-autocomplete>
              </v-form>
            </v-card-action>

            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Batal </v-btn>
              <v-btn color="blue darken-1" text @click="save()"> Simpan </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Apa Anda yakin ingin menghapus data ini?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Batal</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >Iya</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <!-- data tabel -->
    <v-data-table :headers="headers" :items="pengajuanBiaya" :search="search">
      <template #[`item.pencairan`]="{ item }">
        <v-chip :color="getColor(item)" dark>
          {{ item.pencairan }}
        </v-chip>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
      <template #[`item.status`]="{ item }">
        <v-chip :color="getColor(item)" dark>
          {{ item.status }}
        </v-chip>
      </template>
      <template #[`item.approval`]="{ item }">
        <v-simple-checkbox
          v-model="item.approval"
          show-select
          item-key="nama_pengaju"
          @click="selectItem(item)"
        ></v-simple-checkbox>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  layout: 'default',
  data: () => ({
    kategoriBiaya: [
      { header: 'Beban Pengelolaan dan Pengembangan Wakaf' },
      { name: 'Beban ATK', group: 'Group 1' },
      { name: 'Beban Pemasaran', group: 'Group 1' },
      { name: 'Beban Rapat', group: 'Group 1' },
      { name: 'Beban Penyaluran Manfaat Wakaf', group: 'Group 1' },
      { name: 'Beban Administrasi Bank', group: 'Group 1' },
      { name: 'Beban Pajak', group: 'Group 1' },
      { divider: true },
      { header: 'Bagian Nazhir atas Pengelolaan dan Pengembangan Wakaf' },
      { name: 'Insentif Nazhir', group: 'Group 2' },
      { name: 'Tunjangan Kesehatan ', group: 'Group 2' },
      { divider: true },
      { header: 'Pentasyarufan Manfaat Wakaf' },
      { name: 'Kegiatan Ekonomi Umat', group: 'Group 2' },
      { name: 'Kegiatan Kesejahteraan Umum', group: 'Group 2' },
      { name: 'Kegiatan Ibadah', group: 'Group 2' },
      { name: 'Kegiatan Pendidikan', group: 'Group 2' },
      { name: 'Kegiatan Kesehatan', group: 'Group 2' },
      { name: 'Kegiatan Bantuan', group: 'Group 2' },
    ],
    sumberBiaya: [
      'Kas Tunai',
      'Kas Tabungan Bagi Hasil',
      'Kas Tabungan Non Bagi Hasil',
    ],
    colorTheme: '#1B7A13',
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      { text: 'Nama Pengaju', value: 'nama_pengaju' },
      { text: 'Kategori Biaya', value: 'kategori_biaya' },
      { text: 'Keterangan', value: 'keterangan' },
      { text: 'Nominal', value: 'nominal_pengajuan' },
      { text: 'Sumber Biaya', value: 'sumber_biaya' },
      { text: 'Pencairan', value: 'pencairan' },
      { text: 'Aksi', value: 'actions', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
      { text: 'Approval', value: 'approval', sortable: false },
    ],
    pengajuanBiaya: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      nama_pengaju: '',
      kategori_biaya: '',
      keterangan: '',
      nominal_pengajuan: '',
      sumber_biaya: '',
      pencairan: 'Belum Cair',
      status: 'Checking',
      approval: false,
    },
    defaultItem: {
      id: '',
      nama_pengaju: '',
      kategori_biaya: '',
      keterangan: '',
      nominal_pengajuan: '',
      sumber_biaya: '',
      pencairan: 'Belum Cair',
      status: 'Checking',
      approval: false,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Input Data' : 'Edit Data'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.pengajuanBiaya = [
        {
          id: 0,
          nama_pengaju: 'aaaa',
          kategori_biaya: 'Beban ATK',
          keterangan: 'Print AIW',
          nominal_pengajuan: 500000,
          sumber_biaya: 'Kas Tunai',
          pencairan: 'Sudah Cair',
          status: 'Approved',
          approval: true,
        },
        {
          id: 1,
          nama_pengaju: 'bbbb',
          kategori_biaya: 'Kegiatan Bantuan',
          keterangan: 'Bantuan Anak Yatim',
          nominal_pengajuan: 100000,
          sumber_biaya: 'Kas Tunai',
          pencairan: 'Belum Cair',
          status: 'Checking',
          approval: false,
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.pengajuanBiaya.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.pengajuanBiaya.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.pengajuanBiaya.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.pengajuanBiaya[this.editedIndex], this.editedItem)
      } else {
        this.pengajuanBiaya.push(this.editedItem)
      }
      this.close()
    },

    getColor(item) {
      const index = this.pengajuanBiaya.indexOf(item)
      const isApproved = this.pengajuanBiaya[index].approval

      if (isApproved) return 'green'
      else return 'red'
    },

    selectItem(item) {
      const index = this.pengajuanBiaya.indexOf(item)
      const isApproved = this.pengajuanBiaya[index].approval

      if (isApproved) {
        this.pengajuanBiaya[index].pencairan = 'Sudah Cair'
        this.pengajuanBiaya[index].status = 'Approved'
      } else {
        this.pengajuanBiaya[index].pencairan = 'Belum Cair'
        this.pengajuanBiaya[index].status = 'Checking'
      }
    },
  },
}
</script>
