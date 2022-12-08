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
          <Row :monster_list="props.item.rare1" :user="setting.user" @parent_snackbar="set_snackbar" class="pa-0"></Row>
        </template>

        <template v-slot:item.rare2="props">
          <Row :monster_list="props.item.rare2" :user="setting.user" @parent_snackbar="set_snackbar" class="pa-0"></Row>
        </template>

        <template v-slot:item.rare3="props">
          <Row :monster_list="props.item.rare3" :user="setting.user" @parent_snackbar="set_snackbar" class="pa-0"></Row>
        </template>

        <template v-slot:item.rare4="props">
          <Row :monster_list="props.item.rare4" :user="setting.user" @parent_snackbar="set_snackbar" class="pa-0"></Row>
        </template>

        <template v-slot:item.rare5="props">
          <Row :monster_list="props.item.rare5" :user="setting.user" @parent_snackbar="set_snackbar" class="pa-0"></Row>
        </template>

        <template v-slot:item.rare6="props">
          <Row :monster_list="props.item.rare6" :user="setting.user" @parent_snackbar="set_snackbar" class="pa-0"></Row>
        </template>

        <template v-slot:item.region="props">
          <Row :monster_list="props.item.region" :user="setting.user" @parent_snackbar="set_snackbar" class="pa-0"></Row>
        </template>

      </v-data-table>
    </v-col>
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
import Row from "@/components/Row.vue"

export default {
  name: 'Home',

  components: {
    Row
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
        user: null,
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
    }
  },

  async mounted() {
    this.loading = true

    this.setting = { ...this.$store.state.setting }
    
    const res = await this.$gas.get_story()

    const raw_story = res.story
    const raw_monster = res.monster
    const num2monster = (n) => {
        if (n == '') return
        let monster = raw_monster.find(m => n == m.monster_id)
        try {
          monster.image_path = require("@/assets/" + monster.name + ".png")
        } catch(e) {
          monster.image_path = require("@/assets/no_img.png")
        }
        // monster.image_path = "/img/" + monster.name + ".png"
        return monster
    }
    raw_story.map(e => {
      e.rare1 = e.rare1.split(',').map(n => num2monster(n))
      e.rare2 = e.rare2.split(',').map(n => num2monster(n))
      e.rare3 = e.rare3.split(',').map(n => num2monster(n))
      e.rare4 = e.rare4.split(',').map(n => num2monster(n))
      e.rare5 = e.rare5.split(',').map(n => num2monster(n))
      e.rare6 = e.rare6.split(',').map(n => num2monster(n))
      e.region = e.region.split(',').map(n => num2monster(n))
    })
    this.datas = raw_story.reverse()
    this.monsters = raw_monster

    // console.log(this.datas)
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
