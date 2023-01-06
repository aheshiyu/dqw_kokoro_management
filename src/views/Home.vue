<template>  
  <v-container>
    <v-col>
      <v-row class="justify-end">
        <v-radio-group
          row
          v-model="selected_user"
          @change="set_select"
        >
          <v-radio
            label="すべて"
            value="1"
          ></v-radio>
          <v-radio
            v-for="user in users"
            :key="user.id"
            :label="user.name"
            :value="user.id"
          ></v-radio>
        </v-radio-group>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="datas"
        :items-per-page="-1"
        height="75vh"
        fixed-header
        hide-default-footer
        hide-default-header
        mobile-breakpoint="100"
        loading-text="読込中..."
        no-data-text="データがありません。"
        class="elevation-1 fixed-column-table"
      >

        <template v-slot:header="{ props }">
          <th
            v-for="(head, key) in props.headers"
            :key="key"
            class="text-caption text-left font-weight-bold pa-1"
            :class="{ header_left: head.value=='story', header_other: head.value!='story' }"
            :style="'min-width: ' + head.width + 'px'"
          >
            <!-- 並び替えボタン -->
            <div v-if="key == 0">
              <v-row justify="center">
                <v-col cols=auto class="pt-4 pb-3">
                  <v-btn
                    icon
                    @click="reverse_datas"
                  >
                    <v-icon :class="{ arrow_down: setting.sort_asc }">
                      mdi-arrow-down
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <!-- 通常のヘッダ -->
            <div v-else>
              <span>{{ head.text.split(' ')[0] }}</span>
              <!-- 都道府県名を表示する場合 -->
              <div v-if="head.text.split(' ').length == 2">
                <span class="grey--text">{{ head.text.split(' ')[1] }}</span>
              </div>
            </div>
          </th>
        </template>

        <template v-slot:item="{ item }">
          <tr
            :class="{ 'selected_row': (setting.user==2 && item.story_aheshiyu=='x') || (setting.user==3 && item.story_mikyan=='x') }"
          >
            <td
              class="px-1 font-weight-bold text-center"
              :class="{ 'selected_row': (setting.user==2 && item.story_aheshiyu=='x') || (setting.user==3 && item.story_mikyan=='x') }"
              @click="set_select_story(item)"
            >
              <span>
                {{ item.story.split(' ')[0] }}
              </span>
              <br/>
              <span class="text-caption grey--text">
                {{ item.story.split(' ')[1] }}
              </span>
            </td>
            <td>
              <v-row>
                <v-col v-for="(id, key) in item.rare5" :key="key" class="pa-0" cols=auto>
                  <div
                    @click="open_detail(id)"
                  >
                    <monster-icon
                      :monster="get_monster(id)"
                      :user="setting.user"
                    ></monster-icon>
                  </div>
                </v-col>
              </v-row>
            </td>
            <td>
              <v-row>
                <v-col v-for="(id, key) in item.rare4" :key="key" class="pa-0" cols=auto>
                  <div
                    @click="open_detail(id)"
                  >
                    <monster-icon
                      :monster="get_monster(id)"
                      :user="setting.user"
                    ></monster-icon>
                  </div>
                </v-col>
              </v-row>
            </td>
            <td>
              <v-row>
                <v-col v-for="(id, key) in item.rare6" :key="key" class="pa-0" cols=auto>
                  <div
                    @click="open_detail(id)"
                  >
                    <monster-icon
                      :monster="get_monster(id)"
                      :user="setting.user"
                    ></monster-icon>
                  </div>
                </v-col>
              </v-row>
            </td>
            <td>
              <v-row>
                <v-col v-for="(id, key) in item.rare3" :key="key" class="pa-0" cols=auto>
                  <div
                    @click="open_detail(id)"
                  >
                    <monster-icon
                      :monster="get_monster(id)"
                      :user="setting.user"
                    ></monster-icon>
                  </div>
                </v-col>
              </v-row>
            </td>
            <td>
              <v-row>
                <v-col v-for="(id, key) in item.region[setting.prefecture - 1]" :key="key" class="pa-0" cols=auto>
                  <div
                    @click="open_detail(id)"
                  >
                    <monster-icon
                      :monster="get_monster(id)"
                      :user="setting.user"
                    ></monster-icon>
                  </div>
                </v-col>
              </v-row>
            </td>
            <td>
              <v-row>
                <v-col v-for="(id, key) in item.rare2" :key="key" class="pa-0" cols=auto>
                  <div
                    @click="open_detail(id)"
                  >
                    <monster-icon
                      :monster="get_monster(id)"
                      :user="setting.user"
                    ></monster-icon>
                  </div>
                </v-col>
              </v-row>
            </td>
            <td>
              <v-row>
                <v-col v-for="(id, key) in item.rare1" :key="key" class="pa-0" cols=auto>
                  <div
                    @click="open_detail(id)"
                  >
                    <monster-icon
                      :monster="get_monster(id)"
                      :user="setting.user"
                    ></monster-icon>
                  </div>
                </v-col>
              </v-row>
            </td>
          </tr>
        </template>

      </v-data-table>
    </v-col>
    <story-kokoro-edit
      ref="kokoroDetail"
      @snackbar="set_snackbar"
      @update="update"
    ></story-kokoro-edit>
    <!-- v-overlayが内部的にv-ifを利用しているため画像が出ないときがある．v-showの方が表示オン・オフだからOKっぽい -->
    <v-overlay
      v-show="loading"
      z-index=4
      color="white"
      opacity="0.7"
      :value="true"
    >
      <img
        src="@/assets/loading.png"
        width="150"
        height="150"
      />
      <!-- 動きのあるローディング画面は処理の重さで動作がイマイチになる・・ -->
      <!-- <vue-loading
        type="spin"
        color="#03A9F4"
        :size="{ width: '100px', height: '100px' }"
      ></vue-loading> -->
      <!-- <v-progress-circular
        indeterminate
        size="100"
        color="primary"
        width="10"
      ></v-progress-circular> -->
    </v-overlay>
    <v-snackbar
      v-model="snackbar_setting.show"
      color="success"
      class="mb-8"
    >
      <v-row align="center">
        <v-col cols="auto" class="pr-0">
          <v-icon small>mdi-check-circle</v-icon>
        </v-col>
        <v-col cols="auto">
          <p class="mb-0">{{ snackbar_setting.message }}</p>
        </v-col>
      </v-row>
      <template v-slot:action="{ attrs }">
        <v-btn
          icon 
          color="white"
          v-bind="attrs"
          @click="snackbar_setting.show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <confirm ref="confirm"></confirm>
  </v-container>
