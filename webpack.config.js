const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin');


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}` 

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
            },
          },
         'css-loader'
    ]

    if (extra) {
        loaders.push(extra);
    }

    return loaders
}

const optimization = () => {
    const config = {
       splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
        new OptimizeCssAssetPlugin(),
        new TerserWebpackPlugin()
        ]
    }

    return config
}

const plugins = () => {

const base = [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
        template: "./proekt/htmls/index.html",
        filename: `./index.html`,
        chunks: ['main']
      }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'proekt/favicon.ico'), to: path.resolve(__dirname, 'dist/img') },
          {from: path.resolve(__dirname, 'proekt/img'), to: path.resolve(__dirname, 'dist/img')}
        ],
      }),
      new MiniCssExtractPlugin({
          filename: filename('css')
      }),
].concat(multipleHtmlPlugins)

if (isProd) {
    base.push(new BundleAnalyzerPlugin())
}

return base
}

let htmlPageNames = ['clubs'];

let multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
      template: `./proekt/htmls/${name}.html`, // relative path to the HTML files
      filename: `./${name}.html`, // output HTML files
      chunks: [`main`] // respective JS files
    })
  });


module.exports = {
    mode: 'development',
    entry: {
        main: ['@babel/polyfill','./proekt/index.js']
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js']  
    },
    optimization: optimization(),
    devtool: isProd ? false : 'source-map',
    devServer: {
        port: 1234,
        contentBase: path.join(__dirname, 'dist'),
        overlay: true,
        open: true,
        hot: true,
        inline:true,
    },
    plugins: plugins(),
    module: {
        rules :[
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            }, {
                test : /\.(png|jpg|svg|gif|jpeg)$/,
                use: ['file-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                  }
                }
            }, 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                  // eslint options (if necessary)
                },
              },
        ]
    }
}