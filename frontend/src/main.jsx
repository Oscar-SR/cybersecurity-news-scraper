import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./i18n";
import Home from "./pages/Home/Home";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
