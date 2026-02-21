module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  customSyntax: 'postcss-less',
  rules: {
    'import-notation': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'at-rule-prelude-no-invalid': null,
    'media-query-no-invalid': null,
    'declaration-property-value-no-unknown': null,
    'color-function-alias-notation': null,
    'media-feature-range-notation': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'function-no-unknown': [true, { ignoreFunctions: ['data-uri'] }],
  },
};
