/// <reference types="vite/client" />

// Añade esto para que TS entienda los SCSS
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

// O la versión corta y vaga (también funciona):
// declare module '*.scss';