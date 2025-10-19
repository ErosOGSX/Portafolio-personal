import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] }, 
  { languageOptions: { 
      parserOptions: { 
        ecmaFeatures: { jsx: true } 
      },
      globals: globals.browser 
    } 
  },


  pluginJs.configs.recommended,

 
  {
    ...pluginReactConfig, 
    settings: {
      react: {
        version: "detect" 
      }
    }
  },


  pluginReactJsxRuntime,


  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },
  

  {
    rules: {
      "no-unused-vars": "warn", 
    }
  }
];