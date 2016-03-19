/**
* Dependencies
*/
var webpack = require('webpack');
var path = require('path');

/**
* Entry points
*/
var entry = [
  {
    entry: './src/index.js',
    output: {
    path: path.join(__dirname, '/public/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  }
];
/**
* module
*/
module: {
  loaders: [
    {
      // "test" is commonly used to match the file extension
      test: /\.jsx$/,

      // "include" is commonly used to match the directories
      include: [
        path.resolve(__dirname, "./src"),
        path.resolve(__dirname, "./test")
      ],

      // "exclude" should be used to exclude exceptions
      // try to prefer "include" when possible

      // the "loader"
      loader: "babel-loader"
    }
  ]
}
