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
      <v-col class="d-flex justify-end col-md-4">
        <!-- popup input data -->
        <v-dialog v-model="dialogInput" max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Input Pelunasan Piutang
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Input Pelunasan Piutang</b></span
              >
            </v-card-title>
            <v-form class="px-10 pt-10">
              <v-text-field
                v-model="inputItem.tanggal_cicilan"
                class="pt-1"
                label="Tanggal Cicilan"
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="inputItem.nik"
                class="pt-1"
                label="Nomor Induk Kependudukan"
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="inputItem.jumlah_cicilan"
                class="pt-1"
                label="Jumlah Cicilan"
                dense
                required
              ></v-text-field>
            </v-form>

            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeInput">
                Batal
              </v-btn>
              <v-btn :color="colorTheme" dark depressed @click="handleInput">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- popup delete data -->
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
      dataPelunasan: await store.dispatch('getDataPelunasan'),
    }
  },
  data: () => ({
    colorTheme: '#388E3C',
    dialogInput: false,
    dialogDelete: false,
    search: '',
    headers: [
      { text: 'Tgl. Cicilan', value: 'tanggal_cicilan' },
      { text: 'Nama Peminjam', value: 'nama_peminjam' },
      { text: 'NIK', value: 'nik' },
      { text: 'Jumlah Cicilan', value: 'jumlah_cicilan' },
      { text: 'Kekurangan', value: 'kekurangan' },
      { text: 'Tgl. Jatuh Tempo', value: 'tanggal_jatuh_tempo' },
      { text: 'Status', value: 'pelunasan' },
      { text: 'Aksi', value: 'aksi2', sortable: false },
    ],
    inputItem: {
      id: '',
      tanggal_cicilan: '',
      nik: '',
      jumlah_cicilan: '',
    },
    defaultItem: {
      id: '',
      tanggal_cicilan: '',
      nik: '',
      jumlah_cicilan: '',
    },
  }),

  methods: {
    async handleRefreshList() {
      this.dataPelunasan = await this.$store.dispatch('getDataPelunasan')
    },

    async handleInput() {
      const {
        // eslint-disable-next-line camelcase
        tanggal_cicilan,
        nik,
        // eslint-disable-next-line camelcase
        jumlah_cicilan,
      } = this.inputItem
      this.isLoading = true
      try {
        await this.$store.dispatch('createDataPelunasan', {
          tanggal_cicilan,
          nik,
          jumlah_cicilan,
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

    showDelete({ item: { id } }) {
      this.dialogDelete = true
      this.editedItem = { ...this.editedItem, id }
    },

    handleDelete() {
      this.$store
        .dispatch('deleteDataPelunasanIndividu', this.editedItem.id)
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
