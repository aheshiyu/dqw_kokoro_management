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

      <v-card-text class="pt-5 pb-0">
        <v-row class="mt-2">
          <v-img
            max-height="50"
            max-width="50"
            src="../assets/stamp_s.png"
          ></v-img>
          <v-slider
            v-model="num_s"
            color="primary" track-color="grey"
            ticks="always" tick-size="7"
            thumb-label="always" :thumb-size="24"
            min="0" max="4"
            class="pt-3 pl-3"
          >
            <template v-slot:prepend>
              <v-icon
                color="primary"
                @click="num_s = Math.max(num_s - 1, 0)"
              >
                mdi-minus
              </v-icon>
            </template>
            <template v-slot:append>
              <v-icon
                color="primary"
                @click="num_s = Math.min(num_s + 1, 4)"
              >
                mdi-plus
              </v-icon>
            </template>
          </v-slider>
        </v-row>
        <v-row>
          <v-img
            max-height="50"
            max-width="50"
            src="../assets/stamp_a.png"
          ></v-img>
          <v-slider
            v-model="num_a"
            color="primary" track-color="grey"
            ticks="always" tick-size="7"
            thumb-label="always" :thumb-size="24"
            min="0" max="3"
            class="pt-3 pl-3"
          >
            <template v-slot:prepend>
              <v-icon
                color="primary"
                @click="num_a = Math.max(num_a - 1, 0)"
              >
                mdi-minus
              </v-icon>
            </template>
            <template v-slot:append>
              <v-icon
                color="primary"
                @click="num_a = Math.min(num_a + 1, 3)"
              >
                mdi-plus
              </v-icon>
            </template>
          </v-slider>
        </v-row>
        <v-row>
          <v-img
            max-height="50"
            max-width="50"
            src="../assets/stamp_b.png"

          ></v-img>
          <v-slider
            v-model="num_b"
            color="primary" track-color="grey"
            ticks="always" tick-size="7"
            thumb-label="always" :thumb-size="24"
            min="0" max="2"
            class="pt-3 pl-3"
          >
            <template v-slot:prepend>
              <v-icon
                color="primary"
                @click="num_b = Math.max(num_b - 1, 0)"
              >
                mdi-minus
              </v-icon>
            </template>
            <template v-slot:append>
              <v-icon
                color="primary"
                @click="num_b = Math.min(num_b + 1, 2)"
              >
                mdi-plus
              </v-icon>
            </template>
          </v-slider>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end pt-4">
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
      hoge: 0,
      monster: {
        image_path: "",
        name: "",
        monster_level: "",
        is_rain: false,
        is_night: false,
      },
      num_s: 0,
      num_a: 0,
      num_b: 0,
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
      this.num_s = monster.num_s
      this.num_a = monster.num_a
      this.num_b = monster.num_b
    },

    cancel() {
      this.show_dialog = false
    },

    register() {

    },
  }
}
</script>
