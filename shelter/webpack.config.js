const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/images/[name].[contenthash:8][ext]',
  },

  resolve: {
    alias: {
      '@scripts': path.join(__dirname, 'src/js'),
      '@styles': path.join(__dirname, 'src/scss'),
      '@images': path.join(__dirname, 'src/assets/images'),
      '@icons': path.join(__dirname, 'src/assets/icons'),
    },
  },

  devtool: 'inline-source-map',

  plugins: [
    new HtmlBundlerPlugin({
      // specify the entry points for HTML pages (or a template)
      entry: {
        index: {
          // output dist/index.html
          import: './src/views/pages/index.hbs',
          data: {
            logoHref: 'javascript:void(0)',
            aboutHref: 'javascript:void(0)',
            petsHref: './pages/pets.html',
            helpHref: '#help',
            aboutActive: 'header__link--active',
            petsActive: '',
            headerPets: '',
          },
        },
        pets: {
          import: './src/views/pages/pets.hbs',
          filename: 'pages/pets.html',
          data: {
            logoHref: '../index.html',
            aboutHref: '../index.html',
            petsHref: 'javascript:void(0)',
            helpHref: '../index.html#help',
            aboutActive: '',
            petsActive: 'header__link--active',
            headerPets: 'header--pets',
          },
        },
      },

      preprocessor: 'handlebars',
      // define handlebars options
      preprocessorOptions: {
        partials: ['src/views/partials'],
        helpers: {
          arraySize: (array) => array.length,
        },
      },

      js: {
        // JS output filename
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        // CSS output filename
        filename: 'css/[name].[contenthash:8].css',
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|webp|avif)/,
        type: 'asset/resource',
      },
      {
        test: /\.(svg|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/icons/[name].[contenthash:8][ext]',
        },
      },
      {
        test: /\.woff2?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash:8][ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: {
                quality: 90,
                compressionLevel: 2,
                effort: 4,
              },
              webp: {
                lossless: true,
              },
              avif: {
                lossless: true,
              },
              png: {
                quality: 90,
                compressionLevel: 2,
                effort: 4,
              },
            },
          },
        },

        generator: [
          {
            // You can apply generator using `?as=webp`, you can use any name and provide more options
            preset: 'webp',
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                webp: {
                  quality: 95,
                },
              },
            },
          },
          {
            // You can apply generator using `?as=avif`, you can use any name and provide more options
            preset: 'avif',
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                avif: {
                  quality: 90,
                },
              },
            },
          },
        ],
      }),
    ],
  },

  devServer: {
    open: true,
    port: 8080,

    historyApiFallback: false,
    static: path.resolve(__dirname, 'dist'),
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: false,
      },
    },
  },
};
