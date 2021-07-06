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

        <!-- dialog pencairan -->
        <v-dialog v-model="dialogPencairan" max-width="500px">
          <v-card class="rounded-xl px-5 pt-10 pb-5">
            <v-card-subtitle class="headline text-body-1"
              >Apakah pengajuan dana ini sudah cair?</v-card-subtitle
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closePencairan"
                >Belum</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn :color="colorTheme" dark depressed @click="handlePencairan"
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
      <template #[`item.approval`]="{ item: { id, approval } }">
        <v-chip v-if="approval === 1" color="green" dark>Approved</v-chip>
        <v-chip v-else color="red" dark @click="showApprove(id)">
          Unapprove
        </v-chip>
      </template>
      <template #[`item.pencairan`]="{ item: { id, pencairan } }">
        <v-chip v-if="pencairan === 1" color="green" dark>Sudah Cair</v-chip>
        <v-chip v-else color="red" dark @click="showPencairan(id)">
          Belum Cair
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
      dataPengajuan: await store.dispatch('getDataPengajuan'),
    }
  },
  data: () => ({
    colorTheme: '#388E3C',
    dialogApprove: false,
    dialogPencairan: false,
    isLoading: false,
    search: '',
    headers: [
      { text: 'Nama Pengaju', value: 'nama_pengaju' },
      { text: 'Kategori Biaya', value: 'kategori_biaya' },
      { text: 'Keterangan', value: 'keterangan_biaya' },
      { text: 'Nominal', value: 'nominal' },
      { text: 'Sumber Biaya', value: 'sumber_biaya' },
      { text: 'Approval', value: 'approval', sortable: false },
      { text: 'Pencairan', value: 'pencairan' },
    ],
    editedItem: {
      id: '',
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

  methods: {
    async handleRefreshList() {
      this.dataPengajuan = await this.$store.dispatch('getDataPengajuan')
    },

    showApprove(id) {
      this.dialogApprove = true
      this.editedItem = { ...this.editedItem, id }
    },

    handleApprove() {
      this.$store
        .dispatch('editDataPengajuan', this.editedItem.id)
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

    showPencairan(id) {
      this.dialogPencairan = true
      this.editedItem = { ...this.editedItem, id }
    },

    handlePencairan() {
      this.$store
        .dispatch('pencairanDataPengajuan', this.editedItem.id)
        .then(() =>
          this.handleRefreshList()
            .then(() => this.closePencairan())
            .then(() => (this.isLoading = false))
        )
        .catch(() => (this.isLoading = false))
    },

    closePencairan() {
      this.dialogPencairan = false
    },
  },
}
</script>
