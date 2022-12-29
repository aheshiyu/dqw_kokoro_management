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
                    @click="sort_datas(); save_setting()"
                  >
                    <v-icon :class="{ arrow_down: setting.sort_asc }">
                      mdi-arrow-up
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

        <template v-slot:item.story="props">
          <td class="px-1 font-weight-bold text-center">
            <!-- ストーリー話数 -->
            <span>
              {{ props.item.story.split(' ')[0] }}
            </span>
            <br/>
            <!-- 推奨レベル -->
            <span class="text-caption grey--text">
              {{ props.item.story.split(' ')[1] }}
            </span>
          </td>
        </template>

        <template v-slot:item.rare1="props">
          <v-row>
            <v-col v-for="(id, key) in props.item.rare1" :key="key" class="pa-0" cols=auto>
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
        </template>

        <template v-slot:item.rare2="props">
          <v-row>
            <v-col v-for="(id, key) in props.item.rare2" :key="key" class="pa-0" cols=auto>
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
        </template>

        <template v-slot:item.rare3="props">
          <v-row>
            <v-col v-for="(id, key) in props.item.rare3" :key="key" class="pa-0" cols=auto>
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
        </template>

        <template v-slot:item.rare4="props">
          <v-row>
            <v-col v-for="(id, key) in props.item.rare4" :key="key" class="pa-0" cols=auto>
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
        </template>

        <template v-slot:item.rare5="props">
          <v-row>
            <v-col v-for="(id, key) in props.item.rare5" :key="key" class="pa-0" cols=auto>
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
        </template>

        <template v-slot:item.rare6="props">
          <v-row>
            <v-col v-for="(id, key) in props.item.rare6" :key="key" class="pa-0" cols=auto>
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
        </template>

        <template v-slot:item.region="props">
          <v-row>
            <v-col v-for="(id, key) in props.item.region[setting.prefecture - 1]" :key="key" class="pa-0" cols=auto>
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
        </template>

      </v-data-table>
    </v-col>
    <story-kokoro-edit
      ref="kokoroDetail"
      @snackbar="set_snackbar"
      @update="update"
    ></story-kokoro-edit>
    <!-- v-showの方が画像が適切に表示される...？ -->
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
      <!-- <span class="text-h4 font-weight-black grey--text">Loading...</span> -->
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
      v-model="snackbar"
      color="success"
      class="mb-8"
    >
      <v-row align="center">
        <v-col cols="auto" class="pr-0">
          <v-icon small>mdi-check-circle</v-icon>
        </v-col>
        <v-col cols="auto">
          <p class="mb-0">更新しました。</p>
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
import constants from '@/constants.js'
import StoryKokoroEdit from "@/components/StoryKokoroEdit.vue"
import MonsterIcon from "@/components/MonsterIcon.vue"
// import { VueLoading } from 'vue-loading-template'

export default {
  name: 'Home',

  components: {
    StoryKokoroEdit,
    MonsterIcon,
    // VueLoading
  },

  data() {
    return {
      loading: false,
      snackbar: false,
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
    save_setting() {
      this.$store.dispatch({
        type: 'save_setting',
        setting: JSON.parse(JSON.stringify(this.setting)) // shallowコピーを防ぐため（このプロジェクトでは意味がないが）
      })
    },
    set_select(event) {
      this.loading = true
      setTimeout(() => {
        this.setting.user = event
        this.save_setting()
        this.loading = false
      }, 25);
    },
    async sort_datas() {
      this.loading = true
      setTimeout(() => {
        this.setting.sort_asc = !this.setting.sort_asc
        this.datas = this.datas.reverse()
        this.loading = false
      }, 25);   // 25ミリ秒後に実行する（this.loading = trueを先に実行させるため）
    },
    set_snackbar(flag) {
      this.snackbar = flag
    },
    get_monster(id) {
      return this.monsters.find(e => e.monster_id == id)
    },
    // 未使用関数（$setが処理を重くしているため，結局shallowコピーで編集した方が速いという）
    set_monster(monster) {
      const index = this.monsters.findIndex(e => e.monster_id == monster.monster_id)
      this.$set(this.monsters, index, JSON.parse(JSON.stringify(monster)))
    },
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
      // this.set_monster(monster)
      await this.$gas.update_story(this.setting.user, monster)  // ユーザIDは文字列の状態で送信（GAS内の処理のため）
    },
  },

  async mounted() {
    this.loading = true

    this.setting = { ...this.$store.state.setting }
    if (!this.setting.user) {
      this.setting.user = '1'
    }
    this.selected_user = this.setting.user
    
    if (this.setting.prefecture >= 1 && this.setting.prefecture <= 47) {
      this.headers.splice(5, 0, { // 2番目の変数: 置き換える要素の数．今回は追加のためゼロ
        text: 'ご当地 (' + constants.prefectures[this.setting.prefecture - 1].name + ')',
        value: 'region',
        sortable: false,
        width: 90,
        class: 'pa-1'
      })
    }

    const res = await this.$gas.get_story()
    if (res) {
      const raw_story = res.story
      const raw_monster = res.monster

      this.datas = raw_story
      if (!this.setting.sort_asc) {
        this.datas = this.datas.reverse()
      }

      this.monsters = raw_monster
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
</style>