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

      <!-- popup -->
      <v-col class="d-flex justify-end col-md-4">
        <!-- dialog input data -->
        <v-dialog v-model="dialogInput" max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Input Pengajuan Biaya
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Input Pengajuan Biaya</b></span
              >
            </v-card-title>
            <v-form class="px-10 pt-10">
              <v-text-field
                v-model="inputItem.nama_pengaju"
                class="pt-1"
                label="Nama Pengaju"
                dense
                required
              ></v-text-field>
              <v-autocomplete
                v-model="inputItem.kategori_biaya"
                class="pt-1"
                :items="kategoriBiaya"
                label="Kategori Biaya"
                dense
                required
                item-text="name"
                item-value="name"
              ></v-autocomplete>
              <v-text-field
                v-model="inputItem.keterangan_biaya"
                class="pt-1"
                label="Keterangan Biaya"
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="inputItem.nominal"
                class="pt-1"
                label="Nominal"
                dense
                required
              ></v-text-field>
              <v-autocomplete
                v-model="inputItem.sumber_biaya"
                class="pt-1"
                :items="sumberBiaya"
                label="Sumber Biaya"
                dense
                required
              ></v-autocomplete>
            </v-form>

            <v-card-actions class="py-5 pb-5 pr-10">
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeInput">
                Batal
              </v-btn>
              <v-btn
                depressed
                class="white--text rounded-lg green darken-1"
                :disabled="areAllInputsEmpty"
                @click="handleInput"
              >
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <!-- data tabel -->
    <v-data-table
      :headers="headers"
      :items="dataPengajuan.data"
      :search="search"
      sort-by="nama_pengaju"
    >
      <template #cell(nama_pengaju)="{ item: { nama_pengaju } }">
        <span>{{ nama_pengaju }}</span>
      </template>
      <template #cell(kategori_biaya)="{ item: { kategori_biaya } }">
        <span>{{ kategori_biaya }}</span>
      </template>
      <template #cell(keterangan_biaya)="{ item: { keterangan_biaya } }">
        <span>{{ keterangan_biaya }}</span>
      </template>
      <template #cell(nominal)="{ item: { nominal } }">
        <span>{{ nominal }}</span>
      </template>
      <template #[`item.sumber_biaya`]="{ item: { sumber_biaya } }">
        <span v-if="sumber_biaya === 'tunai'">Tunai</span>
        <span v-else-if="sumber_biaya === 'bagihasil'">Bagi Hasil</span>
        <span v-else>Non Bagi hasil</span>
      </template>
      <template #[`item.approval`]="{ item: { approval } }">
        <v-chip v-if="approval === 1" color="green" dark>Approved</v-chip>
        <v-chip v-else color="red" dark> Unapprove </v-chip>
      </template>
      <template #[`item.pencairan`]="{ item: { pencairan } }">
        <v-chip v-if="pencairan === 1" color="green" dark>Sudah Cair</v-chip>
        <v-chip v-else color="red" dark> Belum Cair </v-chip>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  layout: 'nazhir',
  async asyncData({ store }) {
    return {
      dataPengajuan: await store.dispatch('getDataPengajuan'),
    }
  },
  data: () => ({
    colorTheme: '#388E3C',
    dialogInput: false,
    search: '',
    kategoriBiaya: [
      { header: 'Beban Pengelolaan dan Pengembangan Wakaf' },
      { name: 'Beban ATK', group: 'Group 1', value: 'atk' },
      { name: 'Beban Pemasaran', group: 'Group 1', value: 'pemasaran' },
      { name: 'Beban Rapat', group: 'Group 1', value: 'rapat' },
      {
        name: 'Beban Penyaluran Manfaat Wakaf',
        group: 'Group 1',
        value: 'penyaluran',
      },
      {
        name: 'Beban Administrasi Bank',
        group: 'Group 1',
        value: 'administrasi',
      },
      { name: 'Beban Pajak', group: 'Group 1', value: 'pajak' },
      { divider: true },
      { header: 'Bagian Nazhir atas Pengelolaan dan Pengembangan Wakaf' },
      { name: 'Insentif Nazhir', group: 'Group 2', value: 'insentif' },
      {
        name: 'Tunjangan Kesehatan ',
        group: 'Group 2',
        value: 'tunjanganKesehatan',
      },
      { divider: true },
      { header: 'Pentasyarufan Manfaat Wakaf' },
      { name: 'Kegiatan Ekonomi Umat', group: 'Group 2', value: 'ekonomiUmat' },
      {
        name: 'Kegiatan Kesejahteraan Umum',
        group: 'Group 2',
        value: 'kesejahteraan',
      },
      { name: 'Kegiatan Ibadah', group: 'Group 2', value: 'ibadah' },
      { name: 'Kegiatan Pendidikan', group: 'Group 2', value: 'pendidikan' },
      { name: 'Kegiatan Kesehatan', group: 'Group 2', value: 'kesehatan' },
      { name: 'Kegiatan Bantuan', group: 'Group 2', value: 'bantuan' },
    ],
    sumberBiaya: [
      {
        text: 'Kas Tunai',
        value: 'tunai',
      },
      {
        text: 'Kas Tabungan Bagi Hasil',
        value: 'bagihasil',
      },
      {
        text: 'Kas Tabungan Non Bagi Hasil',
        value: 'nonbagihasil',
      },
    ],
    headers: [
      { text: 'Nama Pengaju', value: 'nama_pengaju' },
      { text: 'Kategori Biaya', value: 'kategori_biaya' },
      { text: 'Keterangan', value: 'keterangan_biaya' },
      { text: 'Nominal', value: 'nominal' },
      { text: 'Sumber Biaya', value: 'sumber_biaya' },
      { text: 'Approval', value: 'approval', sortable: false },
      { text: 'Pencairan', value: 'pencairan' },
    ],

    inputItem: {
      nama_pengaju: '',
      kategori_biaya: '',
      keterangan_biaya: '',
      nominal: '',
      sumber_biaya: '',
    },
    defaultItem: {
      nama_pengaju: '',
      kategori_biaya: '',
      keterangan_biaya: '',
      nominal: '',
      sumber_biaya: '',
    },
  }),

  computed: {
    areAllInputsEmpty() {
      return Object.values(this.inputItem).some((value) => !value)
    },
  },

  methods: {
    async handleRefreshList() {
      this.dataPengajuan = await this.$store.dispatch('getDataPengajuan')
    },

    async handleInput() {
      const {
        // eslint-disable-next-line camelcase
        nama_pengaju,
        // eslint-disable-next-line camelcase
        kategori_biaya,
        // eslint-disable-next-line camelcase
        keterangan_biaya,
        nominal,
        // eslint-disable-next-line camelcase
        sumber_biaya,
      } = this.inputItem
      this.isLoading = true
      try {
        await this.$store.dispatch('createDataPengajuan', {
          nama_pengaju,
          kategori_biaya,
          keterangan_biaya,
          nominal,
          sumber_biaya,
        })
        this.isLoading = false
        this.handleRefreshList()
      } catch (error) {
        this.isLoading = false
      }
      this.closeInput()
    },

    closeInput() {
      this.dialogInput = false
      this.$nextTick(() => {
        this.inputItem = Object.assign({}, this.defaultItem)
      })
    },
  },
}
</script>
