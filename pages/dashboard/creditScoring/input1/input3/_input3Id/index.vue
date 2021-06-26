<template>
  <v-main>
    <v-form class="pb-10 pt-10">
      <v-row justify="space-between">
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">Kategori 3: Condition of Economy</div>
          <v-autocomplete
            v-model="inputItem.answer_12"
            class="pt-1"
            :items="pertanyaan12"
            label="Berapa jumlah tanggungan keluarga?"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.answer_13"
            class="pt-1"
            :items="pertanyaan13"
            label="Berapa nominal pengeluaran rumah tangga per bulan?"
            required
          ></v-autocomplete>
          <div class="text-subtitle-2">Kategori 4: Collateral</div>
          <v-autocomplete
            v-model="inputItem.answer_14"
            class="pt-1"
            :items="pertanyaan14"
            label="Berapa jangka waktu pengembalian pinjaman?"
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="text-subtitle-2">Kategori 5: Character</div>
          <v-autocomplete
            v-model="inputItem.answer_15"
            class="pt-1"
            :items="pertanyaan15"
            label="Bagaimana penilaian masyarakat sekitar terhadap calon peminjam?"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.answer_16"
            class="pt-1"
            :items="pertanyaan16"
            label="Bagaimana sikap kooperatif peminjam?"
            required
          ></v-autocomplete>
          <v-autocomplete
            v-model="inputItem.answer_17"
            class="pt-1"
            :items="pertanyaan17"
            label="Bagaimana sikap tanggung jawab peminjam?"
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
    pertanyaan14: [
      { text: '1 Bulan', value: '57' },
      { text: '6 Bulan', value: '58' },
      { text: '12 Bulan', value: '59' },
      { text: '24 Bulan', value: '60' },
    ],
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
      answer_12: '',
      answer_13: '',
      answer_14: '',
      answer_15: '',
      answer_16: '',
      answer_17: '',
    },
    defaultItem: {
      id: '',
      answer_12: '',
      answer_13: '',
      answer_14: '',
      answer_15: '',
      answer_16: '',
    },
  }),

  methods: {
    async handleInput() {
      const {
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
        await this.$store.dispatch('inputCreditScoringDua', {
          answer_12,
          answer_13,
          answer_14,
          answer_15,
          answer_16,
          answer_17,
        })
        this.isLoading = false
        this.handleRefreshList()
      } catch (error) {
        this.isLoading = false
      }
    },
  },
}
</script>

<style></style>
