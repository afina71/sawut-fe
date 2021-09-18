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

            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form class="pa-10" @submit.prevent="handleInput">
                <validation-provider
                  v-slot="{ errors }"
                  name="Nama Pengguna"
                  rules="required|alpha_spaces"
                >
                  <v-text-field
                    v-model="inputItem.nama_pengguna"
                    :error-messages="errors"
                    label="Nama Pengguna"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="inputItem.email"
                    :error-messages="errors"
                    label="Email"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required|min:6"
                >
                  <v-text-field
                    v-model="inputItem.password"
                    :error-messages="errors"
                    label="Password"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Nama Peran"
                  rules="required"
                >
                  <v-autocomplete
                    v-model="inputItem.role_id"
                    :error-messages="errors"
                    :items="peran"
                    label="Nama Peran"
                  ></v-autocomplete>
                </validation-provider>

                <v-row class="pt-5">
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="closeInput">
                    Batal
                  </v-btn>
                  <v-btn
                    depressed
                    class="white--text rounded-lg green darken-1"
                    type="submit"
                    :disabled="invalid"
                  >
                    Simpan
                  </v-btn>
                </v-row>
              </v-form>
            </validation-observer>
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

            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form class="pa-10" @submit.prevent="handleEdit">
                <validation-provider
                  v-slot="{ errors }"
                  name="Nama Pengguna"
                  rules="required|alpha_spaces"
                >
                  <v-text-field
                    v-model="editedItem.nama_pengguna"
                    :error-messages="errors"
                    label="Nama Pengguna"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="editedItem.email"
                    :error-messages="errors"
                    label="Email"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required|min:6"
                >
                  <v-text-field
                    v-model="editedItem.password"
                    :error-messages="errors"
                    label="Password"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Nama Peran"
                  rules="required"
                >
                  <v-autocomplete
                    v-model="editedItem.role_id"
                    :error-messages="errors"
                    :items="peran"
                    label="Nama Peran"
                  ></v-autocomplete>
                </validation-provider>

                <v-row class="pt-5">
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="closeEdit">
                    Batal
                  </v-btn>
                  <v-btn
                    depressed
                    class="white--text rounded-lg green darken-1"
                    type="submit"
                    :disabled="invalid"
                  >
                    Simpan
                  </v-btn>
                </v-row>
              </v-form>
            </validation-observer>
          </v-card>
        </v-dialog>

        <!-- dialog delete -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="rounded-xl px-5 pt-10 pb-5">
            <v-card-subtitle class="headline text-body-1"
              >Apa Anda yakin ingin menghapus akun ini?</v-card-subtitle
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
      :items="dataPengguna.data"
      :search="search"
    >
      <template #cell(nama_pengguna)="{ item: { nama_pengguna } }">
        <span>{{ nama_pengguna }}</span>
      </template>
      <template #cell(email)="{ item: { email } }">
        <span>{{ email }}</span>
      </template>
      <template #[`item.role_id`]="{ item: { role_id } }">
        <span v-if="role_id === 3">Nazhir</span>
        <span v-else-if="role_id === 4">Bendahara</span>
        <span v-else-if="role_id === 2">Akuntan</span>
        <span v-else>Admin</span>
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
import {
  required,
  email,
  min,
  // eslint-disable-next-line camelcase
  alpha_spaces,
} from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: '{_field_} tidak boleh kosong',
})

extend('email', {
  ...email,
  message: '{_field_} tidak valid',
})

extend('min', {
  ...min,
  message: '{_field_} tidak boleh kurang dari {length} karakter',
})

extend('alpha_spaces', {
  // eslint-disable-next-line camelcase
  ...alpha_spaces,
  message: '{_field_} hanya dapat diisi dengan huruf',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

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
      { text: 'Akuntan', value: '2' },
      { text: 'Nazhir', value: '3' },
      { text: 'Bendahara', value: '4' },
    ],
    headers: [
      { text: 'Nama Pengguna', value: 'nama_pengguna' },
      { text: 'Email', value: 'email' },
      { text: 'Peran', value: 'role_id' },
      { text: 'Aksi', value: 'aksi', sortable: false },
      { text: '', value: 'aksi2', sortable: false },
    ],

    editedItem: {
      id: '',
      nama_pengguna: '',
      email: '',
      password: '',
      role_id: '',
    },
    inputItem: {
      nama_pengguna: '',
      email: '',
      password: '',
      role_id: '',
    },
    defaultItem: {
      nama_pengguna: '',
      email: '',
      password: '',
      role_id: '',
    },
  }),

  computed: {},

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
        this.$refs.observer.reset()
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
        this.$refs.observer.reset()
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
    },
  },
}
</script>
