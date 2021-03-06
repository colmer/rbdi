const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const path = require('path');
// require("dotenv").config();
const Dotenv = require('dotenv-webpack');

const nextConfig = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
  },
  webpack: config => {
    config.plugins.push(new Dotenv());

    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    // Aliases
    config.resolve = {
      alias: {
        Components: path.resolve(__dirname, 'components/'),
        '@': path.resolve(__dirname, ''),
      },
    };

    // Sass globals
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'sass-resources-loader',
          options: {
            resources: './styles/vars.scss',
          },
        },
      ],
    });

    return config;
  },
};

module.exports = withPlugins(
  [
    [withCSS],
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          camelCase: true,
          localIdentName: '[folder]__[local]_[hash:base64:5]',
        },
      },
    ],
  ],
  nextConfig,
);