</template>

<script>
import constants from '@/constants.js'
import StoryKokoroEdit from "@/components/StoryKokoroEdit.vue"
import MonsterIcon from "@/components/MonsterIcon.vue"
import Confirm from '../components/Confirm.vue'
// import { VueLoading } from 'vue-loading-template'

export default {
  name: 'Home',

  components: {
    StoryKokoroEdit,
    MonsterIcon,
    Confirm,
    // VueLoading
  },

  data() {
    return {
      loading: false,
      snackbar_setting: {
        show: false,
        message: '',
      },
      headers: [
        { text: "", value: "story", sortable: false, width: 50 },
        { text: "めったに", value: "rare5", sortable: false, width: 60, class: 'pa-1' },
        { text: "あまり", value: "rare4", sortable: false, width: 90, class: 'pl-1' },
        { text: "メタル", value: "rare6", sortable: false, width: 90, class: 'pl-1' },
        { text: "ときどき", value: "rare3", sortable: false, width: 130, class: 'pl-1' },
        { text: "よく", value: "rare2", sortable: false, width: 160, class: 'pl-1' },
        { text: "とてもよく", value: "rare1", sortable: false, width: 340, class: 'pl-1' },
      ],
      datas: [],
      monsters: [],
      users: constants.users,
      selected_user: null,
      setting: {
        user: null,
        default_user: null,
        prefecture: null,
        sort_asc: false,
      },
    }
  },

  methods: {
    // localStorageに保存
    save_setting() {
      this.$store.dispatch({
        type: 'save_setting',
        setting: JSON.parse(JSON.stringify(this.setting)) // shallowコピーを防ぐため（このプロジェクトでは意味がないが）
      })
    },
    // プレイ中のストーリー選択（ローディング処理あり）
    async set_select_story(row) {
      if (this.setting.user == 1) return

      const update_process = () => {
        this.loading = true
        setTimeout(() => {
          let cur_story = null
          switch (this.setting.user) {
            case "2":
              cur_story = this.datas.find(e => e.story_aheshiyu == 'x')
              cur_story.story_aheshiyu = ''
              row.story_aheshiyu = 'x'
              break
            case "3":
              cur_story = this.datas.find(e => e.story_mikyan == 'x')
              cur_story.story_mikyan = ''
              row.story_mikyan = 'x'
              break
            default:
              break
          }
          const story = row.story.split(' ')[0]
          this.$gas.update_active_story(this.setting.user, story)      
          let message = ''
          if (cur_story.story.split(' ')[0] != story) {
            message = 'プレイ中を「' + story + '」に設定しました。'
          } else {
            message = 'プレイ中のストーリーを解除しました。'
          }
          this.loading = false
          this.set_snackbar(true, message)
        }, 25);
      }

      if (this.setting.user != this.setting.default_user) {
        const user = constants.users.find(u => u.id == this.setting.user)
        if (await this.$refs.confirm.confirm('本当に更新しますか？', `${user.name}のプレイ中ストーリーを更新します。`)) {
          update_process()
        }
      } else {
        update_process()
      }
    },
    // ユーザ選択処理（ローディングを挟むための処理）
    set_select(event) {
      this.loading = true
      setTimeout(() => {
        this.setting.user = event
        this.save_setting()
        this.loading = false
      }, 25);
    },
    // データ反転処理（ローディングを挟むために冗長になっている）
    reverse_datas() {
      this.loading = true
      setTimeout(() => {
        this.setting.sort_asc = !this.setting.sort_asc
        this.datas = this.datas.reverse()
        this.save_setting()
        this.loading = false
      }, 25);   // 25ミリ秒後に実行する（this.loading = trueを先に実行させるため）
    },
    // スナックバー設定
    set_snackbar(flag, message='') {
      this.snackbar_setting.show = flag
      this.snackbar_setting.message = message
    },
    // モンスターID検索処理
    get_monster(id) {
      return this.monsters.find(e => e.monster_id == id)
    },

    // 未使用関数（$setが処理を重くしているため，結局shallowコピーで編集した方が速いという）
    set_monster(monster) {
      const index = this.monsters.findIndex(e => e.monster_id == monster.monster_id)
      this.$set(this.monsters, index, JSON.parse(JSON.stringify(monster)))
    },

    // こころの数編集ページを開くための関数
    open_detail(monster_id) {
      let monster = this.get_monster(monster_id)
      switch (this.setting.user) {
        case "1":
          break
        case "2":
          monster.num_s = monster.s_aheshiyu
          monster.num_a = monster.a_aheshiyu
          monster.num_b = monster.b_aheshiyu
          this.$refs.kokoroDetail.open(monster)
          break
        case "3":
          monster.num_s = monster.s_mikyan
          monster.num_a = monster.a_mikyan
          monster.num_b = monster.b_mikyan
          this.$refs.kokoroDetail.open(monster)
          break
        default:
          break
      }
    },

    // データ更新（色々なチェックは編集コンポーネントで）
    async update(monster) {
      switch (this.setting.user) {
        case "1":
          break
        case "2":
          monster.s_aheshiyu = monster.num_s
          monster.a_aheshiyu = monster.num_a
          monster.b_aheshiyu = monster.num_b
          break
        case "3":
          monster.s_mikyan = monster.num_s
          monster.a_mikyan = monster.num_a
          monster.b_mikyan = monster.num_b
          break
        default:
          break
      }
      await this.$gas.update_story(this.setting.user, monster)  // ユーザIDは文字列の状態で送信（GAS内の処理のため）
    },
  },

  async mounted() {
    this.loading = true

    this.setting = { ...this.$store.state.setting }
    if (!this.setting.user) {
      this.setting.user = '1'
    }
    // 選択したユーザIDを格納する処理をsetTimeout内で実行したいために分けている（set_select参照）
    this.selected_user = this.setting.user

    const res_story = await this.$gas.get_story()
    const res_monster = await this.$gas.get_monster()
    if (res_story && res_monster) {

      // ストーリーデータの格納と並び替え適用有無
      this.datas = res_story
      if (!this.setting.sort_asc) {
        this.datas = this.datas.reverse()
      }

      // ご当地モンスター列の追加
      if (this.setting.prefecture >= 1 && this.setting.prefecture <= 47) {
        // ご当地モンスターが2列になるかどうか
        let is2col = false
        const index = this.setting.prefecture - 1   // 添え字を分けないとsome内で動作しなかった
        this.datas.some(function(row) {
          is2col = row.region[index].length >= 2
          if (is2col) return true // break
        })
        // 列追加
        this.headers.splice(5, 0, { // 2番目の変数: 置き換える要素の数．今回は追加のためゼロ
          text: 'ご当地 (' + constants.prefectures[this.setting.prefecture - 1].name + ')',
          value: 'region',
          sortable: false,
          width: is2col ? 90 : 60,  // モンスター数に応じたカラムサイズ
          class: 'pa-1'
        })
      }

      // 全てのモンスター情報
      this.monsters = res_monster
      this.monsters.map(monster => {
        try {
          monster.image_path = require('@/assets/' + monster.name + '.png')
        } catch (e) {
          monster.image_path = require('@/assets/no_img.png')
        }      
      })
      console.log("data loaded!")
    }

    this.loading = false
  },
  beforeCreate() {
    this.$store.dispatch('load_setting')
  }
}
</script>

