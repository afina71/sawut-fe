<template>
  <v-row justify="center">
    <v-card class="rounded-xl" width="500">
      <v-card-title class="green darken-2">
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
      <v-card class="white">
        <v-form v-model="valid" class="px-10 py-5" @submit.prevent="submitForm">
          <v-text-field
            id="email"
            v-model="form.email"
            :rules="emailRules"
            label="Email"
            type="email"
            append-icon="mdi-account"
            required
          ></v-text-field>
          <v-text-field
            id="password"
            v-model="form.password"
            :rules="passwordRules"
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
              class="white--text rounded-lg green darken-2"
              :disabled="isLoading || !valid"
              >Masuk</v-btn
            >
          </div>
        </v-form>
      </v-card>
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
      colorTheme: '#388E3C',
      isLoading: false,
      valid: true,
      emailRules: [
        (v) => !!v || 'Mohon masukkan email',
        (v) => /.+@.+\..+/.test(v) || 'Alamat email tidak valid',
      ],
      passwordRules: [(v) => !!v || 'Mohon masukkan password'],
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

    async submitForm() {
      const { email, password } = this.form
      this.isLoading = true
      try {
        const user = await this.$store.dispatch('login', { email, password })
        this.$store.commit('setUser', user)
        this.$axios.setToken(`Bearer ${user.token}`)
        // await this.$store.dispatch('login', { email, password })
        this.isLoading = false
        if (user.role_id === 1) {
          this.$router.push(`/admin/beranda`)
        } else if (user.role_id === 4) {
          this.$router.push(`/bendahara/beranda`)
        } else if (user.role_id === 2) {
          this.$router.push(`/akuntan/beranda`)
        } else {
          this.$router.push(`/nazhir/beranda`)
        }
        // this.$router.push(`/dashboard/beranda`)
      } catch (error) {
        this.isLoading = false
      }
    },
    // async submitForm() {
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
