const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getRenderers } = require('./build/util/renderers.js');

/*
 * Get an array of Webpack configurations for app renderers.
 */
const rendererConfigs = getRenderers()
  .map((renderer) => {
    return {
      mode: 'development',
      entry: path.resolve(__dirname, 'src', 'renderer', renderer, 'index.js'),
      module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader',
            ],
          },
        ],
      },
      output: {
        path: path.resolve(__dirname, 'dist', 'renderers', renderer),
        filename: 'index.bundle.js',
      },
      target: 'electron-renderer',
      plugins: [
        new HtmlWebpackPlugin(),
      ],
      resolve: {
        alias: {
          'global-resources': path.resolve(__dirname, 'src', 'renderer', '_resources'),
          'local-resources': path.resolve(__dirname, 'src', 'renderer', renderer, '_resources'),
        }
      },
    };
  });

/*
 * Main process build config.
 */
const mainConfig = {
  mode: 'development',
  entry: './src/main/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },
  target: 'electron-main',
};

module.exports = [
  mainConfig,
  ...rendererConfigs,
];
