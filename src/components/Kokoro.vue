<template>
  <v-container>
    <v-row>
      <v-col v-for="(monster, key) in monster_list" :key="key" class="pa-0" cols=auto>
        <div v-if="monster" :class="{ 'is_hidden': (is_aheshiyu_show && monster.s_aheshiyu >= 4) || (is_mikyan_show && monster.s_mikyan >= 4) }">
          <v-img
            max-height="35"
            max-width="35"
            :src="monster.image_path"
            :class="{ 'condition_night': monster.is_night, 'condition_rain': monster.is_rain }"
          ></v-img>
        </div>
        <!-- <div>{{monster.is_rain}}</div> -->
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: 'Kokoro',

  props: [
    'monster_list',
    'is_aheshiyu_show',
    'is_mikyan_show'
  ],

  data: () => ({

  }),
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
    opacity: 0.2;
  }
</style>
