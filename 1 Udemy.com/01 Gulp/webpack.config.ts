import path from "path";
import webpack from "webpack";
import "webpack-dev-server";

const config: webpack.Configuration = {
  entry: "./src/ts/index.tsx",
  module: {
    rules: [
      {
        // test: /\.(ts|js)?$/,
        // exclude: /node_modules/,
        // use: {
        //   loader: "babel-loader",
        //   options: {
        //     presets: ["@babel/preset-env", "@babel/preset-typescript"],
        //   },
        // },
        test: /\.(ts|js|tsx|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  // devServer: {
  //   static: path.join(__dirname, "dist"),
  //   compress: true,
  //   port: 4000,
  // },
  watch: true,
};
export default config;
