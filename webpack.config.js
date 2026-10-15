const path = require("path")
const nodeExternals = require("webpack-node-externals")

module.exports = (options) => {
  return {
    ...options,

    target: "node",

    mode: process.env.NODE_ENV === "production" ? "production" : "development",

    devtool: "source-map",

    externals: [
      nodeExternals({
        allowlist: ["webpack/hot/poll?100"],
      }),
    ],

    optimization: {
      minimize: false,
    },

    resolve: {
      ...options.resolve,

      extensions: [".ts", ".tsx", ".js"],

      alias: {
        "@configuration": path.resolve(__dirname, "apps/configuration"),
        "@decorator": path.resolve(__dirname, "apps/decorator"),
        "@integration": path.resolve(__dirname, "apps/integration"),
        "@guard": path.resolve(__dirname, "apps/guard"),
        "@interceptor": path.resolve(__dirname, "apps/interceptor"),
        "@util": path.resolve(__dirname, "apps/util"),
        "@database": path.resolve(
          __dirname,
          "apps/libs/infrastructure/database",
        ),
        "@shared": path.resolve(__dirname, "apps/libs/shared"),
        "@module": path.resolve(__dirname, "apps/libs/module"),
        "@filter": path.resolve(__dirname, "apps/filter"),
      },
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },

        {
          test: /\.css$/,
          use: ["css-loader"],
        },

        {
          test: /\.png$/,
          type: "asset/resource",
        },
      ],
    },

    plugins: [...(options.plugins ?? [])],

    output: {
      ...options.output,
      clean: false,
    },
  }
}
