module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    "jest/globals": true,
  },
  plugins: ["@typescript-eslint", "prettier", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "prefer-rest-params": 0,
    "@typescript-eslint/no-explicit-any": 0,
  },
};
