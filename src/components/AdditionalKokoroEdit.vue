<template>
  <v-dialog
    v-model="show_edit"
    persistent
    max-width="400"
  >
    <v-card>
      <v-form ref="form" v-model="valid">
        <v-card-title>{{ title }}</v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-text-field
            v-model="monster.name"
            label="モンスター名*"
            color="light-blue darken-1"
            :rules="[required]"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                v-model="monster.cost"
                label="コスト*"
                type="number"
                color="light-blue darken-1"
                :rules="[required, is_plus]"
              ></v-text-field>
            </v-col>
            <v-col cols=3>
              <v-select
                v-model="monster.color"
                :items="color_list"
                :menu-props="{ auto: true, contentClass: 'select_color' }" 
                label="色*"
                :rules="[required]"
              >
                <template v-slot:selection="{ item }">
                  <v-icon v-if="item=='rainbow'" color="orange">mdi-looks</v-icon>
                  <v-icon v-else :color="item">mdi-checkbox-blank-circle</v-icon>
                </template>
                <template v-slot:item="{ item }">
                  <v-icon v-if="item=='rainbow'" color="orange">mdi-looks</v-icon>
                  <v-icon v-else :color="item">mdi-checkbox-blank-circle</v-icon>
                </template>
              </v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="monster.type"
                :items="monster_type"
                :menu-props="{ auto: true, contentClass: 'select_type' }" 
                label="種類*"
                :rules="[required]"
              ></v-select>
            </v-col>
          </v-row>
          <v-select
            v-if="monster.type == 'イベント' || monster.type == 'その他'"
            v-model="monster.seen"
            :items="monster_seen"
            :menu-props="{ auto: true, contentClass: 'select_seen' }" 
            label="見かけやすさ"
            clearable
          ></v-select>
        </v-card-text>

        <v-card-text class="pt-1 pb-0">
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
              min="0" :max="monster.max_s"
              class="pt-3 px-6"
            >
              <template v-slot:prepend>
                <v-icon
                  color="primary"
                  @click="monster.max_s = Math.max(monster.max_s - 1, 1)"
                >
                  mdi-minus
                </v-icon>
              </template>
              <template v-slot:append>
                <v-icon
                  color="primary"
                  @click="monster.max_s = Math.min(monster.max_s + 1, 10)"
                >
                  mdi-plus
                </v-icon>
              </template>
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
              min="0" :max="monster.max_a"
              class="pt-3 px-6"
            >
              <template v-slot:prepend>
                <v-icon
                  color="primary"
                  @click="monster.max_a = Math.max(monster.max_a - 1, 1)"
                >
                  mdi-minus
                </v-icon>
              </template>
              <template v-slot:append>
                <v-icon
                  color="primary"
                  @click="monster.max_a = Math.min(monster.max_a + 1, 10)"
                >
                  mdi-plus
                </v-icon>
              </template>
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
              min="0" :max="monster.max_b"
              class="pt-3 px-6"
            >
              <template v-slot:prepend>
                <v-icon
                  color="primary"
                  @click="monster.max_b = Math.max(monster.max_b - 1, 1)"
                >
                  mdi-minus
                </v-icon>
              </template>
              <template v-slot:append>
                <v-icon
                  color="primary"
                  @click="monster.max_b = Math.min(monster.max_b + 1, 10)"
                >
                  mdi-plus
                </v-icon>
              </template>
            </v-slider>
          </v-row>
        </v-card-text>

        <v-card-text>
          <v-row justify="end">
            <v-col cols=auto class="py-0 px-10">
              <span class="grey--text">進捗率: {{ Math.ceil((get_current_value(monster) / get_max_value(monster)) * 100) }}% ({{ get_current_value(monster) }} / {{ get_max_value(monster) }})</span>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="justify-end pt-4">
          <v-btn
            color="light-blue darken-3"
            text
            @click="close(true)"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="light-blue darken-3"
            text
            @click="save"
          >
            {{ button_label }}
          </v-btn>
        </v-card-actions>        
      </v-form>
    </v-card>
    <confirm ref="confirm"></confirm>
  </v-dialog>
</template>

<script>
import constants from '@/constants.js'
import Confirm from '@/components/Confirm.vue'

export default {
  name: 'AdditionalKokoroEdit',

  components: {
    Confirm,
  },

  data() {
    return {
      show_edit: false,
      title: '',
      button_label: '',
      valid: true,
      monster: {
        id: '',
        name: '',
        cost: '',
        color: '',
        type: '',
        seen: '',
        num_s: 0,
        num_a: 0,
        num_b: 0,
        max_s: 1,
        max_a: 1,
        max_b: 1
      },
      initial_monster: null,
      monster_type: [
        '強敵', 'ほこら', 'イベント', 'メガモン', 'その他'
      ],
      color_list: [
        'red', 'yellow darken-1', 'blue', 'purple', 'light-green'
      ],
      // 虹枠を考慮した方（HTMLの変更は不要）
      // color_list: [
      //   'red', 'yellow darken-1', 'blue', 'purple', 'light-green', 'rainbow'
      // ],
      monster_seen: [
        'とてもよく見かける',
        'よく見かける',
        'ときどき見かける',
        'あまり見かけない',
        'めったに見かけない'
      ],
      required: value => !!value || "入力必須",
      is_plus: value => value>=0 || "正の値を入力"
    }
  },

  methods: {
    open(monster) {
      this.show_edit = true
      if (monster.id == '') {
        this.title = "こころデータ追加"
        this.button_label = "追加"
      } else {
        this.title = "こころデータ編集"
        this.button_label = "更新"
      }
      this.monster = JSON.parse(JSON.stringify(monster))
      this.initial_monster = JSON.parse(JSON.stringify(monster))
      // dialogが生成される前に中のformを参照するとエラーになるため
      if (this.$refs.form) { 
        this.$refs.form.resetValidation()
      }
    },

    async save() {
      const save_process = () => {
        if (this.$refs.form.validate()) {
          // 見かけやすさを設定しない種類の場合は既存の見かけやすさを削除する
          if (!(this.monster.type == 'イベント' || this.monster.type == 'その他')) {
            this.monster.seen = ''
          }
          this.$emit('save_monster', this.monster)
          this.show_edit = false
        }
      }
      const setting = { ...this.$store.state.setting }
      if (setting.user != setting.default_user) {
        const user = constants.users.find(u => u.id == setting.user)
        if (await this.$refs.confirm.confirm(`本当に${this.button_label}しますか？`, `${user.name}のこころを${this.button_label}します。`)) {
          save_process()
        }
      } else {
        save_process()
      }
    },
    async close() {
      if (this.is_change()) {
        if (await this.$refs.confirm.confirm('変更を破棄しますか？')) {
          this.show_edit = false
        }
      } else {
        this.show_edit = false
      }
    },
    is_change() {
      return JSON.stringify(this.initial_monster) !== JSON.stringify(this.monster)
    },
  }
}
</script>

<style>
.select_color {
  max-height: 300px !important;
}
.select_type {
  max-height: 300px !important;
}
.select_seen {
  max-height: 300px !important;
}
</style>