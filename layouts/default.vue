<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      :mini-variant.sync="mini"
      permanent
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

    <v-app-bar app>
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
        page: '/dashboard/penerimaan wakaf',
      },
      {
        title: 'Pengelolaan Wakaf',
        icon: 'mdi-chart-box-outline',
        page: '/dashboard/pengelolaan wakaf',
      },
      {
        title: 'Penyaluran Manfaat',
        icon: 'mdi-handshake-outline',
        page: '/dashboard/penyaluran manfaat',
      },
      {
        title: 'Pengajuan Biaya',
        icon: 'mdi-swap-horizontal-circle-outline',
        page: '/dashboard/pengajuan biaya',
      },
      {
        title: 'Pelunasan Piutang',
        icon: 'mdi-cash-check',
        page: '/dashboard/pelunasan piutang',
      },
    ],
    submenu1: [
      { title: 'Posisi Keuangan', page: '/dashboard/laporan/posisi keuangan' },
      {
        title: 'Rincian Aset Wakaf',
        page: '/dashboard/laporan/rincian aset wakaf',
      },
      { title: 'Aktivitas', page: '/dashboard/laporan/aktivitas' },
      { title: 'Arus Kas', page: '/dashboard/laporan/arus kas' },
    ],
    submenu2: [
      {
        title: 'Data Aset Tetap',
        page: '/dashboard/data lainnya/data aset tetap',
      },
      {
        title: 'Data Utang',
        page: '/dashboard/data lainnya/data utang',
      },
    ],
    submenu3: [
      { title: 'Data Akun', page: '/dashboard/pengaturan/data akun' },
      { title: 'Data Pengguna', page: '/dashboard/pengaturan/data pengguna' },
    ],
    mini: true,
  }),
}
</script>
