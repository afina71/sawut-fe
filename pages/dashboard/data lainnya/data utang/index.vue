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
        <v-dialog v-model="dialog" max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Input Data Utang
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Input {{ formTitle }} Data Utang</b></span
              >
            </v-card-title>
            <v-card-action class="white">
              <v-form ref="loginForm" class="px-10 py-5">
                <v-autocomplete
                  v-model="editedItem.kategori_utang"
                  class="pt-1"
                  :items="kategoriUtang"
                  label="Kategori Utang"
                  dense
                  required
                ></v-autocomplete>
                <v-text-field
                  v-model="editedItem.nominal_utang"
                  class="pt-1"
                  label="Nominal"
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
    <v-data-table :headers="headers" :items="dataUtang" :search="search">
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
    kategoriUtang: ['Utang Biaya', 'Utang Jangka Panjang'],
    colorTheme: '#1B7A13',
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      { text: 'Kategori Utang', value: 'kategori_utang' },
      { text: 'Nominal', value: 'nominal_utang' },
      { text: 'Keterangan', value: 'keterangan' },
      { text: 'Aksi', value: 'actions', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
      { text: 'Approval', value: 'approval', sortable: false },
    ],
    dataUtang: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      kategori_utang: '',
      nominal_utang: '',
      keterangan: '',
      status: 'Checking',
      approval: false,
    },
    defaultItem: {
      id: '',
      kategori_utang: '',
      nominal_utang: '',
      keterangan: '',
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
      this.dataUtang = [
        {
          id: 0,
          kategori_utang: 'Utang Biaya',
          nominal_utang: 50000,
          keterangan: '-',
          status: 'Approved',
          approval: true,
        },
        {
          id: 1,
          kategori_utang: 'Utang Jangka Panjang',
          nominal_utang: 500000,
          keterangan: '-',
          status: 'Checking',
          approval: false,
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.dataUtang.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.dataUtang.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.dataUtang.splice(this.editedIndex, 1)
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
        Object.assign(this.dataUtang[this.editedIndex], this.editedItem)
      } else {
        this.dataUtang.push(this.editedItem)
      }
      this.close()
    },

    getColor(item) {
      const index = this.dataUtang.indexOf(item)
      const isApproved = this.dataUtang[index].approval

      if (isApproved) return 'green'
      else return 'red'
    },

    selectItem(item) {
      const index = this.dataUtang.indexOf(item)
      const isApproved = this.dataUtang[index].approval

      if (isApproved) {
        this.dataUtang[index].status = 'Approved'
      } else {
        this.dataUtang[index].status = 'Checking'
      }
    },
  },
}
</script>