<style lang="sass">
.fixed-column-table th:nth-child(1)
  position: sticky !important
  position: -webkit-sticky !important
  left: 0
  z-index: 4 !important
  background: white
  border-right: 1px gray solid
.fixed-column-table tr > td:nth-child(1)
  position: sticky !important
  position: -webkit-sticky !important
  left: 0
  z-index: 3 !important
  background: white
  border-right: 1px gray solid
.fixed-column-table tr > td
  white-space: nowrap
  max-width: 200px
  overflow: hidden
  text-overflow: ellipsis
</style>

<style>
/* ヘッダの一番左の枠 */
.header_left {
  position: sticky !important;
  top: 0;   /* 表の上からどれだけズラすか（指定なしの場合上下方向に固定されない） */
  left: 0;  /* 表の左からどれだけズラすか（指定なしの場合左右方向に固定されない） */
  z-index: 4 !important;  /* 変更するときは注意（ローディングバーが隠れる恐れ） */
  background: white;
  border-right: 1px grey solid;
  border-bottom: 1px grey solid;
}
/* それ以外のヘッダ */
.header_other {
  position: sticky !important;
  top: 0;
  z-index: 3 !important;
  background: white;
  vertical-align: middle;
  border-bottom: 1px grey solid;
}
/* これをオン・オフする */
.arrow_down {
  transform: rotate(180deg);
  transition-delay: 3s;
}
.selected_row {
  background-color: #E3F2FD !important;
}
</style>