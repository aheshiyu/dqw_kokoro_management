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
            label="モンスター名"
            color="light-blue darken-1"
            :rules="[required]"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-select
                v-model="monster.cost"
                :items="cost_list"
                label="コスト"
              ></v-select>
            </v-col>
            <v-col cols=3>
              <v-select
                v-model="monster.color"
                :items="color_list"
                label="色"
              >
                <template v-slot:selection="{ item }">
                  <v-icon :color="item">mdi-checkbox-blank-circle</v-icon>
                </template>
                <template v-slot:item="{ item }">
                  <v-icon :color="item">mdi-checkbox-blank-circle</v-icon>
                </template>
              </v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="monster.type"
                :items="monster_type"
                label="種類"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text class="pt-1 pb-0">
          <v-row class="mt-2 pl-3">
            <v-img
              max-height="50"
              max-width="50"
              src="@/assets/stamp_s.png"
            ></v-img>
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
            <v-img
              max-height="50"
              max-width="50"
              src="@/assets/stamp_a.png"
            ></v-img>
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
            <v-img
              max-height="50"
              max-width="50"
              src="@/assets/stamp_b.png"
            ></v-img>
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
    <Confirm ref="confirm"></Confirm>
  </v-dialog>
</template>

<script>
import Confirm from '@/components/Confirm.vue'

export default {
  name: 'AdditionalKokoroEdit',

  components: {
    Confirm
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
        cost: 1,
        color: 'blue-grey darken-1',
        type: null,
        num_s: 0,
        num_a: 0,
        num_b: 0,
        max_s: 1,
        max_a: 1,
        max_b: 1
      },
      initial_monster: null,
      user: null,
      cost_list: [...Array(300)].map((_, i) => i + 1),
      monster_type: [
        '強敵', 'ほこら', 'イベント', 'メガモン', 'その他'
      ],
      color_list: [
        'red', 'yellow darken-1', 'blue', 'purple', 'light-green', 'blue-grey darken-1'
      ],
      required: value => !!value || "必ず入力してください",
    }
  },

  methods: {
    open(monster, user) {
      this.show_edit = true
      this.user = user
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

    save() {
      if (this.$refs.form.validate()) {
        this.$emit('save_monster', this.monster)
        this.show_edit = false
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
