<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>こころ所持数管理</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon to="/">
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>

      <v-btn icon to="/additional">
        <v-icon>mdi-shape-circle-plus</v-icon>
      </v-btn>

      <v-btn icon to="/setting">
        <v-icon>mdi-cog</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {

    }
  },

  methods: {
  },
}
</script>
