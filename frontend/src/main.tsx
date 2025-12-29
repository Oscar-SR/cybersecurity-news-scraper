import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./i18n";
import Home from "./pages/Home/Home";
import "./styles/globals.scss";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
