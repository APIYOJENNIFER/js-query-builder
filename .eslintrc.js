module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: "always",
        ObjectPattern: {
          multiline: true,
        },
        ImportDeclaration: "never",
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],
    "array-callback-return": [
      "error",
      {
        allowImplicit: false,
        checkForEach: true,
      },
    ],
    "no-constructor-return": "error",
    "no-duplicate-imports": [
      "error",
      {
        includeExports: true,
      },
    ],
    "no-promise-executor-return": "error",
    "no-self-compare": ["error"],
    "no-template-curly-in-string": "error",
    "no-undef": [
      "error",
      {
        typeof: true,
      },
    ],
    "no-unexpected-multiline": "error",
    "no-unmodified-loop-condition": "error",
    "no-unreacheable-loop": "error",
    "no-unsafe-negation": [
      "error",
      {
        enforceForOrderingRelations: true,
      },
    ],
    "no-unused-private-class-members": "error",
    "no-use-before-define": [
      "error",
      {
        functions: true,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ],
    "accessor-pairs": "error",
    "arrow-body-style": ["error", "always"],
    "block-scoped-var": "error",
    "class-methods-use-this": "error",
    curly: "error",
    "default-case": "error",
    "default-case-last": "error",
    "default-param-last": "error",
    "dot-notation": "error",
    eqeqeq: ["error", "smart"],
    "func-names": "error",
    "func-style": ["error", "declaration"],
    "grouped-accessor-pairs": ["error", "setBeforeGet"],
    "id-length": [
      "error",
      {
        min: 3,
        exceptions: ["id"],
      },
    ],
    "new-cap": [
      "error",
      {
        capIsNew: true,
      },
    ],
    "no-div-regex": "error",
    "no-else-return": [
      "error",
      {
        allowElseIf: false,
      },
    ],
    "no-empty-function": "error",
    "no-extra-boolean-cast": [
      "error",
      {
        enforceForLogicalOperands: true,
      },
    ],
    "no-extra-semi": "error",
    "no-floating-decimal": "error",
    "no-implicit-coercion": [
      "error",
      {
        disallowTemplateShorthand: false,
      },
    ],
    "no-inline-comments": "error",
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-loop-func": "error",
    "no-multi-assign": [
      "error",
      {
        ignoreNonDeclaration: true,
      },
    ],
    "no-multi-str": "error",
    "no-negated-condition": "error",
    "no-nested-ternary": "error",
    "no-unneeded-ternary": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-wrappers": "error",
    "no-param-reassign": [
      "error",
      {
        props: false,
      },
    ],
    "no-return-assign": ["error", "always"],
    "no-underscore-dangle": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-return": "error",
    "prefer-const": [
      "error",
      {
        destructuring: "all",
        ignoreReadBeforeAssign: true,
      },
    ],
    "prefer-template": "error",
    yoda: [
      "error",
      "never",
      {
        exceptRange: true,
        onlyEquality: true,
      },
    ],
  },
};
