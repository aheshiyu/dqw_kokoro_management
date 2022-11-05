<template>  
  <v-container>
    <v-row class="justify-end">
      <v-col cols="auto" class="pb-0" >
        <v-switch 
          v-model="is_aheshiyu_show"
          inset
          label="あへしゆ"
          @click="is_mikyan_show=false"></v-switch>
      </v-col>
      <v-col cols="auto" class="pb-0">
        <v-switch 
          v-model="is_mikyan_show"
          inset
          label="みきゃん"
          @click="is_aheshiyu_show=false"></v-switch>
      </v-col>
    </v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="datas"
        :items-per-page="-1"
        height="80vh"
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
          <kokoro :monster_list="props.item.rare1" :is_aheshiyu_show="is_aheshiyu_show" :is_mikyan_show="is_mikyan_show" class="pa-0"></kokoro>
        </template>

        <template v-slot:item.rare2="props">
          <kokoro :monster_list="props.item.rare2" :is_aheshiyu_show="is_aheshiyu_show" :is_mikyan_show="is_mikyan_show" class="pa-0"></kokoro>
        </template>

        <template v-slot:item.rare3="props">
          <kokoro :monster_list="props.item.rare3" :is_aheshiyu_show="is_aheshiyu_show" :is_mikyan_show="is_mikyan_show" class="pa-0"></kokoro>
        </template>

        <template v-slot:item.rare4="props">
          <kokoro :monster_list="props.item.rare4" :is_aheshiyu_show="is_aheshiyu_show" :is_mikyan_show="is_mikyan_show" class="pa-0"></kokoro>
        </template>

        <template v-slot:item.rare5="props">
          <kokoro :monster_list="props.item.rare5" :is_aheshiyu_show="is_aheshiyu_show" :is_mikyan_show="is_mikyan_show" class="pa-0"></kokoro>
        </template>

        <template v-slot:item.rare6="props">
          <kokoro :monster_list="props.item.rare6" :is_aheshiyu_show="is_aheshiyu_show" :is_mikyan_show="is_mikyan_show" class="pa-0"></kokoro>
        </template>

        <template v-slot:item.region="props">
          <kokoro :monster_list="props.item.region" :is_aheshiyu_show="is_aheshiyu_show" :is_mikyan_show="is_mikyan_show" class="pa-0"></kokoro>
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
        { text: "あまり", value: "rare4", sortable: false, width: 80, class: 'pl-1' },
        { text: "メタル", value: "rare6", sortable: false, width: 80, class: 'pl-1' },
        { text: "ときどき", value: "rare3", sortable: false, width: 120, class: 'pl-1' },
        { text: "ご当地", value: "region", sortable: false, width: 50, class: 'pa-1' },
        { text: "よく", value: "rare2", sortable: false, width: 150, class: 'pl-1' },
        { text: "とてもよく", value: "rare1", sortable: false, width: 330, class: 'pl-1' },
      ],
      datas: [],
      is_aheshiyu_show: false,
      is_mikyan_show: false,
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
