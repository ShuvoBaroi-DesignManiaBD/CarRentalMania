// {
//   "env": {
//     "browser": true,
//     "es2021": true
//   },
//   "extends": [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "prettier"
//   ],
//   "parser": "@typescript-eslint/parser",
//   "parserOptions": {
//     "ecmaVersion": "latest",
//     "sourceType": "module"
//   },
//   "plugins": ["@typescript-eslint"],
//   "rules": {
//     "no-unused-vars": "error",
//     "no-unused-expressions": "error",
//     "prefer-const": "error",
//     "no-console": "warn",
//     "no-undef": "error"
//   },
//   "globals": {
//     "process": "readonly"
//   }
// }


import eslint from "@eslint/js"
import tseslint from "@typescript-eslint"

export default tseslint.config(
  eslint.configs.recommended, 
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
...globals.node,
      }
    }
  },
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "prefer-const" : "error",
      "no-console": "warn",
    }
  },
  {
    ignores: ["**/dist/", "**/node_modules/"]
  }
)