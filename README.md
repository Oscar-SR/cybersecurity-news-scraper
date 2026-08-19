# Cybersecurity News Scraper

This project consists of an application that scrapes cybersecurity news from different open sources. It is composed of a frontend and a backend that communicate via REST API. The code structure of this project is modular, allowing new sources to be added and new functionalities to be integrated with minimal effort.

## Usage

### Docker

Copy the environment template:

```bash
cp .env.example .env
```

#### Development workflow

Development with Docker is split into **two steps**:

**Step 1 — build and start the containers** (only the first time, or when you change a `Dockerfile` or `package.json` dependencies):

```bash
npm run docker:dev
```

**Step 2 — enable watch** (in a separate terminal, once the containers are running):

```bash
npm run docker:watch
```

From this point on, any change you save to the source code is automatically reflected in the application:

- **Backend** (`packages/backend/src/`): `nodemon` detects the change and restarts the Node.js process.
- **Frontend** (`packages/frontend/src/`, `index.html`): Vite applies Hot Module Replacement (HMR) in the browser without a full page reload.
- **`package.json`** (backend or frontend): the container is automatically rebuilt to install the new dependencies.

> **How it works:** `docker compose watch` monitors files on the host and syncs them directly into the running container. Once a file lands on the container's Linux filesystem, native `inotify` events are fired — the same events that nodemon and Vite rely on to detect changes. No image rebuilds or manual container restarts are needed.

| Scenario                     | Command                 |
| ---------------------------- | ----------------------- |
| First start / rebuild        | `npm run docker:dev`    |
| Hot-reload during development | `npm run docker:watch` |
| Production (GHCR images)     | `npm run docker:deploy` |

To stop:

```bash
npm run docker:down
```

> **💡 Tip — best development experience on Windows:** The `docker compose watch` workflow above works when editing files directly on the Windows host. If you develop through **VS Code Dev Containers**, file edits happen inside the container and `docker compose watch` is not triggered (this is a [known limitation](https://github.com/microsoft/vscode-remote-release/issues/9282) of the Dev Containers extension). The definitive solution — no polling, no workarounds — is to **move the project into the WSL2 filesystem**:
>
> ```bash
> # From a WSL2 terminal (e.g. Ubuntu)
> cd ~
> git clone https://github.com/Oscar-SR/cybersecurity-news-scraper.git
> code cybersecurity-news-scraper   # opens VS Code connected to WSL2
> ```
>
> When the project lives in `/home/<user>/...` inside WSL2 (not under `/mnt/c/...`), Docker, the filesystem and VS Code all run on the same Linux kernel. Bind-mounts and `inotify` work natively, giving you instant hot-reload in both Dev Containers and standard Docker workflows without any extra configuration.

### CI/CD

The GitHub Actions pipeline builds and pushes images to GitHub Container Registry on every push to `main`. Images are tagged with `latest` and the commit SHA.

To deploy manually to production:

```bash
# SSH into the VPS, pull and deploy
docker compose -f compose.yml -f compose.prod.yml pull
docker compose -f compose.yml -f compose.prod.yml up -d
```

> Production requires `DOMAIN` and `EMAIL` in `.env` (Caddy uses them to obtain and auto-renew Let's Encrypt certificates).

### Manual setup

#### Development

To prepare the project for running, use the following commands in the root directory of the project:

```bash
npm install
npx playwright install
```

For running in **development** mode:

```bash
npm run dev
```

#### Production

Install the dependencies:

```bash
npm ci
npx playwright install
```

Build the packages:

```bash
npm run build
```

Then start the application:

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
