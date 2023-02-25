module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  customSyntax: 'postcss-less',
  rules: {
    'import-notation': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'function-no-unknown': [true, { ignoreFunctions: ['data-uri'] }],
  },
};
