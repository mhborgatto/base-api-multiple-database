module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
        debug: false,
        corejs: 3
      }
    ]
  ]
}