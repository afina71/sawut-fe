<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Data Utang</div>
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
        <!-- dialog input data -->
        <v-dialog v-model="dialogInput" max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Input Data Utang
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Input Data Utang</b></span
              >
            </v-card-title>
            <v-form class="px-10 pt-10">
              <v-autocomplete
                v-model="inputItem.kategori_utang"
                class="pt-1"
                :items="kategoriUtang"
                label="Kategori Utang"
                dense
                required
              ></v-autocomplete>
              <v-text-field
                v-model="inputItem.nominal"
                class="pt-1"
                label="Nominal"
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="inputItem.keterangan_utang"
                class="pt-1"
                label="Keterangan Utang"
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
        <!-- dialog edit data -->
        <v-dialog v-model="dialogEdit" max-width="450px">
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Edit Data Wakaf</b></span
              >
            </v-card-title>
            <v-form class="px-10 pt-10">
              <v-autocomplete
                v-model="editedItem.kategori_utang"
                class="pt-1"
                :items="kategoriUtang"
                label="Kategori Utang"
                dense
                required
              ></v-autocomplete>
              <v-text-field
                v-model="editedItem.nominal"
                class="pt-1"
                label="Nominal"
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="editedItem.keterangan_utang"
                class="pt-1"
                label="Keterangan Utang"
                dense
                required
              ></v-text-field>
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
        <!-- dialog delete -->
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
    <v-data-table :headers="headers" :items="dataUtang.data" :search="search">
      <template #cell(kategori_utang)="{ item: { kategori_utang } }">
        <span>{{ kategori_utang }}</span>
      </template>
      <template #cell(nominal)="{ item: { nominal } }">
        <span>{{ nominal }}</span>
      </template>
      <template #cell(keterangan_utang)="{ item: { keterangan_utang } }">
        <span>{{ keterangan_utang }}</span>
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
      dataUtang: await store.dispatch('getDataUtang'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    dialogInput: false,
    dialogEdit: false,
    dialogDelete: false,
    kategoriUtang: [
      { text: 'Utang Biaya', value: 'biaya' },
      { text: 'Utang Jangka Panjang', value: 'jangkapanjang' },
    ],
    search: '',
    headers: [
      { text: 'Kategori Utang', value: 'kategori_utang' },
      { text: 'Nominal', value: 'nominal' },
      { text: 'Keterangan', value: 'keterangan_utang' },
      // { text: 'Approval', value: 'approval', sortable: false },
      { text: 'Aksi', value: 'aksi', sortable: false },
      { text: '', value: 'aksi2', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: '',
      kategori_utang: '',
      nominal: '',
      keterangan_utang: '',
    },
    inputItem: {
      id: '',
      kategori_utang: '',
      nominal: '',
      keterangan_utang: '',
    },
    defaultItem: {
      id: '',
      kategori_utang: '',
      nominal: '',
      keterangan_utang: '',
    },
  }),

  methods: {
    async handleRefreshList() {
      this.dataUtang = await this.$store.dispatch('getDataUtang')
    },

    async handleInput() {
      const {
        // eslint-disable-next-line camelcase
        kategori_utang,
        nominal,
        // eslint-disable-next-line camelcase
        keterangan_utang,
      } = this.inputItem
      this.isLoading = true
      try {
        await this.$store.dispatch('createDataUtang', {
          kategori_utang,
          nominal,
          keterangan_utang,
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

    showEdit({
      item: {
        id, // eslint-disable-next-line camelcase
        kategori_utang,
        nominal,
        // eslint-disable-next-line camelcase
        keterangan_utang,
      },
    }) {
      this.dialogEdit = true
      this.editedItem = {
        ...this.editedItem,
        id,
        kategori_utang,
        nominal,
        keterangan_utang,
      }
    },

    handleEdit() {
      const { id } = this.editedItem
      this.isLoading = true
      this.$store
        .dispatch('updateDataUtang', [
          id,
          {
            kategori_utang: this.editedItem.kategori_utang,
            nominal: this.editedItem.nominal,
            keterangan_utang: this.editedItem.keterangan_utang,
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
        .dispatch('deleteDataUtang', this.editedItem.id)
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
    // getColor(item) {
    //   const index = this.dataUtang.indexOf(item)
    //   const isApproved = this.dataUtang[index].approval
    //   if (isApproved) return 'green'
    //   else return 'red'
    // },
  },
}
</script>
