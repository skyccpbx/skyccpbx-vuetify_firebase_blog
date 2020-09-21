module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["prettier"],

  parserOptions: {
    parser: "babel-eslint"
  },

  rules: {
    "no-console": "off",
    "no-debugger": "off"
  }
};
