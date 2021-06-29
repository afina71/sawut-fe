<template>
  <v-main>
    <v-form class="pb-10 pt-10">
      <div class="text-h6 pb-5">Data Umum Penyaluran Manfaat</div>
      <v-row justify="space-between">
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">Nama Penerima</div>
          <v-text-field
            v-model="inputItem.nama_penerima"
            class="pt-1"
            label="Masukkan Nama"
            required
          ></v-text-field>
          <div class="text-subtitle-2">Nominal Peminjaman</div>
          <v-text-field
            v-model="inputItem.nominal_peminjaman"
            class="pt-1"
            label="Masukkan Nominal"
            dense
            required
          ></v-text-field>
          <div class="text-subtitle-2">Nomor Induk Kependudukan</div>
          <v-text-field
            v-model="inputItem.nik"
            class="pt-1"
            label="Masukkan NIK"
            required
          ></v-text-field>
          <div class="text-subtitle-2">Nomor Telepon</div>
          <v-text-field
            v-model="inputItem.telepon"
            class="pt-1"
            label="Masukkan Nomor Telepon"
            required
          ></v-text-field>
          <div class="text-subtitle-2">Alamat</div>
          <v-text-field
            v-model="inputItem.alamat"
            class="pt-1"
            label="Masukkan Alamat"
            required
          ></v-text-field>
          <div class="text-subtitle-2">Jenis Usaha</div>
          <v-autocomplete
            v-model="inputItem.jenis_usaha"
            class="pt-1"
            :items="jenisUsaha"
            label="Pilih"
            required
          ></v-autocomplete>
          <div class="text-subtitle-2">Deskripsi Usaha</div>
          <v-text-field
            v-model="inputItem.deskripsi_usaha"
            class="pt-1"
            label="Deskripsi"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">Jenis Piutang</div>
          <v-autocomplete
            v-model="inputItem.jenis_piutang"
            class="pt-1"
            :items="jenisPiutang"
            label="Pilih"
            required
          ></v-autocomplete>
          <div class="text-subtitle-2">Sumber Biaya</div>
          <v-autocomplete
            v-model="inputItem.sumber_biaya"
            class="pt-1"
            :items="sumberBiaya"
            label="Pilih"
            required
          ></v-autocomplete>
          <div class="text-subtitle-2">Periode Peminjaman (Bulan)</div>
          <v-text-field
            v-model="inputItem.periode_peminjaman"
            class="pt-1"
            label="Masukkan Lama Periode"
            required
          ></v-text-field>
          <div class="text-subtitle-2">Periode Awal</div>
          <v-text-field
            v-model="inputItem.periode_awal"
            class="pt-1"
            label="Tahun-Bulan-Tanggal"
            required
          ></v-text-field>
          <div class="text-subtitle-2">Periode Akhir</div>
          <v-text-field
            v-model="inputItem.periode_akhir"
            class="pt-1"
            label="Tahun-Bulan-Tanggal"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-divider></v-divider>
    <!-- Categori 1 -->
    <v-form class="pb-10 pt-10">
      <div class="text-h6 pb-5">Kategori 1: Capacity</div>
      <v-row justify="space-between">
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">
            Berapa nominal pinjaman yang diinginkan oleh Peminjam?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_1"
            class="pt-1"
            :items="pertanyaan1"
            label="Pilih"
            required
          ></v-autocomplete>
          <div class="text-subtitle-2">
            Berapa lama usaha sejak didirikan hingga saat ini?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_2"
            class="pt-1"
            :items="pertanyaan2"
            label="Pilih"
            required
          ></v-autocomplete>
          <div class="text-subtitle-2">
            Berapa rata-rata omset dalam sebulan?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_3"
            class="pt-1"
            :items="pertanyaan3"
            label="Pilih"
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">
            Berapa laba bersih yang diperoleh dalam sebulan?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_4"
            class="pt-1"
            :items="pertanyaan4"
            label="Pilih"
            required
          ></v-autocomplete>
          <div class="text-subtitle-2">
            Berapa jumlah karyawan dalam usaha tersebut?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_5"
            class="pt-1"
            :items="pertanyaan5"
            label="Pilih"
            required
          ></v-autocomplete>
          <div class="text-subtitle-2">
            Berapakah proporsi dari penjualan yang dijual dengan cara tunai?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_6"
            class="pt-1"
            :items="pertanyaan6"
            label="Pilih"
            required
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-form>

    <v-divider></v-divider>
    <!-- Categori 2 -->
    <v-form class="pb-10 pt-10">
      <div class="text-h6 pb-5">Kategori 2: Capital</div>
      <v-row justify="space-between">
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">
            Apakah memiliki hutang di tempat lain?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_7"
            class="pt-1"
            :items="pertanyaan7"
            label="Pilih"
            required
          ></v-autocomplete>
          <div class="text-subtitle-2">
            Berapa nominal hutang di tempat lain yang tersisa?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_8"
            class="pt-1"
            :items="pertanyaan8"
            :disabled="inputItem.answer_7 === '30'"
            label="Pilih"
            required
          ></v-autocomplete>
          <div class="text-subtitle-2">
            Berapa jumlah angsuran per bulan di tempat lain?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_9"
            class="pt-1"
            :items="pertanyaan9"
            :disabled="inputItem.answer_7 === '30'"
            label="Pilih"
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">
            Berapa sisa lama angsuran di tempat lain?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_10"
            class="pt-1"
            :items="pertanyaan10"
            :disabled="inputItem.answer_7 === '30'"
            label="Pilih"
            required
          ></v-autocomplete>
          <div class="text-subtitle-2">
            Berapa sisa lama angsuran di tempat lain? Pernahkan anda terlambat
            dalam melunasi utang? Jika iya berapa jumlah keterlambatan
            pelunasan?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_11"
            class="pt-1"
            :items="pertanyaan11"
            :disabled="inputItem.answer_7 === '30'"
            label="Pilih"
            required
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-form>

    <v-divider></v-divider>
    <!-- Categori 3 -->
    <v-form class="pb-10 pt-10">
      <div class="text-h6 pb-5">Kategori 3: Condition of Economy</div>
      <v-row justify="space-between">
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">Berapa jumlah tanggungan keluarga?</div>
          <v-autocomplete
            v-model="inputItem.answer_12"
            class="pt-1"
            :items="pertanyaan12"
            label="Pilih"
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">
            Berapa nominal pengeluaran rumah tangga per bulan?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_13"
            class="pt-1"
            :items="pertanyaan13"
            label="Pilih"
            required
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-form>

    <v-divider></v-divider>
    <!-- Categori 4 -->
    <v-form class="pb-10 pt-10">
      <div class="text-h6 pb-5">Kategori 4: Collateral</div>
      <v-row justify="space-between">
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">
            Berapa jangka waktu pengembalian pinjaman?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_14"
            class="pt-1"
            :items="pertanyaan14"
            label="Pilih"
            required
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-form>

    <v-divider></v-divider>
    <!-- Categori 5 -->
    <v-form class="pb-10 pt-10">
      <div class="text-h6 pb-5">Kategori 5: Character</div>
      <v-row justify="space-between">
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">
            Bagaimana penilaian masyarakat sekitar terhadap calon peminjam?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_15"
            class="pt-1"
            :items="pertanyaan15"
            label="Pilih"
            required
          ></v-autocomplete>
          <div class="text-subtitle-2">
            Bagaimana sikap kooperatif peminjam?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_16"
            class="pt-1"
            :items="pertanyaan16"
            label="Pilih"
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">
            Bagaimana sikap tanggung jawab peminjam?
          </div>
          <v-autocomplete
            v-model="inputItem.answer_17"
            class="pt-1"
            :items="pertanyaan17"
            label="Pilih"
            required
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-form>

    <v-row class="pt-10 pb-10">
      <v-spacer></v-spacer>
      <v-btn depressed dark color="green darken-2" @click="handleInput">
        Simpan
      </v-btn>
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

    // Category 1
    pertanyaan1: [
      { text: '0 - 500 Ribu', value: '1' },
      { text: '500 Ribu - 1 Juta', value: '2' },
      { text: '1 - 2 Juta', value: '3' },
      { text: '2 - 5 Juta', value: '4' },
    ],
    pertanyaan2: [
      { text: 'Dibawah 1 Bulan', value: '5' },
      { text: '1 - 6 Bulan', value: '6' },
      { text: '6 - 12 Bulan', value: '7' },
      { text: 'Lebih dari 1 Tahun', value: '8' },
      { text: 'Lebih dari 5 Tahun', value: '9' },
    ],
    pertanyaan3: [
      { text: 'Kurang dari 100 Ribu', value: '10' },
      { text: '100 - 200 Ribu', value: '11' },
      { text: '200 - 300 Ribu', value: '12' },
      { text: '300 - 500 Ribu', value: '13' },
      { text: 'Lebih dari 500 Ribu', value: '14' },
    ],
    pertanyaan4: [
      { text: 'Kurang dari 100 Ribu', value: '15' },
      { text: '100 - 200 Ribu', value: '16' },
      { text: '200 - 300 Ribu', value: '17' },
      { text: '300 - 500 Ribu', value: '18' },
      { text: 'Lebih dari 500 Ribu', value: '19' },
    ],
    pertanyaan5: [
      { text: 'Hanya 1 orang', value: '20' },
      { text: 'Kurang dari 5 orang', value: '21' },
      { text: '7 - 10 orang', value: '22' },
      { text: 'Diatas 10 orang', value: '23' },
    ],
    pertanyaan6: [
      { text: '0%', value: '24' },
      { text: '0% - 20%', value: '25' },
      { text: '20% - 50%', value: '26' },
      { text: '50% - 75%', value: '27' },
      { text: '75% - 100%', value: '28' },
    ],

    // Category 2
    pertanyaan7: [
      { text: 'Ya', value: '29' },
      { text: 'Tidak', value: '30' },
    ],
    pertanyaan8: [
      { text: 'Kurang dari 500 Ribu', value: '31' },
      { text: '500 Ribu - 1 Juta', value: '32' },
      { text: '1 Juta - 2 Juta', value: '33' },
      { text: '2 Juta - 5 Juta', value: '34' },
      { text: 'Lebih dari 5 Juta', value: '35' },
    ],
    pertanyaan9: [
      { text: 'Kurang dari 500 Ribu', value: '36' },
      { text: '500 Ribu - 1 Juta', value: '37' },
      { text: '1 Juta - 2 Juta', value: '38' },
      { text: '2 Juta - 5 Juta', value: '39' },
      { text: 'Lebih dari 5 Juta', value: '40' },
    ],
    pertanyaan10: [
      { text: 'Kurang dari 6 bulan', value: '41' },
      { text: '6 - 12 bulan', value: '42' },
      { text: '12 - 24 bulan', value: '43' },
      { text: '24 bulan - 5 tahun', value: '44' },
      { text: 'Lebih dari 5 tahun', value: '45' },
    ],
    pertanyaan11: [
      { text: '0', value: '46' },
      { text: '1', value: '47' },
      { text: '2 - 5', value: '48' },
      { text: 'Lebih dari 5', value: '49' },
    ],

    // Category 3
    pertanyaan12: [
      { text: 'Kurang dari 2 orang', value: '50' },
      { text: '2  5 orang', value: '51' },
      { text: 'Lebih dari 5 orang', value: '52' },
    ],
    pertanyaan13: [
      { text: 'Kurang dari 500 Ribu', value: '53' },
      { text: '500 Ribu - 1 Juta', value: '54' },
      { text: '1 Juta - 2 Juta', value: '55' },
      { text: '2 Juta - 5 Juta', value: '56' },
    ],

    // Category 4
    pertanyaan14: [
      { text: '1 Bulan', value: '57' },
      { text: '6 Bulan', value: '58' },
      { text: '12 Bulan', value: '59' },
      { text: '24 Bulan', value: '60' },
    ],

    // Category 5
    pertanyaan15: [
      { text: 'Kurang', value: '61' },
      { text: 'Cukup', value: '62' },
      { text: 'Baik', value: '63' },
    ],
    pertanyaan16: [
      { text: 'Tidak Kooperatif', value: '64' },
      { text: 'Kooperatif', value: '65' },
    ],
    pertanyaan17: [
      { text: 'Kurang', value: '66' },
      { text: 'Cukup', value: '67' },
      { text: 'Baik', value: '68' },
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
      answer_1: '',
      answer_2: '',
      answer_3: '',
      answer_4: '',
      answer_5: '',
      answer_6: '',
      answer_7: '',
      answer_8: '',
      answer_9: '',
      answer_10: '',
      answer_11: '',
      answer_12: '',
      answer_13: '',
      answer_14: '',
      answer_15: '',
      answer_16: '',
      answer_17: '',
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
      answer_1: '',
      answer_2: '',
      answer_3: '',
      answer_4: '',
      answer_5: '',
      answer_6: '',
      answer_7: '',
      answer_8: '',
      answer_9: '',
      answer_10: '',
      answer_11: '',
      answer_12: '',
      answer_13: '',
      answer_14: '',
      answer_15: '',
      answer_16: '',
      answer_17: '',
    },
  }),

  methods: {
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
        // eslint-disable-next-line camelcase
        answer_1,
        // eslint-disable-next-line camelcase
        answer_2,
        // eslint-disable-next-line camelcase
        answer_3,
        // eslint-disable-next-line camelcase
        answer_4,
        // eslint-disable-next-line camelcase
        answer_5,
        // eslint-disable-next-line camelcase
        answer_6,
        // eslint-disable-next-line camelcase
        answer_7,
        // eslint-disable-next-line camelcase
        answer_8,
        // eslint-disable-next-line camelcase
        answer_9,
        // eslint-disable-next-line camelcase
        answer_10,
        // eslint-disable-next-line camelcase
        answer_11,
        // eslint-disable-next-line camelcase
        answer_12,
        // eslint-disable-next-line camelcase
        answer_13,
        // eslint-disable-next-line camelcase
        answer_14,
        // eslint-disable-next-line camelcase
        answer_15,
        // eslint-disable-next-line camelcase
        answer_16,
        // eslint-disable-next-line camelcase
        answer_17,
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
            answer_1,
            answer_2,
            answer_3,
            answer_4,
            answer_5,
            answer_6,
            answer_7,
            answer_8,
            answer_9,
            answer_10,
            answer_11,
            answer_12,
            answer_13,
            answer_14,
            answer_15,
            answer_16,
            answer_17,
          })
          .catch(() => (this.isLoading = false))
        // this.isLoading = false
        this.$router.push(`/dashboard/penyaluranManfaat`)
      } catch (error) {
        this.isLoading = false
      }
    },
  },
}
</script>

<style></style>
