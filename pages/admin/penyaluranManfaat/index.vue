<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Informasi Penyaluran Manfaat</div>
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
        <v-btn :color="colorTheme" dark depressed to="/admin/creditScoring">
          Input Data Penyaluran
        </v-btn>
        <!-- edit data -->
        <v-dialog v-model="dialogEdit" max-width="600px">
          <v-card class="rounded-xl">
            <v-card-title class="green darken-1 justify-center">
              <span class="headline text-body-1 white--text"
                ><b> Form Edit Data Penyaluran Wakaf</b></span
              >
            </v-card-title>

            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form class="pa-10" @submit.prevent="handleEdit">
                <v-row justify="space-between">
                  <v-col cols="12" sm="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nama Penerima"
                      rules="required|alpha_spaces"
                    >
                      <v-text-field
                        v-model="editedItem.nama_penerima"
                        :error-messages="errors"
                        label="Nama Penerima"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="NIK"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="editedItem.nik"
                        :error-messages="errors"
                        label="NIK"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Telepon"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="editedItem.telepon"
                        :error-messages="errors"
                        label="Telepon"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Alamat"
                      rules="required"
                    >
                      <v-text-field
                        v-model="editedItem.alamat"
                        :error-messages="errors"
                        label="Alamat"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Jenis Usaha"
                      rules="required"
                    >
                      <v-autocomplete
                        v-model="editedItem.jenis_usaha"
                        :error-messages="errors"
                        :items="jenisUsaha"
                        label="Jenis Usaha"
                      ></v-autocomplete>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Deskripsi Usaha"
                      rules="required"
                    >
                      <v-text-field
                        v-model="editedItem.deskripsi_usaha"
                        :error-messages="errors"
                        label="Deskripsi Usaha"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nominal Peminjaman"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="editedItem.nominal_peminjaman"
                        :error-messages="errors"
                        label="Nominal Peminjaman"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Jenis Piutang"
                      rules="required"
                    >
                      <v-autocomplete
                        v-model="editedItem.jenis_piutang"
                        :error-messages="errors"
                        :items="jenisPiutang"
                        label="Jenis Piutang"
                      ></v-autocomplete>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Sumber Biaya"
                      rules="required"
                    >
                      <v-autocomplete
                        v-model="editedItem.sumber_biaya"
                        :error-messages="errors"
                        :items="sumberBiaya"
                        label="Sumber Biaya"
                      ></v-autocomplete>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Periode Peminjaman"
                      rules="required|numeric"
                    >
                      <v-text-field
                        v-model="editedItem.periode_peminjaman"
                        :error-messages="errors"
                        label="Periode Peminjaman (Bulan)"
                      ></v-text-field>
                    </validation-provider>
                    <v-menu
                      v-model="editedTanggal1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template #activator="{ on, attrs }">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Periode Awal"
                          rules="required"
                        >
                          <v-text-field
                            v-model="editedItem.periode_awal"
                            :error-messages="errors"
                            label="Periode Awal"
                            append-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </validation-provider>
                      </template>
                      <v-date-picker
                        v-model="editedItem.periode_awal"
                        color="green darken-1"
                        @input="editedTanggal1 = false"
                      ></v-date-picker>
                    </v-menu>
                    <v-menu
                      v-model="editedTanggal2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template #activator="{ on, attrs }">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Periode Akhir"
                          rules="required"
                        >
                          <v-text-field
                            v-model="editedItem.periode_akhir"
                            :error-messages="errors"
                            label="Periode Akhir"
                            append-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </validation-provider>
                      </template>
                      <v-date-picker
                        v-model="editedItem.periode_akhir"
                        color="green darken-1"
                        @input="editedTanggal2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <v-row class="pt-1">
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

        <!-- delete data -->
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

        <!-- dialog penyaluran -->
        <v-dialog v-model="dialogPenyaluran" max-width="500px">
          <v-card class="rounded-xl px-5 pt-10 pb-5">
            <v-card-subtitle class="headline text-body-1"
              >Apakah Pengajuan dana ini sudah disalurkan?</v-card-subtitle
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closePenyaluran"
                >Belum</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                :color="colorTheme"
                dark
                depressed
                @click="handlePenyaluran"
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
      :items="dataPenyaluran.data"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      show-expand
      :search="search"
      sort-by="nama_penerima"
    >
      <template #cell(nama_penerima)="{ item: { nama_penerima } }">
        <span>{{ nama_penerima }}</span>
      </template>
      <template #cell(nominal_peminjaman)="{ item: { nominal_peminjaman } }">
        <span>{{ nominal_peminjaman }}</span>
      </template>
      <template #[`item.jenis_piutang`]="{ item: { jenis_piutang } }">
        <span v-if="jenis_piutang === 'pjp'">Jangka Pendek</span>
        <span v-else>Jangka Panjang</span>
      </template>
      <template #cell(periode_akhir)="{ item: { periode_akhir } }">
        <span>{{ periode_akhir }}</span>
      </template>
      <template #expanded-item="{ item }">
        <td :colspan="headers.length">
          <v-row>
            <v-col>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title
                    >Nomor Induk Kependudukan</v-list-item-title
                  >
                  <v-list-item-subtitle>
                    {{ item.nik }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Telepon</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.telepon }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Alamat</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.alamat }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Jenis Usaha</v-list-item-title>
                  <v-list-item-subtitle
                    v-if="item.jenis_usaha === 'perdagangan'"
                  >
                    Perdagangan
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-else-if="item.jenis_usaha === 'fashion'"
                  >
                    Fashion
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-if="item.jenis_usaha === 'otomotif'">
                    Otomotif
                  </v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-else-if="item.jenis_usaha === 'kerajinan'"
                  >
                    Kerajinan
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else-if="item.jenis_usaha === 'it'">
                    IT
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else> Lainnya </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Deskripsi Usaha</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.deskripsi_usaha }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Periode Pinjaman</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.periode_peminjaman }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Periode Awal</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.periode_awal }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Sumber Biaya</v-list-item-title>
                  <v-list-item-subtitle
                    v-if="item.sumber_biaya === 'bagihasil'"
                  >
                    Bagi Hasil
                  </v-list-item-subtitle>
                  <v-list-item-subtitle v-else>
                    Non Bagi Hasil
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </td>
      </template>
      <template #[`item.kelayakan`]="{ item }">
        <v-chip v-if="item.kelayakan === 0" color="red" dark>
          Tidak Layak
        </v-chip>
        <v-chip v-else color="green" dark> Layak </v-chip>
      </template>
      <template #[`item.approval`]="{ item: { id, approval } }">
        <v-chip v-if="approval === 1" color="green" dark>Approved</v-chip>
        <v-chip v-else color="red" dark @click="showApprove(id)">
          Unapprove
        </v-chip>
      </template>
      <template #[`item.penyaluran`]="{ item: { id, penyaluran } }">
        <v-chip v-if="penyaluran === 1" color="green" dark>Disalurkan</v-chip>
        <v-chip v-else color="red" dark @click="showPenyaluran(id)">
          Belum Disalurkan
        </v-chip>
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
  // eslint-disable-next-line camelcase
  alpha_spaces,
  numeric,
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

