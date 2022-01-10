module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'max-len': 'off',
    'no-unused-vars': 'off',
    'valid-jsdoc': ['error', {
      'requireReturnType': false,
      'requireParamType': false,
      'requireReturn': false,
    }],
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
