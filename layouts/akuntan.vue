<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      color="green darken-2"
      app
      expand-on-hover
      permanent
      dark
    >
      <v-list>
        <v-list-item @click.stop="mini = !mini">
          <v-list-item-icon>
            <v-icon>mdi-menu</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group v-model="selectedItem" color="highlight">
          <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.page">
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-body-2">{{
                menu.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
            :value="false"
            prepend-icon="mdi-file-table-outline"
            active-class="highlight--text"
          >
            <template #activator>
              <v-list-item-title class="text-body-2">Laporan</v-list-item-title>
            </template>
            <v-list-item
              v-for="laporan in submenu1"
              :key="laporan.title"
              active-class="highlight--text"
              :to="laporan.page"
              link
            >
              <v-list-item-title class="text-body-2 pl-14">{{
                laporan.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-group
            :value="false"
            prepend-icon="mdi-hexagon-multiple-outline"
            active-class="highlight--text"
          >
            <template #activator>
              <v-list-item-title class="text-body-2"
                >Data Lainnya</v-list-item-title
              >
            </template>
            <v-list-item
              v-for="lain in submenu2"
              :key="lain.title"
              active-class="highlight--text"
              :to="lain.page"
              link
            >
              <v-list-item-title class="text-body-2 pl-14">{{
                lain.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-item to="/akuntan/pengaturan">
            <v-list-item-icon>
              <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-body-2"
              >Pengaturan</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="green lighten-5" flat>
      <v-toolbar-title>SAWUT</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom min-width="200px" rounded offset-y>
        <template #activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-icon large :color="colorTheme"> mdi-account-circle </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-btn depressed rounded text to="/signout"> Keluar </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-container>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    colorTheme: '#388E3C',
    selectedItem: 1,
    menus: [
      {
        title: 'Beranda',
        icon: 'mdi-home-outline',
        page: '/akuntan/beranda',
      },
      {
        title: 'Penerimaan Wakaf',
        icon: 'mdi-inbox-arrow-down-outline',
        page: '/akuntan/penerimaanWakaf',
      },
      {
        title: 'Pengelolaan Wakaf',
        icon: 'mdi-chart-box-outline',
        page: '/akuntan/pengelolaanWakaf',
      },
      {
        title: 'Penyaluran Manfaat',
        icon: 'mdi-handshake-outline',
        page: '/akuntan/penyaluranManfaat',
      },
      {
        title: 'Pengajuan Biaya',
        icon: 'mdi-swap-horizontal-circle-outline',
        page: '/akuntan/pengajuanBiaya',
      },
      {
        title: 'Pelunasan Piutang',
        icon: 'mdi-cash-check',
        page: '/akuntan/pelunasanPiutang',
      },
    ],
    submenu1: [
      { title: 'Posisi Keuangan', page: '/akuntan/laporan/posisiKeuangan' },
      {
        title: 'Rincian Aset Wakaf',
        page: '/akuntan/laporan/rincianAsetWakaf',
      },
      { title: 'Aktivitas', page: '/akuntan/laporan/aktivitas' },
      { title: 'Arus Kas', page: '/akuntan/laporan/arusKas' },
    ],
    submenu2: [
      {
        title: 'Data Aset Tetap',
        page: '/akuntan/dataLainnya/dataAsetTetap',
      },
      {
        title: 'Data Utang',
        page: '/akuntan/dataLainnya/dataUtang',
      },
    ],
    mini: true,
    defaultItem: {
      nama_pengguna: '',
      email: '',
      role_id: '',
      password: '',
    },
  }),
}
</script>
