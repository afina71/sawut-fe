<template>
  <v-main>
    <v-row class="pt-10">
      <v-btn :color="colorTheme" dark depressed @click.prevent="downloadPDF()"
        >Download</v-btn
      >
    </v-row>
    <v-row class="justify-center">
      <v-col cols="12">
        <pdf :src="pdfsrc"></pdf>
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

  layout: 'bendahara',

  data: () => ({
    colorTheme: '#388E3C',
    pdfsrc: null,
  }),

  created() {
    this.$axios
      .get(`http://localhost:8000/api/wakaf/laporan/aruskas/generate`, {
        responseType: 'blob',
      })
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
        url: 'http://localhost:8000/api/wakaf/laporan/aruskas/download',
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'laporan_arus_kas.pdf')
        document.body.appendChild(fileLink)
        fileLink.click()
      })
    },
  },
}
</script>
