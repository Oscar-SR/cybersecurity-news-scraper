import { useEffect, useState } from "react";

// 1. 👇 Aquí definimos el Tipo Maestro.
export type Theme = 'light' | 'dark';

export function useTheme() {
  // Tipamos el retorno de esta función auxiliar
  const getInitialTheme = (): Theme => {
    // Obtenemos del localStorage (puede ser string o null)
    const storedTheme = localStorage.getItem("theme");
    
    // Verificamos si es un valor válido para nuestro tipo
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    // Si no hay nada guardado (o es inválido), miramos la preferencia del sistema
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // 2. 👇 Usamos el Genérico <Theme> para el useState.
  // Esto es CLAVE. Ahora 'theme' es de tipo 'Theme', no 'string'.
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}