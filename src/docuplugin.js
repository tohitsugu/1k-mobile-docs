module.exports = function (context, options) {
  return {
    name: "custom-docusaurus-plugin",
    // eslint-disable-next-line
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          fallback: { crypto: require.resolve("crypto-browserify") },
        },
      };
    },
  };
};
