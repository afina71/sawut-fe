<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Daftar Pengguna</div>
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
              Input Data Pengguna
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Input Data Pengguna</b></span
              >
            </v-card-title>
            <v-form class="px-10 pt-10">
              <v-text-field
                v-model="inputItem.nama_pengguna"
                class="pt-1"
                label="Nama Pengguna"
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="inputItem.email"
                class="pt-1"
                label="Email"
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="inputItem.password"
                class="pt-1"
                label="Password"
                dense
                required
              ></v-text-field>
              <v-autocomplete
                v-model="inputItem.role_id"
                class="pt-1"
                :items="peran"
                label="Nama Peran"
                dense
                required
              ></v-autocomplete>
            </v-form>

            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeInput">
                Batal
              </v-btn>
              <v-btn color="blue darken-1" text @click="handleInput">
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
                ><b> Form Edit Data Pengguna</b></span
              >
            </v-card-title>
            <v-form class="px-10 pt-10">
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
              <v-text-field
                v-model="editedItem.password"
                class="pt-1"
                label="Password"
                dense
                required
              ></v-text-field>
              <v-autocomplete
                v-model="editedItem.role_id"
                class="pt-1"
                :items="peran"
                label="Nama Peran"
                dense
                required
              ></v-autocomplete>
            </v-form>

            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeEdit">
                Batal
              </v-btn>
              <v-btn color="blue darken-1" text @click="handleEdit">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- dialog delete -->
        <v-dialog v-model="dialogDelete" max-width="450px">
          <v-card class="rounded-xl">
            <v-card-title class="headline pt-10 py-5 text-body-1"
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
        </v-dialog>
      </v-col>
    </v-row>

    <!-- data tabel -->
    <v-data-table :headers="headers" :items="dataPengguna" :search="search">
      <template #cell(nama_pengguna)="{ item: { nama_pengguna } }">
        <span>{{ nama_pengguna }}</span>
      </template>
      <template #cell(email)="{ item: { email } }">
        <span>{{ email }}</span>
      </template>
      <template #cell(role_id)="{ item: { role_id } }">
        <span>{{ role_id }}</span>
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
      dataPengguna: await store.dispatch('getDataPengguna'),
    }
  },

  data: () => ({
    colorTheme: '#388E3C',
    dialogInput: false,
    dialogEdit: false,
    dialogDelete: false,
    search: '',
    peran: [
      { text: 'Akuntan', value: 'akuntan' },
      { text: 'Nazhir', value: 'nazhir' },
      { text: 'Bendahara', value: 'bendahara' },
    ],
    headers: [
      { text: 'Nama Pengguna', value: 'nama_pengguna' },
      { text: 'Email', value: 'email' },
      { text: 'Peran', value: 'role_id' },
      { text: 'Aksi', value: 'aksi', sortable: false },
      { text: '', value: 'aksi2', sortable: false },
    ],
    // daftarPengguna: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      nama_pengguna: '',
      email: '',
      password: '',
      role_id: '',
    },
    inputItem: {
      id: '',
      nama_pengguna: '',
      email: '',
      password: '',
      role_id: '',
    },
    defaultItem: {
      id: '',
      nama_pengguna: '',
      email: '',
      password: '',
      role_id: '',
    },
  }),

  methods: {
    async handleRefreshList() {
      this.dataPengguna = await this.$store.dispatch('getDataPengguna')
    },

    async handleInput() {
      const {
        // eslint-disable-next-line camelcase
        nama_pengguna,
        email,
        password,
        // eslint-disable-next-line camelcase
        role_id,
      } = this.inputItem
      this.isLoading = true
      try {
        await this.$store.dispatch('createDataPengguna', {
          nama_pengguna,
          email,
          password,
          role_id,
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
        id,
        // eslint-disable-next-line camelcase
        nama_pengguna,
        email,
        // eslint-disable-next-line camelcase
        role_id,
      },
    }) {
      this.dialogEdit = true
      this.editedItem = {
        ...this.editedItem,
        id,
        nama_pengguna,
        email,
        role_id,
      }
    },

    handleEdit() {
      const { id } = this.editedItem
      this.isLoading = true
      this.$store
        .dispatch('updateDataPengguna', [
          id,
          {
            nama_pengguna: this.editedItem.nama_pengguna,
            email: this.editedItem.email,
            password: this.editedItem.password,
            role_id: this.editedItem.role_id,
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
        .dispatch('deleteDataPengguna', this.editedItem.id)
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
