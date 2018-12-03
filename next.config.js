const withSass = require("@zeit/next-sass");
const path = require("path");
// require("dotenv").config();
const Dotenv = require("dotenv-webpack");

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    camelCase: true,
    localIdentName: "[folder]__[local]_[hash:base64:5]"
  },
  webpack: config => {
    config.plugins.push(new Dotenv());
    // Fixes npm packages that depend on `fs` module
    (config.resolve = {
      alias: {
        Components: path.resolve(__dirname, "components/"),
        "@": path.resolve(__dirname, "")
      }
    }),
      config.module.rules.push({
        test: /\.scss$/,
        use: [
          // { loader: "sass-loader", options: { sourceMap: true } },
          {
            loader: "sass-resources-loader",
            options: {
              sourceMap: true,
              resources: "./styles/global.scss"
            }
          }
        ]
      });
    config.node = {
      fs: "empty"
    };

    return config;
  }
});
