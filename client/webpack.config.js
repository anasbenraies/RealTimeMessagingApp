module.exports = {
  // Other webpack configuration options...
  resolve: {
    fallback: {
      //assert: require.resolve('assert/'),
      assert: false ,
      constants: require.resolve('constants-browserify'),
      buffer: false,
      crypto: false
    }
  }
};