<template>
  <v-main>
    <v-form class="pb-10 pt-10">
      <v-row justify="space-between">
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">Kategori 1: Capacity</div>
          <v-autocomplete
            v-model="inputItem.answer_1"
            class="pt-1"
            :items="pertanyaan1"
            label="Berapa nominal pinjaman yang diinginkan oleh Peminjam?"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.answer_2"
            class="pt-1"
            :items="pertanyaan2"
            label="Berapa lama usaha sejak didirikan hingga saat ini?"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.answer_3"
            class="pt-1"
            :items="pertanyaan3"
            label="Berapa rata-rata omset dalam sebulan?"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.answer_4"
            class="pt-1"
            :items="pertanyaan4"
            label="Berapa laba bersih yang diperoleh dalam sebulan?"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.answer_5"
            class="pt-1"
            :items="pertanyaan5"
            label="Berapa jumlah karyawan dalam usaha tersebut?"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.answer_6"
            class="pt-1"
            :items="pertanyaan6"
            label="Berapakah proporsi dari penjualan yang dijual dengan cara tunai?"
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">Kategori 2: Capital</div>
          <v-autocomplete
            v-model="inputItem.answer_7"
            class="pt-1"
            :items="pertanyaan7"
            label="Apakah memiliki hutang di tempat lain?"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.answer_8"
            class="pt-1"
            :items="pertanyaan8"
            label="Berapa nominal hutang di tempat lain yang tersisa?"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.answer_9"
            class="pt-1"
            :items="pertanyaan9"
            label="Berapa jumlah angsuran per bulan di tempat lain?"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.answer_10"
            class="pt-1"
            :items="pertanyaan10"
            label="Berapa sisa lama angsuran di tempat lain?"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.answer_11"
            class="pt-1"
            :items="pertanyaan11"
            label="Pernahkan anda terlambat dalam melunasi utang? Jika iya berapa jumlah keterlambatan pelunasan?"
            required
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn depressed dark color="green darken-2" @click="handleInput">
        Lanjut
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
    inputItem: {
      id: '',
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
    },
    defaultItem: {
      id: '',
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
    },
  }),

  methods: {
    async handleInput() {
      const { id } = this.inputItem
      this.isLoading = true
      try {
        await this.$store.dispatch('inputCreditScoringSatu', [
          id,
          {
            answer_1: this.inputItem.answer_1,
            answer_2: this.inputItem.answer_2,
            answer_3: this.inputItem.answer_3,
            answer_4: this.inputItem.answer_4,
            answer_5: this.inputItem.answer_5,
            answer_6: this.inputItem.answer_6,
            answer_7: this.inputItem.answer_7,
            answer_8: this.inputItem.answer_8,
            answer_9: this.inputItem.answer_9,
            answer_10: this.inputItem.answer_10,
            answer_11: this.inputItem.answer_11,
          },
        ])
        this.isLoading = false
        this.$router.push(`/dashboard/creditScoring/input1/input3/${id}`)
      } catch (error) {
        this.isLoading = false
      }
    },
  },
}
</script>

<style></style>
