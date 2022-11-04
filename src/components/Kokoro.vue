<template>
  <v-container>
    <v-row>
      <v-col v-for="(monster, key) in monster_list" :key="key" class="pa-0" cols=auto>
        <v-img
          v-if="monster"
          max-height="35"
          max-width="35"
          :src="monster.image_path"
          :class="{ 'condition_night': monster.is_night, 'condition_rain': monster.is_rain }"
        ></v-img>
        <!-- <div>{{monster.is_rain}}</div> -->
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: 'Kokoro',

  props: [
    'monster_list'
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
  }
</style>
