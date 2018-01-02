module.exports = {
  env: {
    es6: true,
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
    Code style rules shouldn't be added here, use prettier instead.
  */
  rules: {
    'no-unused-vars': ['warn'],
  },
}
