// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    node: true,
    "jest/globals": true
  },
  extends: ["eslint:recommended", "prettier", "plugin:flowtype/recommended"],
  // required to lint *.vue files
  plugins: ["html", "flowtype", "jest"],
  // check if imports actually resolve
  settings: {
    "import/resolver": {
      webpack: {
        config: {
          resolve: {
            alias: {
              "@": __dirname,
              "~": __dirname
            }
          }
        }
      }
    }
  },
  // add your custom rules here
  rules: {
    // allow debugger during development
    camelcase: 0,
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "no-console": process.env.NODE_ENV === "production" ? 1 : 0
  }
};
