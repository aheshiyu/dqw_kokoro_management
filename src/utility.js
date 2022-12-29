export default {
  methods: {
    get_current_value(monster, by_default=false) {
      let value_s = 0
      let value_a = 0
      let value_b = 0
      if (by_default) {
        value_s = monster.num_s * 4 * 3
        value_a = monster.num_a * 3
        value_b = monster.num_b
      } else {
        value_s = monster.num_s * (monster.max_a + 1) * (monster.max_b + 1)
        value_a = monster.num_a * (monster.max_b + 1)
        value_b = monster.num_b
      }
      return value_s + value_a + value_b
    },
    get_max_value(monster, by_default=false) {
      if (by_default) {
        return 3 * 4 * 4
      } else {
        return (monster.max_b + 1) * (monster.max_a + 1) * monster.max_s
      }
    }
  }
}
