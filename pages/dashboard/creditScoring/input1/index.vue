<template>
  <v-main>
    <v-form class="pb-10 pt-10">
      <v-row justify="space-between">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="inputItem.nama_penerima"
            class="pt-1"
            label="Nama Penerima"
            required
          ></v-text-field>
          <v-text-field
            v-model="inputItem.nominal_peminjaman"
            class="pt-1"
            label="Nominal Peminjaman"
            dense
            required
          ></v-text-field>
          <v-text-field
            v-model="inputItem.nik"
            class="pt-1"
            label="Nomor Induk Kependudukan"
            required
          ></v-text-field>
          <v-text-field
            v-model="inputItem.telepon"
            class="pt-1"
            label="Telepon"
            required
          ></v-text-field>
          <v-text-field
            v-model="inputItem.alamat"
            class="pt-1"
            label="Alamat"
            required
          ></v-text-field>
          <v-autocomplete
            v-model="inputItem.jenis_usaha"
            class="pt-1"
            :items="jenisUsaha"
            label="Jenis Usaha"
            required
          ></v-autocomplete>
          <v-text-field
            v-model="inputItem.deskripsi_usaha"
            class="pt-1"
            label="Deskripsi Usaha"
            required
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="6">
          <v-autocomplete
            v-model="inputItem.jenis_piutang"
            class="pt-1"
            :items="jenisPiutang"
            label="Jenis Piutang"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.sumber_biaya"
            class="pt-1"
            :items="sumberBiaya"
            label="Sumber Biaya"
            required
          ></v-autocomplete>
          <v-text-field
            v-model="inputItem.periode_peminjaman"
            class="pt-1"
            label="Periode Peminjaman"
            required
          ></v-text-field>
          <v-text-field
            v-model="inputItem.periode_awal"
            class="pt-1"
            label="Periode Awal"
            required
          ></v-text-field>
          <v-text-field
            v-model="inputItem.periode_akhir"
            class="pt-1"
            label="Periode Akhir"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn depressed dark color="green darken-2" @click="handleInput()">
        Simpan
      </v-btn>
      <!-- <v-btn depressed dark color="green darken-2" @click="tes"> tes </v-btn> -->
    </v-row>
  </v-main>
</template>

<script>
export default {
  layout: 'cs',
  async asyncData({ store }) {
    return {
      dataPenyaluran: await store.dispatch('getDataPenyaluran'),
    }
  },
  data: () => ({
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
    inputItem: {
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

  methods: {
    tes() {
      this.$router.push('/dashboard/creditScoring/input2')
    },
    async handleInput() {
      const {
        // eslint-disable-next-line camelcase
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
      } = this.inputItem
      this.isLoading = true
      try {
        await this.$store
          .dispatch('createDataPenyaluran', {
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
          })
          .then(
            (response) => console.log(response)
            // this.$router.push(
            //   `/dashboard/creditScoring/input1/${response.data.id}`
            // )
          )
          .catch(() => (this.isLoading = false))
        // this.isLoading = false
        // this.$router.push(`/dashboard/creditScoring/input1/${id}`)
      } catch (error) {
        this.isLoading = false
      }
    },
  },
}
</script>

<style></style>
