// ESLint config for a Node.js JavaScript project
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      // Puedes agregar o modificar reglas aquí
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
    ignores: ["node_modules/**"],
  },
];
