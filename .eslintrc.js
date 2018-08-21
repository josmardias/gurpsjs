module.exports = {
  env: {
    es6: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  /*
    User experience rules (bug prevention) should be added as "error".
    Developer experience (code quality) rules should be added as "warn".
  */
  rules: {
    'no-unused-vars': ['warn'],
  },
}
