<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(monster, key) in monster_list"
        :key="key"
        class="pa-0"
        cols=auto>
        <div
          v-if="monster"
          @click="onClickDetail(monster)"
          :class="{ 'is_hidden': (show_type == 2 && monster.s_aheshiyu >= 4) || (show_type == 3 && monster.s_mikyan >= 4) }">
          <v-img
            max-height="35"
            max-width="35"
            :src="monster.image_path"
            :class="{ 'condition_night': monster.is_night, 'condition_rain': monster.is_rain }"
          ></v-img>
        </div>
      </v-col>
    </v-row>
    <KokoroDetail ref="kokoroDetail" @child_snackbar="child_snackbar"></KokoroDetail>
  </v-container>
</template>

<script>
import KokoroDetail from "../components/KokoroDetail.vue"

export default {
  name: 'Kokoro',

  props: [
    'monster_list',
    'show_type'
  ],

  components: {
    KokoroDetail
  },

  data() {
    return {

    }
  },

  methods: {
    onClickDetail(monster) {
      switch (this.show_type) {
        case "1":
          break
        case "2":
          monster.num_s = monster.s_aheshiyu
          monster.num_a = monster.a_aheshiyu
          monster.num_b = monster.b_aheshiyu
          this.$refs.kokoroDetail.open(monster, Number(this.show_type))
          break
        case "3":
          monster.num_s = monster.s_mikyan
          monster.num_a = monster.a_mikyan
          monster.num_b = monster.b_mikyan
          this.$refs.kokoroDetail.open(monster, Number(this.show_type))
          break
        default:
          break
      }
    },
    child_snackbar(flag) {
      this.$emit('parent_snackbar', flag)
    }
  }
}
</script>

<style>
  .condition_night {
    background-color: darkblue;
  }
  .condition_rain {
    background-color: aqua;
    border: 1px solid #00F;
  }
  .is_hidden {
    opacity: 0.4;
  }
</style>
