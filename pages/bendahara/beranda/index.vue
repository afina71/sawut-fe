<template>
  <v-main>
    <v-row class="py-10 justify-center">
      <div class="text-h6">Informasi Kegiatan Wakaf</div>
    </v-row>
    <v-row class="px-10">
      <v-col class="col-md-4">
        <v-card class="pa-10" outlined>
          <v-row class="justify-center">
            <span class="text-body-1 font-weight-medium"
              >Total Penerimaan Wakaf</span
            >
          </v-row>
          <v-row class="pt-4 align-center">
            <v-col>
              <span class="text-h5 font-weight-bold green--text text--darken-1"
                >20</span
              >
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <span class="text-body-1 font-weight-medium">Penerimaan</span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="col-md-4">
        <v-card class="pa-10" outlined>
          <v-row class="justify-center">
            <span class="text-body-1 font-weight-medium">Total Wakif</span>
          </v-row>
          <v-row class="pt-4 align-center">
            <v-col>
              <span class="text-h5 font-weight-bold green--text text--darken-1"
                >20</span
              >
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <span class="text-body-1 font-weight-medium">Wakif</span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="col-md-4">
        <v-card class="pa-10" outlined>
          <v-row class="justify-center">
            <span class="text-body-1 font-weight-medium"
              >Total Penerima Manfaat</span
            >
          </v-row>
          <v-row class="pt-4 align-center">
            <v-col>
              <span class="text-h5 font-weight-bold green--text text--darken-1"
                >14</span
              >
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <span class="text-body-1 font-weight-medium">Penerima</span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  layout: 'bendahara',
}
</script>
