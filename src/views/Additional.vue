<template>
  <v-container>
    <v-col>
      <v-row class="justify-end">
        <v-radio-group v-model="setting.user" row>
          <v-radio label="あへしゆ" value="2" @click="save_setting(); initialize()"></v-radio>
          <v-radio label="みきゃん" value="3" @click="save_setting(); initialize()"></v-radio>
        </v-radio-group>
      </v-row>
      
      <v-col
        v-if="filter_strong.length==0 && filter_megamon.length==0 && filter_event.length==0 && filter_other.length==0 && !loading"
        class="mt-5"
      >
        <p class="text-center">表示するモンスターがいません。</p>
      </v-col>

      <p
        v-if="!loading && filter_strong.length!=0"
        class="text-caption mb-0 mt-8 pl-3 grey lighten-3 rounded-xl"
      >
        強敵
      </p>
      <draggable
        v-model="monsters"
        :options="{animation: 150, delay: 0, handle: '.handle'}"
        @end="drag_update"
        class="mb-8"
      >
        <v-col
          v-for="(monster, key) in monsters"
          :key="key"
          class="pa-0"
        >
          <v-card
            v-if="monster.type == '強敵'"
            elevation="0"
            class="pa-3 pb-0"
          >
            <v-row align="center" justify="space-between">
              <v-col cols=auto class="handle">
                <v-icon>mdi-drag-horizontal</v-icon>
              </v-col>
              <v-col cols=7>
                <p class="mb-0">{{ monster.name }}</p>
              </v-col>
              <v-col cols=auto>
                <v-row>
                  <v-col cols=auto class="pr-0">
                    <v-btn icon @click="edit_monster(monster)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols=auto class="pl-0">
                    <v-btn icon @click="delete_monster(monster)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </draggable>

      <p
        v-if="!loading && filter_megamon.length!=0"
        class="text-caption mb-0 pl-3 grey lighten-3 rounded-xl"
      >
        メガモン
      </p>
      <draggable
        v-model="monsters"
        :options="{animation: 150, delay: 0, handle: '.handle'}"
        @end="drag_update"
        class="mb-8"
      >
        <v-col
          v-for="(monster, key) in monsters"
          :key="key"
          class="pa-0"
        >
          <v-card
            v-if="monster.type == 'メガモン'"
            elevation="0"
            class="pa-3 pb-0"
          >
            <v-row align="center" justify="space-between">
              <v-col cols=auto class="handle">
                <v-icon>mdi-drag-horizontal</v-icon>
              </v-col>
              <v-col cols=7>
                <p class="mb-0">{{ monster.name }}</p>
              </v-col>
              <v-col cols=auto>
                <v-row>
                  <v-col cols=auto class="pr-0">
                    <v-btn icon @click="edit_monster(monster)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols=auto class="pl-0">
                    <v-btn icon @click="delete_monster(monster)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </draggable>

      <p
        v-if="!loading && filter_event.length!=0"
        class="text-caption mb-0 pl-3 grey lighten-3 rounded-xl"
      >
        イベント
      </p>
      <draggable
        v-model="monsters"
        :options="{animation: 150, delay: 0, handle: '.handle'}"
        @end="drag_update"
        class="mb-8"
      >
        <v-col
          v-for="(monster, key) in monsters"
          :key="key"
          class="pa-0"
        >
          <v-card
            v-if="monster.type == 'イベント'"
            elevation="0"
            class="pa-3 pb-0"
          >
            <v-row align="center" justify="space-between">
              <v-col cols=auto class="handle">
                <v-icon>mdi-drag-horizontal</v-icon>
              </v-col>
              <v-col cols=7>
                <p class="mb-0">{{ monster.name }}</p>
              </v-col>
              <v-col cols=auto>
                <v-row>
                  <v-col cols=auto class="pr-0">
                    <v-btn icon @click="edit_monster(monster)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols=auto class="pl-0">
                    <v-btn icon @click="delete_monster(monster)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </draggable>

      <p
        v-if="!loading && filter_other.length!=0"
        class="text-caption mb-0 pl-3 grey lighten-3 rounded-xl"
      >
        その他
      </p>
      <draggable
        v-model="monsters"
        :options="{animation: 150, delay: 0, handle: '.handle'}"
        @end="drag_update"
        class="mb-8"
      >
        <v-col
          v-for="(monster, key) in monsters"
          :key="key"
          class="pa-0"
        >
          <v-card
            v-if="monster.type == 'その他'"
            elevation="0"
            class="pa-3 pb-0"
          >
            <v-row align="center" justify="space-between">
              <v-col cols=auto class="handle">
                <v-icon>mdi-drag-horizontal</v-icon>
              </v-col>
              <v-col cols=7>
                <p class="mb-0">{{ monster.name }}</p>
              </v-col>
              <v-col cols=auto>
                <v-row>
                  <v-col cols=auto class="pr-0">
                    <v-btn icon @click="edit_monster(monster)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols=auto class="pl-0">
                    <v-btn icon @click="delete_monster(monster)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </draggable>
      <v-btn
        color="light-blue"
        dark
        fixed
        bottom
        right
        fab
        class="mb-15 mr-5"
        @click="add_monster"
      >
        <v-icon
          size=32
        >
          mdi-plus
        </v-icon>
      </v-btn>
      <AdditionalKokoroEdit ref="edit" @save_monster="save_monster"></AdditionalKokoroEdit>
      <Confirm ref="confirm"></Confirm>
      <vue-loading
        v-if="loading"
        type="bubbles"
        color="#03A9F4"
        :size="{ width: '50px', height: '50px' }"
        class="mt-5"
      ></vue-loading>
    </v-col>
    <v-snackbar
      v-model="snackbar_settings.snackbar"
      color="success"
    >
      <v-row align="center">
        <v-col cols="auto" class="pr-0">
          <v-icon small>mdi-check-circle</v-icon>
        </v-col>
        <v-col cols="auto">
          <p class="mb-0">{{ snackbar_settings.message }}</p>
        </v-col>
      </v-row>
      <template v-slot:action="{ attrs }">
        <v-btn
          icon 
          color="white"
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import AdditionalKokoroEdit from '@/components/AdditionalKokoroEdit.vue'
import Confirm from '@/components/Confirm.vue'
import { VueLoading } from 'vue-loading-template'
import draggable from 'vuedraggable'

