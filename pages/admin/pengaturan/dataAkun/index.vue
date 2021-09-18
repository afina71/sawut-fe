<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Data Akun</div>
    </v-row>

    <v-row class="pb-10">
      <v-spacer></v-spacer>
      <!-- popup edit data -->
      <v-col class="d-flex justify-end col-md-4">
        <!-- <v-btn :color="colorTheme" dark depressed @click="showEdit()">
          Edit Data
        </v-btn> -->
        <v-dialog v-model="dialogEdit" max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn :color="colorTheme" dark depressed v-bind="attrs" v-on="on">
              Edit Data
            </v-btn>
          </template>
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Edit Data Akun</b></span
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
      </v-col>
    </v-row>

    <v-row class="pb-10 justify-center">
      <v-avatar :color="colorTheme" size="100">
        <v-icon large dark> mdi-account-circle </v-icon>
      </v-avatar>
    </v-row>

    <!-- informasi akun -->
    <v-row class="py-10 justify-center">
      <v-col cols="3">
        <p class="text-h6">Nama Pengguna</p>
        <br />
        <p class="text-h6">Email</p>
        <br />
        <p class="text-h6">Peran</p>
      </v-col>
      <v-col cols="3">
        <div v-for="user in dataAkun" :key="user.id">
          <p class="text-h6">
            : <span class="text-h6">{{ user.nama_pengguna }}</span>
          </p>
          <br />
          <p class="text-h6">
            : <span class="text-h6">{{ user.email }}</span>
          </p>
          <br />
          <p class="text-h6">
            : <span v-if="user.role_id === 3">Nazhir</span>
            <span v-else-if="user.role_id === 4">Bendahara</span>
            <span v-else-if="user.role_id === 1">Admin</span>
            <span v-else>Akuntan</span>
          </p>
        </div>
      </v-col>
    </v-row>
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

  layout: 'admin',
  async asyncData({ store }) {
    return {
      dataAkun: await store.dispatch('getDataAkun'),
    }
  },
  data: () => {
    return {
      colorTheme: '#388E3C',
      dialogEdit: false,
      isLoading: false,
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
      ],
      editedItem: {
        nama_pengguna: '',
        email: '',
        password: '',
      },
      defaultItem: {
        nama_pengguna: '',
        email: '',
        password: '',
      },
    }
  },

  computed: {},

  methods: {
    async handleRefreshList() {
      this.dataAkun = await this.$store.dispatch('getDataAkun')
    },

    handleEdit() {
      this.isLoading = true
      this.$store
        .dispatch('updateDataAkun', [
          {
            nama_pengguna: this.editedItem.nama_pengguna,
            email: this.editedItem.email,
            password: this.editedItem.password,
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
  },
}
</script>

<style></style>
