export default {
  methods: {
    get_current_value(monster) {
      const value_s = monster.num_s * (monster.max_a + 1) * (monster.max_b + 1)
      const value_a = monster.num_a * (monster.max_b + 1)
      const value_b = monster.num_b
      return value_s + value_a + value_b
    },
    get_max_value(monster) {
      return (monster.max_b + 1) * (monster.max_a + 1) * monster.max_s
    }
  }
}
