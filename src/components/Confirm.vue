<template>
  <v-dialog
    v-model="show_confirm"
    persistent
    max-width="380"
  >
    <v-card>
      <v-card-title class="text-h6 text-weight-black">
        {{ title }}
      </v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary lighten-1"
          text
          @click="$emit('answer', false)"
        >
          いいえ
        </v-btn>
        <v-btn
          color="primary lighten-2"
          text
          @click="$emit('answer', true)"
        >
          はい
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Confirm',

  data() {
    return {
      title: '',
      message: '',
      show_confirm: false,
    }
  },

  methods: {
    confirm(title, message) {
      this.title = title
      this.message = message
      this.show_confirm = true
      return new Promise(resolve => {
        this.$once('answer', confirm_value => {
          this.show_confirm = false
          resolve(confirm_value)
        })
      })
    },
  }
}
</script>
