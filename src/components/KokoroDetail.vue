<template>
  <v-dialog
    v-model="show_dialog"
    max-width="400"
  >
    <v-card
      :loading="loading"
    >
      <template slot="progress">
        <v-progress-linear
          color="primary"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <div class="pt-5">
        <v-img
          max-height="100"
          max-width="100"
          class="mx-auto"
          :src="monster.image_path"
        ></v-img>
      </div>

      <v-card-title class="font-weight-black justify-center">
        {{ monster.name }}
      </v-card-title>

      <v-card-text>
        <div class="grey--text text-center">
          {{ get_monster_level(monster.monster_level) }}
        </div>
        <div class="text-center">
          <v-icon v-if="monster.is_rain">mdi-weather-pouring</v-icon>
          <v-icon v-if="monster.is_night">mdi-weather-night</v-icon>
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-text
        class="pt-5 pb-0"
      >
        <v-text-field
          v-model="monster.num_s"
          type="number"
          label="Sの個数"
          suffix="個"
          :rules="[required, plus_num]"
          prepend-icon="mdi-alpha-s-circle"
        ></v-text-field>
        <v-text-field
          v-model="monster.num_a"
          type="number"
          label="Aの個数"
          suffix="個"
          :rules="[required, plus_num]"
          prepend-icon="mdi-alpha-a-circle"
        ></v-text-field>
        <v-text-field
          v-model="monster.num_b"
          type="number"
          label="Bの個数"
          suffix="個"
          :rules="[required, plus_num]"
          prepend-icon="mdi-alpha-b-circle"
        ></v-text-field>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn
          color="primary lighten-2"
          text
          @click="cancel"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="primary lighten-1"
          text
          disabled
          @click="register"
        >
          更新
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'KokoroDetail',

  components: {
        
  },

  data() {
    return {
      show_dialog: false,
      monster: {
        image_path: "",
        name: "",
        monster_level: "",
        is_rain: false,
        is_night: false,
        num_s: 0,
        num_a: 0,
        num_b: 0
      },
      loading: false,
      required: value => !!value || "数値を入力してください。",
      plus_num: value => value >= 0 || "正の数を入力してください。"
    }
  },

  methods: {
    get_monster_level(level) {
      switch (level) {
        case 1: return "とてもよく見かける"
        case 2: return "よく見かける"
        case 3: return "ときどき見かける"
        case 4: return "あまり見かけない"
        case 5: return "めったに見かけない"
        case 6: return "メタル系（あまり見かけない）"
        default: return ""
      }
    },

    open(monster) {
      this.show_dialog = true
      this.monster = monster
    },

    cancel() {
      this.show_dialog = false
    },

    register() {

    }
  }
}
</script>
