import { tanstackConfig } from "@tanstack/eslint-config";

export default [
  {
    ignores: ["eslint.config.js"]
  },
  ...tanstackConfig,
  {
    rules: {
      "import/order": ["off"],
      "sort-imports": ["off"]
    }
  }
];
