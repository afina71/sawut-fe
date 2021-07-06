<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <v-col cols="10">
        <pdf :src="pdfsrc"></pdf>
      </v-col>
      <v-col cols="2" class="pb-10">
        <v-btn :color="colorTheme" dark depressed @click.prevent="downloadPDF()"
          >Download</v-btn
        >
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf,
  },

  layout: 'default',

  data: () => ({
    colorTheme: '#388E3C',
    pdfsrc: null,
  }),

  created() {
    this.$axios
      .get(
        `https://sawut-laravel.herokuapp.com/api/wakaf/laporan/posisikeuangan/generate`,
        {
          responseType: 'blob',
        }
      )
      .then((response) => {
        console.log('Success', response)
        const blob = new Blob([response.data])
        const objectUrl = URL.createObjectURL(blob)
        this.pdfsrc = objectUrl
      })
      .catch(console.error) //
  },

  methods: {
    async downloadPDF() {
      await this.$axios({
        url:
          'https://sawut-laravel.herokuapp.com/api/wakaf/laporan/posisikeuangan/download',
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'laporan_posisi_keuangan.pdf')
        document.body.appendChild(fileLink)
        fileLink.click()
      })
    },
  },
}
</script>
