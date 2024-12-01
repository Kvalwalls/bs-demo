const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://e83tzp.natappfree.cc",
        changeOrigin: true,
        // ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
})
