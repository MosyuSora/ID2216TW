module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "/src/views": "./src/native-views", 
            "/src": "./src",
            "src":"./src"
          },
        },
      ],
    ],
  }
}
