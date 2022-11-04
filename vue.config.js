const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: isProd ? '/dqw_monster_view' : '/',
  outputDir: 'docs',
  filenameHashing: false,
  productionSourceMap: false,
  devServer: {
    port: 8888,
  }
}
