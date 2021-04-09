<template>
  <v-app>
    <v-app-bar app></v-app-bar>

    <v-container fill-height>
      <v-row class="d-flex align-center">
        <v-col class="pb-10"> </v-col>
        <v-col>
          <v-card-title class="font py-5"> Wappita </v-card-title>
          <v-card-text class="ma-2">
            Bagikan dan temukan pengetahuan baru. Perluas pengetahuan anda
            dengan membaca berbagai konten yang menarik.
          </v-card-text>
          <v-row class="pl-8 pt-6">
            <div class="mr-8">
              <v-btn
                class="white--text red accent-2 rounded-xl"
                outlined
                width="100"
                >Masuk</v-btn
              >
            </div>
            <div>
              <v-btn
                class="rounded-xl"
                :color="colorTheme"
                outlined
                :to="{ name: 'Register' }"
                >Register</v-btn
              >
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {}
</script>

<style></style>
