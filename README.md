# Cybersecurity News Scraper

This project consists of an application that scrapes cybersecurity news from different open sources. It is composed of a frontend and a backend that communicate via REST API. The code structure of this project is modular, allowing new sources to be added and new functionalities to be integrated with minimal effort.

## Usage

### Development (Dev Container)

The recommended way to develop is using **VS Code Dev Containers**. The Dev Container provides a fully configured environment with Node.js, Playwright browsers, and all project dependencies — no local setup required.

#### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [VS Code](https://code.visualstudio.com/) with the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension

> **Windows users:** For the best experience (instant hot-reload, native `inotify`), clone the repository inside the **WSL2 filesystem** rather than the Windows host filesystem:
>
> ```bash
> # From a WSL2 terminal (e.g. Ubuntu)
> cd ~
> git clone https://github.com/Oscar-SR/cybersecurity-news-scraper.git
> code cybersecurity-news-scraper
> ```
>
> When the project lives in `/home/<user>/...` inside WSL2, Docker, the filesystem, and VS Code all share the same Linux kernel. Bind-mounts and `inotify` work natively, giving you instant hot-reload without polling or workarounds.

#### Getting started

1. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

2. Open the project in VS Code and run **Dev Containers: Reopen in Container** from the command palette (`Ctrl+Shift+P` / `F1`).

3. Once inside the container, start both dev servers:

   ```bash
   npm run dev
   ```

4. The application is available at `http://localhost:3001` through the Caddy reverse proxy.

Any file changes you make in VS Code are immediately detected:
- **Backend** (`packages/backend/src/`): `nodemon` restarts the Node.js process.
- **Frontend** (`packages/frontend/src/`): Vite applies Hot Module Replacement (HMR) in the browser.

#### SonarQube (optional)

A SonarQube service is available behind a Docker Compose profile. To start it alongside the Dev Container:

```bash
docker compose -f .devcontainer/docker-compose.yml --profile sonarqube up -d sonarqube
```

SonarQube will be available at `http://localhost:9000`.

### Production

#### Docker deployment

The CI/CD pipeline (GitHub Actions) builds and pushes production images to GitHub Container Registry on every push to `main`. Images are tagged with `latest` and the commit SHA.

To deploy:

```bash
npm run docker:deploy
```

To stop:

```bash
npm run docker:down
```

> Production requires `DOMAIN` and `EMAIL` in `.env` (Caddy uses them to obtain and auto-renew Let's Encrypt certificates).

To deploy manually on a VPS:

```bash
# SSH into the VPS, pull and deploy
docker compose pull
docker compose up -d
```

### Manual setup (without Docker)

#### Development

```bash
npm install
npx playwright install
npm run dev
```

#### Production

```bash
npm ci
npx playwright install
npm run build
npm start
```

## Configuration

The application can be configured using environment variables defined in the `.env` file:

| Variable     | Description                          | Used in     |
| ------------ | ------------------------------------ | ----------- |
| `PROXY_PORT` | Port exposed by the reverse proxy    | Development |
| `DOMAIN`     | Domain for HTTPS (Caddy)             | Production  |
| `EMAIL`      | Email for Let's Encrypt certificates | Production  |

In development, the application is available at `http://localhost:3001`.

## Gallery

List of scraped news:
![News list](images/news_list.png)

Keywords cloud of the scraped news:
![Keywords cloud](images/keywords_cloud.png)
