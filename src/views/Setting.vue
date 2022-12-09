<template>
  <v-container>
    <p>※設定はこのデバイスのみに保存されます。</p>
    <v-form
      v-model="valid"
    >
      <h3>アプリ設定</h3>
      <v-text-field
        label="API URL"
        v-model="api_url"
        color="light-blue darken-1"
        :rules="[required]"
      ></v-text-field>
      <v-row justify="end" class="pt-4">
        <v-col cols=auto>
          <v-btn
            color="blue"
            :disabled="!valid"
            @click="save"
          >
            <p class="mb-0 white--text">保存</p>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <p class="mb-0 mt-3">【API URLの場所】</p>
    <ol>
      <li>対象のスプレッドシートを開く</li>
      <li>上のリボンより「拡張機能」を選択</li>
      <li>Apps Scriptを選択</li>
      <li>別タブにスクリプトが起動するので右上の「デプロイ」を選択</li>
      <li>「デプロイを管理」を選択</li>
      <li>「ウェブアプリ」の項目にあるURLがAPI URL</li>
    </ol>
    <p>※API URL設定後はページ更新が必要</p>
    <v-snackbar
      v-model="is_save"
      color="success"
      class="mb-5"
    >
      <v-row align="center">
        <v-col cols="auto" class="pr-0">
          <v-icon small>mdi-check-circle</v-icon>
        </v-col>
        <v-col cols="auto">
          <p class="mb-0">保存しました。</p>
        </v-col>
      </v-row>
      <template v-slot:action="{ attrs }">
        <v-btn
          icon 
          color="white"
          v-bind="attrs"
          @click="is_save = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'Setting',

  data() {
    return {
      valid: false,
      api_url: '',
      is_save: false,
      required: value => !!value || "必ず入力してください",
    }
  },

  methods: {
    save() {
      this.is_save = true
      localStorage.setItem('dqw_monster_view_api_url', this.api_url)
    }
  },

  mounted() {
    this.api_url = localStorage.getItem('dqw_monster_view_api_url')
  }
}
</script>