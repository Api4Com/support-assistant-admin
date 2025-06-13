import js from "@eslint/js"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react": react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      quotes: ["error", "double", { avoidEscape: true }],
      "jsx-quotes": ["error", "prefer-double"],
      "react/jsx-curly-spacing": ["error", { when: "never", children: true }],
      "react/jsx-indent-props": [2, 4],
      "react/jsx-indent": ["error", 4],
      "react/jsx-max-props-per-line": ["error", { maximum: { single: 1, multi: 1 } }],
      "react/jsx-first-prop-new-line": ["error", "always"],
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          ignoreCase: true,
          multiline: 'last',
          noSortAlphabetically: false,
          reservedFirst: true,
          shorthandFirst: true,
          shorthandLast: false,
        },
      ],
      "react/jsx-tag-spacing": [
        "error",
        {
          afterOpening: "never",
          beforeClosing: "never",
          beforeSelfClosing: "always",
          closingSlash: "never",
        },
      ],
    },
  },
)
