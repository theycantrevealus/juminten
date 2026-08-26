import path from "path"
import { fileURLToPath } from "url"
import nodeExternals from "webpack-node-externals"
import { RunScriptWebpackPlugin } from "run-script-webpack-plugin"

// ESM equivalents for __dirname and __filename
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default (options, webpack) => {
  const modeCheck = process.env.NODE_ENV
  const identifierModule = options.output.filename.split("/")

  const option = {
    ...options,
    entry: [options.entry],
    target: "node",
    optimization: {
      minimize: false,
    },
    node: {
      __dirname: false,
    },
    externals: [],
    module: {
      rules: [
        {
          test: /my_client\/.*\.js$/,
          use: "imports-loader?define=>false",
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["css-loader"],
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: "url-loader",
              options: {
                mimetype: "image/png",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname), "node_modules"],
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
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [...options.plugins],
    output: {
      path: path.join(__dirname, "dist"),
      filename: `${identifierModule[1]}.server.js`,
    },
  }

  const modes = ["prod", "preprod"]

  if (modes.indexOf(modeCheck) < 0) {
    if (parseInt(process.env.NODE_BUILD_MODE) === 1) {
      option.externals.push(nodeExternals())
    } else {
      option.entry.push("webpack/hot/poll?100")

      option.externals.push(
        nodeExternals({
          allowlist: ["webpack/hot/poll?100"],
        }),
      )

      option.plugins.push(new webpack.HotModuleReplacementPlugin())
      option.plugins.push(
        new webpack.WatchIgnorePlugin({
          paths: [/\.js$/, /\.d\.ts$/],
        }),
      )
      option.plugins.push(
        new RunScriptWebpackPlugin({
          name: `${identifierModule[1]}.server.js`,
          autoRestart: false,
        }),
      )
    }
  } else {
    option.externals.push(nodeExternals())
  }

  return option
}

// Webpack ESM Hot Module Replacement check
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
