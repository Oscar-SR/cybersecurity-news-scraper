import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default tseslint.config(
  // 1. Ignorar carpetas
  { ignores: ['dist'] },

  // 2. CONFIGURACIONES BASE (Aquí estaba el error)
  // En lugar de "extends: [...]", simplemente pasamos los objetos como argumentos separados.
  js.configs.recommended,
  ...tseslint.configs.recommended, // Expandimos las configs recomendadas de TS

  // 3. Tu configuración específica
  {
    files: ['**/*.{ts,tsx}'],
    
    languageOptions: {
      globals: globals.browser,
    },
    
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // Reglas de React Hooks
      ...reactHooks.configs.recommended.rules,
      
      // Reglas de React
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // Reglas de React Refresh (Vite)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Tus reglas personalizadas
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/prop-types': 'off',
    },
  }
);