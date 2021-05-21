<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Daftar Pengguna</div>
    </v-row>
    <v-row class="pb-10">
      <v-spacer></v-spacer>

      <!-- popup add/edit data -->
      <v-col class="d-flex justify-end col-md-4">
        <v-dialog v-model="dialog" max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Tambahkan Pengguna
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Tambah {{ formTitle }} Pengguna</b></span
              >
            </v-card-title>
            <v-card-action class="white">
              <v-form ref="loginForm" class="px-10 py-5">
                <v-text-field
                  v-model="editedItem.nama_pengguna"
                  class="pt-1"
                  label="Nama Pengguna"
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.email"
                  class="pt-1"
                  label="Email"
                  dense
                  required
                ></v-text-field>
                <v-autocomplete
                  v-model="editedItem.peran"
                  class="pt-1"
                  :items="peran"
                  label="Peran"
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
    <v-data-table :headers="headers" :items="daftarPengguna" :search="search">
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
export default {
  layout: 'default',
  data: () => ({
    peran: ['Akuntan', 'Bendahara', 'Nazhir'],
    colorTheme: '#1B7A13',
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      { text: 'Nama Pengguna', value: 'nama_pengguna' },
      { text: 'Email', value: 'email' },
      { text: 'Peran', value: 'peran' },
      { text: 'Aksi', value: 'actions', sortable: false },
    ],
    daftarPengguna: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      nama_pengguna: '',
      email: '',
      peran: '',
    },
    defaultItem: {
      id: '',
      nama_pengguna: '',
      email: '',
      peran: '',
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
      this.daftarPengguna = [
        {
          id: 0,
          nama_pengguna: 'Admin',
          email: 'admin@sawut.com',
          peran: 'Admin',
        },
        {
          id: 1,
          nama_pengguna: 'Akbar',
          email: 'akbar@mail.com',
          peran: 'Bendahara',
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.daftarPengguna.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.daftarPengguna.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.daftarPengguna.splice(this.editedIndex, 1)
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
        Object.assign(this.daftarPengguna[this.editedIndex], this.editedItem)
      } else {
        this.daftarPengguna.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