export default {
  name: 'Additional',

  components: {
    draggable,
    AdditionalKokoroEdit,
    Confirm,
    VueLoading,
  },

  data() {
    return {
      loading: false,
      monsters: [],
      setting: {
        user: 2,
      },
      snackbar_settings: {
        snackbar: false,
        message: '',
      },
    }
  },

  computed: {
    filter_strong: function() {
      // console.log(this.monsters.filter(e => e.type == '強敵'))
      return this.monsters.filter(e => e.type == '強敵')
    },
    filter_megamon: function() {
      // console.log(this.monsters.filter(e => e.type == 'メガモン'))
      return this.monsters.filter(e => e.type == 'メガモン')
    },
    filter_event: function() {
      // console.log(this.monsters.filter(e => e.type == 'イベント'))
      return this.monsters.filter(e => e.type == 'イベント')
    },
    filter_other: function() {
      // console.log(this.monsters.filter(e => e.type == 'その他'))
      return this.monsters.filter(e => e.type == 'その他')
    }
  },

  methods: {

    save_setting() {
      this.$store.dispatch({
        type: 'save_setting',
        setting: JSON.parse(JSON.stringify(this.setting)) // shallowコピーを防ぐため（このプロジェクトでは意味がないが）
      })
    },

    set_snackbar(flag, message) {
      this.snackbar_settings.snackbar = flag
      this.snackbar_settings.message = message
    },

    add_monster() {
      this.snackbar_settings.snackbar = false
      const new_monster = {
        id: '',
        name: '',
        type: 'その他',
        num_s: 0,
        num_a: 0,
        num_b: 0,
        max_s: 4,
        max_a: 3,
        max_b: 2
      }
      this.$refs.edit.open(new_monster)
    },
    edit_monster(monster) {
      this.snackbar_settings.snackbar = false
      this.$refs.edit.open(monster)
    },

    save_monster(monster) {
      if (monster.id == '') {
        monster.id = this.create_uuid().slice(0, 8)
        this.monsters.push(monster)
        this.snackbar_settings.message = 'データを追加しました。'
        this.snackbar_settings.snackbar = true
      } else {
        const index = this.monsters.findIndex(e => e.id == monster.id)
        this.$set(this.monsters, index, JSON.parse(JSON.stringify(monster)))
        this.snackbar_settings.message = 'データを更新しました。'
        this.snackbar_settings.snackbar = true
      }
      this.$gas.update_additional(this.setting.user, monster)
    },
    async delete_monster(monster) {
      this.snackbar_settings.snackbar = false
      if (await this.$refs.confirm.confirm('確認', '「' + monster.name + '」を削除しますか？')) {
        this.monsters = this.monsters.filter(e => e.id != monster.id)
        this.$gas.delete_additional(this.setting.user, monster)
        this.snackbar_settings.message = 'データを削除しました。'
        this.snackbar_settings.snackbar = true
      }
    },
    drag_update() {
      this.$gas.update_list_additional(this.setting.user, this.monsters)
    },

    create_uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (a) => {
        let r = (new Date().getTime() + Math.random() * 16) % 16 | 0, v = a == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    async initialize() {
      this.loading = true

      this.monsters = []
      const res = await this.$gas.get_additional(this.setting.user)
      this.monsters = res.monsters

      this.loading = false

      console.log('data loaded!')
    },
  },
  mounted() {
    this.setting = { ...this.$store.state.setting }
    this.initialize()
  },
  beforeCreate() {
    this.$store.dispatch('load_setting')
  }
}
</script>
