# Cybersecurity News Scraper

This project consists of an application that scrapes cybersecurity news from different open sources. It is composed of a frontend and a backend that communicate via REST API. The code structure of this project is modular, allowing new sources to be added and new functionalities to be integrated with minimal effort.

## Usage

### Docker

Copy environment template:

```bash
cp .env.example .env
```

| Escenario                  | Comando                                                                   |
| -------------------------- | ------------------------------------------------------------------------- |
| Desarrollo                 | `docker compose -f compose.yml -f compose.dev.yml up --build`             |
| Producción (imágenes GHCR) | `IMAGE_TAG=<sha> docker compose -f compose.yml -f compose.prod.yml up -d` |

Para detener:

```bash
docker compose down
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