extend('numeric', {
  ...numeric,
  message: '{_field_} hanya dapat diisi dengan angka',
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
      dataPenyaluran: await store.dispatch('getDataPenyaluran'),
    }
  },
  data: () => ({
    colorTheme: '#388E3C',
    dialogInput: false,
    dialogEdit: false,
    dialogDelete: false,
    dialogApprove: false,
    dialogPenyaluran: false,
    editedTanggal1: false,
    editedTanggal2: false,
    search: '',
    expanded: [],
    singleExpand: true,
    jenisUsaha: [
      { text: 'Perdagangan', value: 'perdagangan' },
      { text: 'Fashion', value: 'fashion' },
      { text: 'Otomotif', value: 'otomotif' },
      { text: 'Kerajinan', value: 'kerajinan' },
      { text: 'IT', value: 'it' },
      { text: 'Lainnya', value: 'lainnya' },
    ],
    sumberBiaya: [
      { text: 'Bagi Hasil', value: 'bagihasil' },
      { text: 'Non Bagi Hasil', value: 'nonbagihasil' },
    ],
    jenisPiutang: [
      { text: 'Piutang Jangka Pendek', value: 'pjp' },
      { text: 'Piutang Jangka Panjang', value: 'pja' },
    ],
    headers: [
      { text: 'Nama', value: 'nama_penerima' },
      { text: 'Nominal', value: 'nominal_peminjaman' },
      { text: 'Jenis Piutang', value: 'jenis_piutang' },
      { text: 'Periode Awal', value: 'periode_awal' },
      { text: 'Periode Akhir', value: 'periode_akhir' },
      { text: '', value: 'data-table-expand' },
      { text: 'Kelayakan', value: 'kelayakan' },
      { text: 'Status', value: 'approval' },
      { text: 'Penyaluran', value: 'penyaluran' },
      { text: 'Aksi', value: 'aksi' },
      { text: '', value: 'aksi2' },
    ],
    editedItem: {
      id: '',
      nama_penerima: '',
      nik: '',
      telepon: '',
      alamat: '',
      jenis_usaha: '',
      deskripsi_usaha: '',
      nominal_peminjaman: '',
      jenis_piutang: '',
      sumber_biaya: '',
      periode_peminjaman: '',
      periode_awal: '',
      periode_akhir: '',
    },
    defaultItem: {
      id: '',
      nama_penerima: '',
      nik: '',
      telepon: '',
      alamat: '',
      jenis_usaha: '',
      deskripsi_usaha: '',
      nominal_peminjaman: '',
      jenis_piutang: '',
      sumber_biaya: '',
      periode_peminjaman: '',
      periode_awal: '',
      periode_akhir: '',
    },
  }),

  computed: {},

  methods: {
    async handleRefreshList() {
      this.dataPenyaluran = await this.$store.dispatch('getDataPenyaluran')
    },

    showEdit({
      item: {
        id, // eslint-disable-next-line camelcase
        nama_penerima,
        nik,
        telepon,
        alamat,
        // eslint-disable-next-line camelcase
        jenis_usaha,
        // eslint-disable-next-line camelcase
        deskripsi_usaha,
        // eslint-disable-next-line camelcase
        nominal_peminjaman,
        // eslint-disable-next-line camelcase
        jenis_piutang,
        // eslint-disable-next-line camelcase
        sumber_biaya,
        // eslint-disable-next-line camelcase
        periode_peminjaman,
        // eslint-disable-next-line camelcase
        periode_awal,
        // eslint-disable-next-line camelcase
        periode_akhir,
      },
    }) {
      this.dialogEdit = true
      this.editedItem = {
        ...this.editedItem,
        id,
        nama_penerima,
        nik,
        telepon,
        alamat,
        jenis_usaha,
        deskripsi_usaha,
        nominal_peminjaman,
        jenis_piutang,
        sumber_biaya,
        periode_peminjaman,
        periode_awal,
        periode_akhir,
      }
    },

    handleEdit() {
      const { id } = this.editedItem
      this.isLoading = true
      this.$store
        .dispatch('updateDataPenyaluran', [
          id,
          {
            nama_penerima: this.editedItem.nama_penerima,
            nik: this.editedItem.nik,
            telepon: this.editedItem.telepon,
            alamat: this.editedItem.alamat,
            jenis_usaha: this.editedItem.jenis_usaha,
            deskripsi_usaha: this.editedItem.deskripsi_usaha,
            nominal_peminjaman: this.editedItem.nominal_peminjaman,
            jenis_piutang: this.editedItem.jenis_piutang,
            sumber_biaya: this.editedItem.sumber_biaya,
            periode_peminjaman: this.editedItem.periode_peminjaman,
            periode_awal: this.editedItem.periode_awal,
            periode_akhir: this.editedItem.periode_akhir,
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
        .dispatch('deleteDataPenyaluran', this.editedItem.id)
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

    showApprove(id) {
      this.dialogApprove = true
      this.editedItem = { ...this.editedItem, id }
    },

    handleApprove() {
      this.$store
        .dispatch('persetujuanPenyaluran', this.editedItem.id)
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

    showPenyaluran(id) {
      this.dialogPenyaluran = true
      this.editedItem = { ...this.editedItem, id }
    },

    handlePenyaluran() {
      this.$store
        .dispatch('penyaluranManfaat', this.editedItem.id)
        .then(() =>
          this.handleRefreshList()
            .then(() => this.closePenyaluran())
            .then(() => (this.isLoading = false))
        )
        .catch(() => (this.isLoading = false))
    },

    closePenyaluran() {
      this.dialogPenyaluran = false
    },
  },
}
</script>
