const path = require("path");

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
            "buffer": false,
          crypto: require.resolve('crypto-browserify')
        }
      }
    }
  }
};
