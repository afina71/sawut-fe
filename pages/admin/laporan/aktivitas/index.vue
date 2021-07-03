<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Laporan Aktivitas</div>
    </v-row>
    <v-row class="pb-10">
      <v-spacer></v-spacer>
      <v-btn :color="colorTheme" dark depressed @click.prevent="downloadPDF()"
        >Download</v-btn
      >
    </v-row>
    <v-row class="justify-center">
      <pdf :src="pdfsrc"></pdf>
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

  // async asyncData({ store }) {
  //   return {
  //     preview: await store.dispatch('tampilLaporanAktivitas'),
  //   }
  // },

  data: () => ({
    colorTheme: '#388E3C',
    pdfsrc: null,
  }),

  created() {
    this.$axios
      .get(
        `https://sawut-laravel.herokuapp.com/api/wakaf/laporan/aktivitas/generate`,
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
      // this.download = await this.$store.dispatch('getLaporanAktivitas')
      await this.$axios({
        url:
          'https://sawut-laravel.herokuapp.com/api/wakaf/laporan/aktivitas/download',
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'laporan_aktivitas.pdf')
        document.body.appendChild(fileLink)
        fileLink.click()
      })
    },

    // read() {
    //   // const reader = new FileReader()
    //   // reader.readAsText(this.preview)

    //   this.file = this.$refs.file.preview[0]
    //   const reader = new FileReader()

    //   reader.addEventListener(
    //     'load',
    //     function () {
    //       this.html = reader.result
    //     }.bind(this),
    //     false
    //   )

    //   reader.readAsText(this.file)
    // },

    // async downloadPDF() {
    //   await this.$axios(
    //     'https://sawut-laravel.herokuapp.com/api/wakaf/laporan/aktivitas/download',
    //     {
    //       method: 'GET',
    //       responseType: 'blob',
    //     }
    //   )
    //     .then((response) => {
    //       // Create a Blob from the PDF Stream
    //       const file = new Blob([response.data], { type: 'application/pdf' })
    //       // Build a URL from the file
    //       const fileURL = URL.createObjectURL(file)
    //       // Open the URL on new Window
    //       window.open(fileURL)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
  },
}
</script>
