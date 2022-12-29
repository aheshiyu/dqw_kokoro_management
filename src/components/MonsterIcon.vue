<template>
  <div
    :class="{ 'is_hidden': (user==2 && monster.s_aheshiyu>=4) || (user==3 && monster.s_mikyan>=4) }"
  >
    <img
      :src="monster.image_path"
      :alt="monster.name"
      :class="{ 'condition_night': monster.is_night, 'condition_rain': monster.is_rain }"
      width="35"
      height="35"
      style="vertical-align: middle"
    />
  </div>
</template>

<script>
export default {
  name: 'MonsterIcon',

  props: [
    'monster',
    'user'
  ],

  data() {
    return {

    }
  },

  methods: {

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
