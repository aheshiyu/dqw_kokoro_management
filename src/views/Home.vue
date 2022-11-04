<template>  
  <v-col class="pa-0; height:100px">
    <v-data-table
      :headers="headers"
      :items="datas"
      :items-per-page="-1"
      height="85vh"
      fixed-header
      hide-default-footer
      mobile-breakpoint="100" 
      class="elevation-1; fixed-column-table"
    >

      <template v-slot:item.story="props">
        <td class="pl-0 pr-0">
          {{props.item.story}}
        </td>
      </template>

      <template v-slot:item.rare1="props">
        <td class="pl-1 pr-1">
          <v-container>
            <v-row>
              <v-col v-for="(monster, key) in props.item.rare1" :key="key" class="pa-0" cols=auto>
                <v-img
                  v-if="monster"
                  max-height="35"
                  max-width="35"
                  :src="monster.image_path"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </td>
      </template>

      <template v-slot:item.rare2="props">
        <td class="pl-1 pr-1">
          <v-container>
            <v-row>
              <v-col v-for="(monster, key) in props.item.rare2" :key="key" class="pa-0" cols=auto>
                <v-img
                  v-if="monster"
                  max-height="35"
                  max-width="35"
                  :src="monster.image_path"
                  class="mr-0"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </td>
      </template>

      <template v-slot:item.rare3="props">
        <td class="pl-1 pr-1">
          <v-container>
            <v-row>
              <v-col v-for="(monster, key) in props.item.rare3" :key="key" class="pa-0" cols=auto>
                <v-img
                  v-if="monster"
                  max-height="35"
                  max-width="35"
                  :src="monster.image_path"
                  class="mr-0"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </td>
      </template>

      <template v-slot:item.rare4="props">
        <td class="pl-1 pr-1">
          <v-container>
            <v-row>
              <v-col v-for="(monster, key) in props.item.rare4" :key="key" class="pa-0" cols=auto>
                <v-img
                  v-if="monster"
                  max-height="35"
                  max-width="35"
                  :src="monster.image_path"
                  class="mr-0"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </td>
      </template>

      <template v-slot:item.rare5="props">
        <td class="pl-1 pr-1">
          <v-container>
            <v-row>
              <v-col v-for="(monster, key) in props.item.rare5" :key="key" class="pa-0" cols=auto>
                <v-img
                  v-if="monster"
                  max-height="35"
                  max-width="35"
                  :src="monster.image_path"
                  class="mr-0"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </td>
      </template>

      <template v-slot:item.rare6="props">
        <td class="pl-1 pr-1">
          <v-container>
            <v-row>
              <v-col v-for="(monster, key) in props.item.rare6" :key="key" class="pa-0" cols=auto>
                <v-img
                  v-if="monster"
                  max-height="35"
                  max-width="35"
                  :src="monster.image_path"
                  class="mr-0"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </td>
      </template>

      <template v-slot:item.region="props">
        <td class="pl-1 pr-1">
          <v-container>
            <v-row>
              <v-col v-for="(monster, key) in props.item.region" :key="key" class="pa-0" cols=auto>
                <v-img
                  v-if="monster"
                  max-height="35"
                  max-width="35"
                  :src="monster.image_path"
                  class="mr-0"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </td>
      </template>

    </v-data-table>
  </v-col>
</template>

<script>
// import HelloWorld from "../components/HelloWorld"

export default {
  name: 'Home',

  components: {
    // HelloWorld
  },

  data() {
    return {
      headers: [
        { text: "", value: "story", sortable: false, width: 50 },
        { text: "めったに", value: "rare5", sortable: false, width: 60, class: 'pa-1' },
        { text: "あまり", value: "rare4", sortable: false, width: 80, class: 'pl-1' },
        { text: "メタル", value: "rare6", sortable: false, width: 80, class: 'pl-1' },
        { text: "ときどき", value: "rare3", sortable: false, width: 115, class: 'pl-1' },
        { text: "ご当地", value: "region", sortable: false, width: 60, class: 'pa-1' },
        { text: "よく", value: "rare2", sortable: false, width: 150, class: 'pl-1' },
        { text: "とても", value: "rare1", sortable: false, width: 330, class: 'pl-1' },
      ],
      datas: [],
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

<style>
  html {
    height: 100%
  }
</style>