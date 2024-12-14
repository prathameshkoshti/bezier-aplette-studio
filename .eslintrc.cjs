module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@figma/figma-plugins/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
    'plugin:react/jsx-runtime',
    // Keeping this last in extends so that, it turn off all rules that conflict with Prettier
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['off'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/test/**',
          'vite.config.ts',
          '**/*{.,_}{test,spec}.{ts,tsx}', // tests where the extension or filename suffix denotes that it is a test
        ],
        optionalDependencies: false,
      },
    ],
    // https://eslint.org/docs/latest/rules/no-console
    // The below two rules will make sure we do not use console(log|warn|trace) anywhere in our code
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(error|info)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
    // Adding this, as we are going to give default value for prop directly while destructuring and not by using explicit defaultProps
    'react/require-default-props': 'off',
    // To allow this operator in editor hot keys
    'no-bitwise': ['error', { allow: ['|'] }],
    'react/jsx-props-no-spreading': [
      0,
      {
        html: 'ignore' | 'enforce',
        custom: 'ignore' | 'enforce',
        explicitSpread: 'ignore' | 'enforce',
      },
    ],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }],
  },
  overrides: [
    {
      files: ['./src/routes/*'],
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
  parserOptions: {
    project: ['./ui/tsconfig.json', './tsconfig.json'],
  },
};
