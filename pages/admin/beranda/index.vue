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
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-form @submit.prevent="handleImport">
        <v-row class="pa-10">
          <v-col cols="10">
            <validation-provider
              v-slot="{ errors }"
              name="File"
              rules="required"
            >
              <v-file-input
                v-model="inputItem.file"
                :error-messages="errors"
                label="File"
                placeholder="Masukkan File Excel"
                dense
                outlined
              ></v-file-input>
            </validation-provider>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="2">
            <v-btn
              :color="colorTheme"
              dark
              depressed
              type="submit"
              :disabled="invalid"
            >
              Import Excel
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </validation-observer>
  </v-main>
</template>

<script>
import { required } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: '{_field_} tidak boleh kosong',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  layout: 'default',
  data: () => ({
    colorTheme: '#1B7A13',

    inputItem: {
      file: '',
    },
  }),

  methods: {
    async handleImport() {
      const { file } = this.inputItem
      this.isLoading = true
      try {
        await this.$store.dispatch('importData', {
          file,
        })
        this.$refs.observer.reset()
        this.isLoading = false
        this.handleRefreshList()
      } catch (error) {
        this.isLoading = false
      }
    },
  },
}
</script>
