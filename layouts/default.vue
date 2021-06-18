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
        <v-list-item-group v-model="selectedItem" color="primary">
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

          <v-list-group :value="false" prepend-icon="mdi-file-table-outline">
            <template #activator>
              <v-list-item-title class="text-body-2">Laporan</v-list-item-title>
            </template>
            <v-list-item
              v-for="laporan in submenu1"
              :key="laporan.title"
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
          >
            <template #activator>
              <v-list-item-title class="text-body-2"
                >Data Lainnya</v-list-item-title
              >
            </template>
            <v-list-item
              v-for="lain in submenu2"
              :key="lain.title"
              :to="lain.page"
              link
            >
              <v-list-item-title class="text-body-2 pl-14">{{
                lain.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-group :value="false" prepend-icon="mdi-cog-outline">
            <template #activator>
              <v-list-item-title class="text-body-2"
                >Pengaturan</v-list-item-title
              >
            </template>
            <v-list-item
              v-for="pengaturan in submenu3"
              :key="pengaturan.title"
              :to="pengaturan.page"
              link
            >
              <v-list-item-title class="text-body-2 pl-14">{{
                pengaturan.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="green lighten-5" flat>
      <v-toolbar-title>SAWUT</v-toolbar-title>
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
    selectedItem: 1,
    menus: [
      {
        title: 'Beranda',
        icon: 'mdi-home-outline',
        page: '/dashboard/beranda',
      },
      {
        title: 'Penerimaan Wakaf',
        icon: 'mdi-inbox-arrow-down-outline',
        page: '/dashboard/penerimaanWakaf',
      },
      {
        title: 'Pengelolaan Wakaf',
        icon: 'mdi-chart-box-outline',
        page: '/dashboard/pengelolaanWakaf',
      },
      {
        title: 'Penyaluran Manfaat',
        icon: 'mdi-handshake-outline',
        page: '/dashboard/penyaluranManfaat',
      },
      {
        title: 'Pengajuan Biaya',
        icon: 'mdi-swap-horizontal-circle-outline',
        page: '/dashboard/pengajuanBiaya',
      },
      {
        title: 'Pelunasan Piutang',
        icon: 'mdi-cash-check',
        page: '/dashboard/pelunasanPiutang',
      },
    ],
    submenu1: [
      { title: 'Posisi Keuangan', page: '/dashboard/laporan/posisiKeuangan' },
      {
        title: 'Rincian Aset Wakaf',
        page: '/dashboard/laporan/rincianAsetWakaf',
      },
      { title: 'Aktivitas', page: '/dashboard/laporan/aktivitas' },
      { title: 'Arus Kas', page: '/dashboard/laporan/arusKas' },
    ],
    submenu2: [
      {
        title: 'Data Aset Tetap',
        page: '/dashboard/dataLainnya/dataAsetTetap',
      },
      {
        title: 'Data Utang',
        page: '/dashboard/dataLainnya/dataUtang',
      },
    ],
    submenu3: [
      { title: 'Data Akun', page: '/dashboard/pengaturan/dataAkun' },
      { title: 'Data Pengguna', page: '/dashboard/pengaturan/dataPengguna' },
    ],
    mini: true,
  }),
}
</script>
