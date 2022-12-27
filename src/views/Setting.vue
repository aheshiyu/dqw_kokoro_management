<template>
  <v-container>
    <p>※設定はこのデバイスのみに保存されます。</p>
    <v-form
      v-model="valid"
    >
      <h3>アプリ設定</h3>
      <v-text-field
        label="API URL"
        v-model="setting.api_url"
        color="light-blue darken-1"
        :rules="[required_input]"
      ></v-text-field>
      <v-select
        v-model="setting.default_user"
        :items="users"
        item-text="name"
        item-value="id"
        menu-props="auto"
        label="デフォルトユーザ"
        no-data-text="データがありません。"
        :rules="[required_select]"
      ></v-select>
      <v-select
        v-model="setting.prefecture"
        :items="prefectures"
        item-text="name"
        item-value="id"
        menu-props="auto"
        label="ご当地モンスター表示地域"
        no-data-text="データがありません。"
        :rules="[required_select]"
      ></v-select>
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
      <li>対象のスプレッドシートを開きます。</li>
      <li>上のリボンより「拡張機能」を選択します。</li>
      <li>「Apps Script」を選択します。</li>
      <li>別タブにスクリプトが起動しますので、右上の「デプロイ」を選択します。</li>
      <li>「デプロイを管理」を選択します。</li>
      <li>「ウェブアプリ」の項目にあるURLがAPI URLになります。</li>
    </ol>
    <p>※API URL保存後はページ更新が必要です。</p>
    <p class="mb-0 mt-3">【デフォルトユーザについて】</p>
    <ul>
      <li>基本的に編集するユーザを選択してください。</li>
    </ul>
    <p class="mb-0 mt-3">【ご当地モンスター表示地域について】</p>
    <ul>
      <li>一覧に表示させたいご当地モンスターの地域を選択してください。</li>
    </ul>
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
import constants from '@/constants.js'

export default {
  name: 'Setting',

  data() {
    return {
      setting: {
        api_url: '',
        user: null,
        default_user: null,
      },
      valid: false,
      users: [],
      prefectures: [],
      is_save: false,
      required_input: value => !!value || "必ず入力してください。",
      required_select: value => !!value || "必ず選択してください。",
    }
  },

  methods: {
    save() {
      this.is_save = true
      this.$store.dispatch({
        type: 'save_setting',
        setting: JSON.parse(JSON.stringify(this.setting)) // shallowコピーを防ぐため（このプロジェクトでは意味がないが）
      })
    }
  },

  mounted() {
    this.setting = { ...this.$store.state.setting }
    this.users = constants.users
    this.prefectures = constants.prefectures
  },

  beforeCreate() {
    this.$store.dispatch('load_setting')
  }
}
</script>