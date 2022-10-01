const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module.rules.delete("svg");
    config.module
        .rule('svg-sprite')
        .use('svgo-loader')
        .loader('svgo-loader');
  },
  pluginOptions: {
        svgSprite: {
            /*
             * The directory containing your SVG files.
             */
            dir: 'src/assets/icons',
            /*
             * The regex that will be used for the Webpack rule.
             */
            test: /\.(svg)(\?.*)?$/,
            /*
             * @see https://github.com/kisenka/svg-sprite-loader#configuration
             */
            loaderOptions: {
                extract: true,
                spriteFilename: 'img/icons.svg' // or 'img/icons.svg' if filenameHashing == false
            },
            /*
             * @see https://github.com/kisenka/svg-sprite-loader#configuration
             */
            pluginOptions: {
                plainSprite: true
            }
        }
    },
  configureWebpack: {
    module: {
      rules: [
        // {
        //   test: /\.svg$/,
        //   use: [
        //     {
        //       loader: 'file-loader'
        //     },
        //     {
        //       loader: 'svgo-loader',
        //       options: {
        //         //configFile: './scripts/svgo.config.js'
        //       }
        //     }
        //   ]
        // }
        // {
        //   test: /\.svg$/,
        //   loader: 'vue-svg-loader',
        // },
        // {
        //   test: /\.svg$/,
        //   use: [{
        //       loader: 'svg-sprite-loader',
        //       options: {
        //         extract: true
        //       }
        //     },
        //     //'svgo-loader'
        //   ]
        // },
      ],
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/main.scss";
        `
      }
    }
  }
})
