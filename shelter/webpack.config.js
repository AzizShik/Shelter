const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/images/[name][ext]',
  },

  plugins: [
    new HtmlBundlerPlugin({
      // specify the entry points for HTML pages (or a template)
      entry: {
        index: 'src/index.html', // save generated HTML into dist/index.html
      },
      js: {
        filename: 'js/[name].js', // JS output filename
      },
      css: {
        filename: 'css/[name].css', // CSS output filename
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jp?g)/,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/icons/[name].svg',
        },
      },
    ],
  },

  devServer: {
    open: true,
    port: 8080,
    static: path.resolve(__dirname, 'dist'),
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
};
