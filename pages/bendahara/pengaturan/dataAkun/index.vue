<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Data Akun</div>
    </v-row>
    <v-row class="pb-10">
      <v-spacer></v-spacer>
      <!-- popup edit data -->
      <v-col class="d-flex justify-end col-md-4">
        <v-btn :color="colorTheme" dark depressed @click="showEdit(row)">
          Edit Data Akun
        </v-btn>
        <v-dialog v-model="dialogEdit" max-width="450px">
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b>Form Edit Data Akun</b></span
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
                v-model="editedItem.role_id"
                class="pt-1"
                label="Peran"
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
            </v-form>

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
      </v-col>
    </v-row>
    <v-row class="pb-10 justify-center">
      <v-avatar :color="colorTheme" size="100">
        <v-icon large dark> mdi-account-circle </v-icon>
      </v-avatar>
    </v-row>
    <v-row class="py-10 justify-center">
      <v-col cols="3">
        <p class="text-h6">Nama Pengguna</p>
        <br />
        <p class="text-h6">Email</p>
        <br />
        <p class="text-h6">Peran</p>
      </v-col>
      <v-col cols="3">
        <p class="text-h6">
          : <span class="text-h6">{{ dataAkun.nama_pengguna }}</span>
        </p>
        <br />
        <p class="text-h6">
          : <span class="text-h6">{{ dataAkun.email }}</span>
        </p>
        <br />
        <p class="text-h6">
          : <span class="text-h6">{{ dataAkun.role_id }}</span>
        </p>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  layout: 'default',
  async asyncData({ store }) {
    return {
      dataAkun: await store.dispatch('getDataAkun'),
    }
  },
  data: () => {
    return {
      isPasswordShown: false,
      colorTheme: '#388E3C',
      dialogEdit: false,
      isLoading: false,
      valid: true,
      emailRules: [
        (v) => !!v || 'Mohon masukkan email',
        (v) => /.+@.+\..+/.test(v) || 'Alamat email tidak valid',
      ],
      passwordRules: [(v) => !!v || 'Mohon masukkan password'],
      editedItem: {
        id: '',
        nama_pengguna: '',
        email: '',
        role_id: '',
        password: '',
      },
      defaultItem: {
        nama_pengguna: '',
        email: '',
        role_id: '',
        password: '',
      },
    }
  },

  methods: {
    showEdit({
      dataPelunasan: {
        id,
        // eslint-disable-next-line camelcase
        nama_pengguna,
        email,
        // eslint-disable-next-line camelcase
        role_id,
        password,
      },
    }) {
      this.dialogEdit = true
      this.editedItem = {
        ...this.editedItem,
        id,
        nama_pengguna,
        email,
        role_id,
        password,
      }
    },

    handleEdit() {
      const { id } = this.editedItem
      this.isLoading = true
      this.$store
        .dispatch('', [
          id,
          {
            nama_pengguna: this.editedItem.nama_pengguna,
            email: this.editedItem.email,
            password: this.editedItem.password,
            role_id: this.editedItem.role_id,
          },
        ])
        .then(() => this.closeEdit().then(() => (this.isLoading = false)))
        .catch(() => (this.isLoading = false))
    },

    closeEdit() {
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
}
</script>

<style></style>
