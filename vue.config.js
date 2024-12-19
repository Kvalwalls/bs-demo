const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://wbcbs.mynatapp.cc",
        changeOrigin: true,
        // ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
})
