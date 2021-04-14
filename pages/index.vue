<template>
  <v-row justify="center">
    <v-card class="rounded-xl" width="500">
      <v-card-title class="green darken-1">
        <v-row class="justify-center py-5">
          <div>
            <p
              class="ma-0 text-md-h4 font-weight-medium white--text text-center"
            >
              SAWUT
            </p>
            <p
              class="ma-0 text-md-h6 font-weight-medium white--text text-center"
            >
              (Sistem Akuntansi Wakaf Uang/Tunai)
            </p>
          </div>
        </v-row>
      </v-card-title>
      <v-card-action class="white">
        <v-form ref="loginForm" class="px-10 py-5">
          <v-text-field
            label="Email"
            type="text"
            append-icon="mdi-account"
            required
          ></v-text-field>
          <v-text-field
            label="Kata Sandi"
            :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
            :type="isPasswordShown ? 'text' : 'password'"
            required
            @click:append="isPasswordShown = !isPasswordShown"
          ></v-text-field>
          <div class="text-center my-8">
            <v-btn
              x-large
              depressed
              width="100%"
              type="submit"
              class="white--text rounded-lg"
              :color="colorTheme"
              >Masuk</v-btn
            >
          </div>
        </v-form>
      </v-card-action>
    </v-card>
  </v-row>
</template>

<script>
export default {
  layout: 'auth',
  data: () => ({
    isPasswordShown: false,
    colorTheme: '#1B7A13',
  }),
}
</script>
