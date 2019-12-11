var path = require('path');
 
module.exports = {
  entry: './src/index.ts',
  target: "node",
  output: {
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};


