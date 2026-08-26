// webpack.config.cjs
module.exports = async (options, webpack) => {
  // Use a dynamic import() which Node.js allows inside CommonJS files
  const configModule = await import("./webpack.config.mjs")

  // Pass Webpack's options down to your actual ESM config function
  return configModule.default(options, webpack)
}
