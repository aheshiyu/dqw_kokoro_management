<template>  
  <v-container>
    <v-col>
      <v-row class="justify-end">
        <v-radio-group v-model="show_type" row>
          <v-radio label="すべて"  value="1"></v-radio>
          <v-radio label="あへしゆ" value="2"></v-radio>
          <v-radio label="みきゃん" value="3"></v-radio>
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
        class="elevation-1; fixed-column-table"
      >

        <!-- <template v-slot:header="{ props: { headers } }">
          <thead>
            <tr>
              <th v-for="(h, key) in headers" :key="key" class="pa-1" style="width: 600px">
                <span>{{h.text}}</span>
              </th>
            </tr>
          </thead>
        </template> -->

        <template v-slot:item.story="props">
          <td class="pl-0 pr-0 font-weight-medium">
            {{props.item.story}}
          </td>
        </template>

        <template v-slot:item.rare1="props">
          <Kokoro :monster_list="props.item.rare1" :show_type="show_type" class="pa-0"></Kokoro>
        </template>

        <template v-slot:item.rare2="props">
          <Kokoro :monster_list="props.item.rare2" :show_type="show_type" class="pa-0"></Kokoro>
        </template>

        <template v-slot:item.rare3="props">
          <Kokoro :monster_list="props.item.rare3" :show_type="show_type" class="pa-0"></Kokoro>
        </template>

        <template v-slot:item.rare4="props">
          <Kokoro :monster_list="props.item.rare4" :show_type="show_type" class="pa-0"></Kokoro>
        </template>

        <template v-slot:item.rare5="props">
          <Kokoro :monster_list="props.item.rare5" :show_type="show_type" class="pa-0"></Kokoro>
        </template>

        <template v-slot:item.rare6="props">
          <Kokoro :monster_list="props.item.rare6" :show_type="show_type" class="pa-0"></Kokoro>
        </template>

        <template v-slot:item.region="props">
          <Kokoro :monster_list="props.item.region" :show_type="show_type" class="pa-0"></Kokoro>
        </template>

      </v-data-table>
    </v-col>
  </v-container>
</template>

<script>
import Kokoro from "../components/Kokoro.vue"

export default {
  name: 'Home',

  components: {
    Kokoro
  },

  data() {
    return {
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
      show_type: "1",
    }
  },

  methods: {

  },

  async mounted() {
    const res = await this.$axios.fetch()
    const raw_story = res.data.story
    const raw_monster = res.data.monster

    const num2monster = (n) => {
        if (n == '') return
        let monster = raw_monster.find(m => n == m.monster_id)
        monster.image_path = require("../assets/" + monster.name + ".png")
        monster.ratio_aheshiyu = monster.s_aheshiyu / 4 * 100
        monster.ratio_mikyan = monster.s_mikyan / 4 * 100
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
    // console.log(this.datas)
    console.log("data loaded")
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
