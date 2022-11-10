<template>
  <v-dialog
    v-model="show_confirm"
    persistent
    max-width="380"
  >
    <v-card>
      <v-card-title class="text-h6 text-weight-black">
        本当にキャンセルしますか？
      </v-card-title>
      <v-card-text>こころの数が変更されています。</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="show_confirm=false"
        >
          いいえ
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="cancel_yes"
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
      show_confirm: false,
    }
  },

  methods: {
    confirm() {
      this.show_confirm = true
    },
    cancel_yes() {
      this.$emit('parentMethod', false)
      this.show_confirm = false
    }
  }
}
</script>
