const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/styles/_variables.scss";',
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        // Alias @ to /src folder for ES/TS imports
        "@": path.join(__dirname, "/src"),
      },
    },
  },
};
