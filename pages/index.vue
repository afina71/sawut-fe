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
        <v-form class="px-10 py-5" @submit.prevent="submitForm">
          <v-text-field
            id="email"
            v-model="form.email"
            label="Email"
            type="email"
            append-icon="mdi-account"
            required
          ></v-text-field>
          <v-text-field
            id="password"
            v-model="form.password"
            label="Kata Sandi"
            :type="type"
            :append-icon="icon"
            required
            @click:append="togglePassword"
          ></v-text-field>
          <div class="text-center my-8">
            <v-btn
              x-large
              depressed
              width="100%"
              type="submit"
              class="white--text rounded-lg"
              :color="colorTheme"
              :disabled="isLoading || areAllInputsEmpty"
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
  data: () => {
    return {
      form: {
        email: '',
        password: '',
      },
      isPasswordShown: false,
      colorTheme: '#1B7A13',
      isLoading: false,
    }
  },

  computed: {
    type() {
      return this.isPasswordShown ? 'text' : 'password'
    },
    icon() {
      return this.isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'
    },
    areAllInputsEmpty() {
      return Object.values(this.form).some((value) => !value)
    },
  },

  methods: {
    togglePassword(e) {
      this.isPasswordShown = !this.isPasswordShown
    },
    submitForm() {
      this.isLoading = true
      this.$axios
        .post('http://127.0.0.1:8000/api/login', {
          email: this.form.email,
          password: this.form.password,
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      console.log('hello afin')
    },
    // async submitForm() {
    //   const { email, password } = this.form
    //   this.isLoading = true
    //   try {
    //     await this.$auth.loginWith('local', {
    //       data: {
    //         email: this.form.email,
    //         password: this.form.password,
    //       },
    //     })
    //     this.isLoading = false
    //   } catch (error) {
    //     this.isLoading = false
    //   }
    // },
  },
}
</script>
