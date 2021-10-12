const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  optimizeFonts: false,
  webpack(config, options) {
    if (options.dev || options.isServer) return config;

    /* mess around here */

    return config;
  },
});
