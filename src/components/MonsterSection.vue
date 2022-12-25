<template>
  <v-container
    class="pa-0 pb-7"
  >
    <p class="text-caption mb-0 pl-3 grey lighten-3 rounded-xl">
      {{ section_title }}
    </p>
    <v-col
      v-for="(monster, key) in monsters"
      :key="key"
    >
      <v-card elevation="0">
        <v-row align="center" justify="space-between">
          <v-col cols=8 class="pb-0">
            <!-- モンスター詳細 -->
            <v-row>
              <v-col cols=auto>
                <v-icon v-if="monster.color=='rainbow'" x-small color="orange">mdi-looks</v-icon>
                <v-icon v-else x-small :color="monster.color">mdi-checkbox-blank-circle</v-icon>
                <span class="mb-0 text-caption pl-1">{{ monster.cost }}</span>
              </v-col>
            </v-row>
            <!-- モンスター名 -->
            <p class="mb-0">{{ monster.name }}</p>
            <!-- こころの所持状況 -->
            <div class="pt-1">
              <v-progress-linear
                :value="(get_current_value(monster) / get_max_value(monster)) * 100"
                color="blue darken-2"
                background-color="grey lighten-3"
                height="5"
              ></v-progress-linear>
            </div>
          </v-col>
          <!-- ボタン -->
          <v-col cols=auto class="pb-0">
            <v-row>
              <v-col cols=auto class="pr-0">
                <v-btn icon @click="$emit('edit', monster)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-col>
              <v-col cols=auto class="pl-0">
                <v-btn icon @click="$emit('delete', monster)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'MonsterSection',

  props: [
    'section_title',
    'monsters'
  ],

  data() {
    return {

    }
  },

  methods: {

  }
}
</script>
