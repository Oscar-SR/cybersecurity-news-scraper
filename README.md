# Cybersecurity News Scraper

This project consists of an application that scrapes cybersecurity news from different open sources. It is composed of a frontend and a backend that communicate via REST API. The code structure of this project is modular, allowing new sources to be added and new functionalities to be integrated with minimal effort.

## Usage

### Docker

Copy environment template:

```bash
cp .env.example .env
```

#### Flujo de trabajo en desarrollo (con hot-reload)

El desarrollo con Docker se divide en **dos pasos**:

**Paso 1 — construir e iniciar los contenedores** (solo la primera vez, o cuando cambies el `Dockerfile` o las dependencias de `package.json`):

```bash
npm run docker:dev
```

**Paso 2 — activar el watch** (en una terminal separada, o después de que los contenedores estén corriendo):

```bash
npm run docker:watch
```

A partir de aquí, cualquier cambio que guardes en el código fuente se refleja automáticamente en la aplicación:

- **Backend** (`packages/backend/src/`): `nodemon` detecta el cambio y reinicia el proceso Node.js.
- **Frontend** (`packages/frontend/src/`, `index.html`): Vite aplica Hot Module Replacement (HMR) en el navegador sin recargar la página.
- **`package.json`** (backend o frontend): el contenedor se reinicia automáticamente para instalar las nuevas dependencias.

> **Cómo funciona:** `docker compose watch` observa los archivos en el host y los sincroniza directamente al interior del contenedor en ejecución. Al llegar al sistema de archivos Linux del contenedor, se generan eventos `inotify` nativos, que son los que nodemon y Vite usan para detectar cambios. No se requiere reconstruir la imagen ni reiniciar los contenedores manualmente.

| Escenario                  | Comando                |
| -------------------------- | ---------------------- |
| Primer arranque / rebuild  | `npm run docker:dev`   |
| Hot-reload en desarrollo   | `npm run docker:watch` |
| Producción (imágenes GHCR) | `npm run docker:deploy` |

Para detener:

```bash
npm run docker:down
```

### CI/CD

El pipeline de GitHub Actions construye y sube imágenes a GitHub Container Registry al pushear a `main`. Las imágenes se etiquetan con `latest` + el SHA del commit.

Para desplegar manualmente en producción:

```bash
# SSH al VPS, pull y deploy
docker compose -f compose.yml -f compose.prod.yml pull
docker compose -f compose.yml -f compose.prod.yml up -d
```

> Producción requiere `DOMAIN` y `EMAIL` en `.env` (Caddy los usa para obtener y renovar certificados de Let's Encrypt automáticamente).

### Manual setup

#### Development

To prepare the project for running, you must use the following commands in the root directory of the project:

```bash
npm install
npx playwright install
```

For running in **development** phase, use the following command:

```bash
npm run dev
```

#### Production

Install the dependencies with the following commands:

```bash
npm ci
npx playwright install
```

For **production**, you must first build the packages with this command:

```bash
npm run build
```

After that, you can run the application with the following command:

```bash
npm start
```

## Configuration

The application can be configured using environment variables defined in the `.env` file. It will be available at `http://localhost:3001`:

```
PROXY_PORT=3001
```

## Gallery

List of scraped news:
![News list](images/news_list.png)

Keywords cloud of the scraped news:
![Keywords cloud](images/keywords_cloud.png)
