<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>章別こころデータ</v-toolbar-title>

      <v-spacer></v-spacer>      

      <v-btn color="green" class="mr-2" to="/">
        <v-icon>mdi-weather-sunny</v-icon>
        <span>すべて</span>
      </v-btn>
      <!-- <v-btn color="green" class="mr-2" to="/aheshiyu">
        <v-icon>mdi-account</v-icon>
        <span>あへしゆ</span>
      </v-btn>
      <v-btn color="green" to="/mikyan">
        <v-icon>mdi-account</v-icon>
        <span>みきゃん</span>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
