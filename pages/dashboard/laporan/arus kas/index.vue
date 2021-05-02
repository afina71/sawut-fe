<template>
  <v-main>
    <v-row class="pt-3">
      <v-col
        cols="12"
        md="8"
        lg="8"
        xl="8"
        class="d-flex flex-column justify-content-center"
      >
        <div class="">Arus Kas</div>
        <div class="">
          You can search for all the classes and then enter the enrollment key
          form your teacher to join those class
        </div>
      </v-col>
    </v-row>
    <v-simple-table fixed-header height="300px">
      <template #default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Calories</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-main>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },
}
</script>
