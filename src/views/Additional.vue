<template>
  <v-container>
    <v-row justify="center" class="pa-3">
      <v-col lg=5 xl=5>
        <v-row class="justify-end pb-3">
          <v-radio-group v-model="setting.user" row>
            <v-radio
              v-for="user in users"
              :key="user.id"
              :label="user.name"
              :value="user.id"
              @click="save_setting(); initialize()"
            ></v-radio>
          </v-radio-group>
        </v-row>

        <v-col
          v-if="filter_strong.length==0 && filter_megamon.length==0 && filter_hokora.length==0 && filter_event.length==0 && filter_other.length==0 && !loading"
          class="mt-5"
        >
          <p class="text-center">表示するモンスターがいません。</p>
        </v-col>

        <monster-section
          v-if="!loading && filter_strong.length!=0"
          :section_title="'強敵'"
          :monsters="filter_strong"
          @edit="edit_monster"
          @delete="delete_monster"
        ></monster-section>

        <monster-section
          v-if="!loading && filter_hokora.length!=0"
          :section_title="'ほこら'"
          :monsters="filter_hokora"
          @edit="edit_monster"
          @delete="delete_monster"
        ></monster-section>

        <monster-section
          v-if="!loading && filter_event.length!=0"
          :section_title="'イベント'"
          :monsters="filter_event"
          @edit="edit_monster"
          @delete="delete_monster"
        ></monster-section>

        <monster-section
          v-if="!loading && filter_megamon.length!=0"
          :section_title="'メガモン'"
          :monsters="filter_megamon"
          @edit="edit_monster"
          @delete="delete_monster"
        ></monster-section>

        <monster-section
          v-if="!loading && filter_other.length!=0"
          :section_title="'その他'"
          :monsters="filter_other"
          @edit="edit_monster"
          @delete="delete_monster"
          class="pb-16 mb-16"
        ></monster-section>

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
        <additional-kokoro-edit ref="edit" @save_monster="save_monster"></additional-kokoro-edit>
        <confirm ref="confirm"></confirm>
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
    </v-row>
  </v-container>
</template>

<script>
import constants from '@/constants.js'
import MonsterSection from '@/components/MonsterSection.vue'
import AdditionalKokoroEdit from '@/components/AdditionalKokoroEdit.vue'
import Confirm from '@/components/Confirm.vue'
import { VueLoading } from 'vue-loading-template'

export default {
  name: 'Additional',

  components: {
    MonsterSection,
    AdditionalKokoroEdit,
    Confirm,
    VueLoading,
  },

  data() {
    return {
      loading: false,
      monsters: [],
      users: constants.users,
      setting: {
        user: null,
        default_user: null,
      },
      snackbar_settings: {
        snackbar: false,
        message: '',
      },
    }
  },

  computed: {
    filter_strong: function() {
      return this.monsters.filter(e => e.type == '強敵').sort((a, b) => a.cost - b.cost)
    },
    filter_megamon: function() {
      return this.monsters.filter(e => e.type == 'メガモン').sort((a, b) => a.cost - b.cost)
    },
    filter_hokora: function() {
      return this.monsters.filter(e => e.type == 'ほこら').sort((a, b) => a.cost - b.cost)
    },
    filter_event: function() {
      return this.monsters.filter(e => e.type == 'イベント').sort((a, b) => a.cost - b.cost)
    },
    filter_other: function() {
      return this.monsters.filter(e => e.type == 'その他').sort((a, b) => a.cost - b.cost)
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
        cost: '',
        color: '',
        type: '',
        num_s: 0,
        num_a: 0,
        num_b: 0,
        max_s: 4,
        max_a: 4,
        max_b: 3
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

    create_uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (a) => {
        let r = (new Date().getTime() + Math.random() * 16) % 16 | 0, v = a == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    async initialize() {
      this.loading = true

      this.monsters = []
      if (this.setting.user != 2 && this.setting.user != 3) {
        this.setting.user = this.setting.default_user   // 「すべて」ページから「Additional」ページに来た時など
      }
      if (this.setting.user) {
        const res = await this.$gas.get_additional(this.setting.user)
        this.monsters = res.monsters
      }

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
