const merge = require("webpack-merge");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

const commonConfig = merge([
  {
    entry: "./index.js",
    target: "node",
    devtool: "source-map",
  },
]);

const productionConfig = merge([
  {
    output: {
      filename: "webtorrent.min.js",
      path: path.resolve(__dirname, "bin"),
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({ sourceMap: true })],
    },
  },
]);

const developmentConfig = merge([
  {
    output: {
      filename: "webtorrent.debug.js",
      path: path.resolve(__dirname, "bin"),
    },
    // devServer: {
    //   stats: "errors-only",
    //   host, // Defaults to `localhost`
    //   port, // Defaults to 8080
    //   open: true,
    //   overlay: true,
    // },
  },
]);

module.exports = (mode) => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
