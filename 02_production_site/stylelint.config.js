module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['v-deep'],
    }],
    "at-rule-no-unknown": [true, {
      ignoreAtRules: ["include","mixin","each","extend"]
    }],
  }
}
