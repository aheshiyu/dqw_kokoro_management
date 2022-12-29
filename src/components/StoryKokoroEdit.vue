<template>
  <v-dialog
    v-model="show_dialog"
    persistent
    max-width="400"
  >
    <v-card>

      <v-card-text class="py-0">
        <v-row justify="center" class="pt-5">
          <v-col cols=auto>
            <img
              :src="monster.image_path"
              width="100"
              height="100"
              style="vertical-align: middle"
            />
          </v-col>
        </v-row>
      </v-card-text>

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
        <v-row class="mt-2 pl-3">
          <img
            src="@/assets/stamp_s.png"
            width="50"
            height="50"
          />
          <v-slider
            v-model="monster.num_s"
            color="primary" track-color="grey"
            ticks="always" tick-size="7"
            thumb-label="always" :thumb-size="24"
            min="0" max="4"
            class="pt-3 px-6"
          >
          </v-slider>
        </v-row>
        <v-row class="pl-3">
          <img
            src="@/assets/stamp_a.png"
            width="50"
            height="50"
          />
          <v-slider
            v-model="monster.num_a"
            color="primary" track-color="grey"
            ticks="always" tick-size="7"
            thumb-label="always" :thumb-size="24"
            min="0" max="3"
            class="pt-3 px-6"
          >
          </v-slider>
        </v-row>
        <v-row class="pl-3">
          <img
            src="@/assets/stamp_b.png"
            width="50"
            height="50"
          />
          <v-slider
            v-model="monster.num_b"
            color="primary" track-color="grey"
            ticks="always" tick-size="7"
            thumb-label="always" :thumb-size="24"
            min="0" max="2"
            class="pt-3 px-6"
          >
          </v-slider>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end pt-4">
        <v-btn
          color="primary lighten-2"
          text
          @click="close"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="primary lighten-1"
          text
          @click="register"
        >
          更新
        </v-btn>
      </v-card-actions>
    </v-card>
    <Confirm ref="confirm"></Confirm>
  </v-dialog>
</template>

<script>
import constants from '@/constants.js'
import Confirm from '@/components/Confirm.vue'

export default {
  name: 'StoryKokoroEdit',

  components: {
    Confirm
  },

  data() {
    return {
      show_dialog: false,
      monster: {
        name: "no_img",
        monster_level: "",
        is_rain: false,
        is_night: false,
      },
      initial_monster: null,
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
      this.$emit('snackbar', false)
      this.monster = monster
      this.initial_monster = JSON.parse(JSON.stringify(this.monster)) // Deepコピー
    },

    is_change() {
      return JSON.stringify(this.initial_monster) !== JSON.stringify(this.monster)
    },

    async close() {
      if (this.is_change()) {
        if (await this.$refs.confirm.confirm('本当にキャンセルしますか？', 'こころの数が変更されています。')) {
          this.show_dialog = false
        }
      } else {
        this.show_dialog = false
      }
    },

    async register() {
      const register_process = () => {
        this.$emit('snackbar', true)
        if (this.is_change()) {
          this.$emit('update', this.monster)
        }
        this.show_dialog = false
      }
      const setting = { ...this.$store.state.setting }
      if (setting.user != setting.default_user) {
        const user = constants.users.find(u => u.id == setting.user)
        if (await this.$refs.confirm.confirm('本当に更新しますか？', `${user.name}のこころを更新します。`)) {
          register_process()
        }
      } else {
        register_process()
      }
    },
  }
}
</script>
