module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  customSyntax: 'postcss-less',
  rules: {
    'import-notation': null,
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'string-quotes': 'single',
    'function-no-unknown': [true, { ignoreFunctions: ['data-uri'] }],
  },
};
