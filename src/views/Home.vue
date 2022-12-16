<template>  
  <v-container>
    <v-col>
      <v-row class="justify-end">
        <v-radio-group v-model="setting.user" row>
          <v-radio label="すべて" value="1" @click="save_setting"></v-radio>
          <v-radio label="あへしゆ" value="2" @click="save_setting"></v-radio>
          <v-radio label="みきゃん" value="3" @click="save_setting"></v-radio>
        </v-radio-group>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="datas"
        :items-per-page="-1"
        height="75vh"
        fixed-header
        hide-default-footer
        mobile-breakpoint="100"
        :loading="loading"
        loading-text="読込中..."
        class="elevation-1 fixed-column-table"
      >

        <template v-slot:item.story="props">
          <td class="pl-0 pr-0 font-weight-medium">
            {{ props.item.story }}
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
            <v-col v-for="(id, key) in props.item.region" :key="key" class="pa-0" cols=auto>
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
    <story-kokoro-edit ref="kokoroDetail" @snackbar="set_snackbar" @update="update"></story-kokoro-edit>
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
import StoryKokoroEdit from "@/components/StoryKokoroEdit.vue"
import MonsterIcon from "@/components/MonsterIcon.vue"

export default {
  name: 'Home',

  components: {
    StoryKokoroEdit,
    MonsterIcon
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
        { text: "ご当地", value: "region", sortable: false, width: 90, class: 'pa-1' },
        { text: "よく", value: "rare2", sortable: false, width: 160, class: 'pl-1' },
        { text: "とてもよく", value: "rare1", sortable: false, width: 340, class: 'pl-1' },
      ],
      datas: [],
      monsters: [],
      setting: {
        user: 1,
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
    set_snackbar(flag) {
      this.snackbar = flag
    },
    get_monster(id) {
      return this.monsters.find(e => e.monster_id == id)
    },
    // 未使用関数（参照元を変更してすべての画像を変更する作戦は遅くなる．なお不明）
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
      await this.$gas.update_story(this.setting.user, monster)  // ユーザIDは文字列の状態で送信（GAS内の処理のため）
    },
  },

  async mounted() {
    this.loading = true

    this.setting = { ...this.$store.state.setting }
    
    const res = await this.$gas.get_story()

    const raw_story = res.story
    const raw_monster = res.monster
    this.datas = raw_story.reverse()
    this.monsters = raw_monster

    console.log("data loaded!")

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
