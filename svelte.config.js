const autoPreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: autoPreprocess({
    scss: {
      prependData: '@import "./src/scss/main.scss";'
    }
  })
};