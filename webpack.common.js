const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/scripts/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets '@import' and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with postCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugin: () => [autoprefixer]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to css
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tugas.ku',
      template: './src/index.html',
      minify: true
    }),
    new CleanWebpackPlugin()
  ]
}
