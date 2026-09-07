# Docker Multi-Environment Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor compose files and Dockerfiles to separate dev/prod environments, add CI/CD with GHCR.

**Architecture:** Three-file compose pattern (base + dev + prod), multi-stage Dockerfiles, GitHub Actions for build/push.

**Tech Stack:** Docker Compose v2, Docker multi-stage builds, GitHub Actions, GHCR.

---

**File Inventory:**

| Action  | File                               |
| ------- | ---------------------------------- |
| Rewrite | `compose.yml`                      |
| Modify  | `compose.dev.yml`                  |
| Create  | `compose.prod.yml`                 |
| Rewrite | `packages/backend/Dockerfile`      |
| Rewrite | `packages/frontend/Dockerfile`     |
| Delete  | `packages/backend/Dockerfile.dev`  |
| Delete  | `packages/frontend/Dockerfile.dev` |
| Modify  | `.devcontainer/devcontainer.json`  |
| Create  | `.github/workflows/build-push.yml` |
| Modify  | `README.md`                        |

---

### Task 1: Backend multi-stage Dockerfile

**Files:** Rewrite `packages/backend/Dockerfile`

- [ ] Write new Dockerfile:

```dockerfile
FROM mcr.microsoft.com/playwright:v1.57.0-noble AS runtime-base
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

FROM runtime-base AS development
WORKDIR /app
COPY package*.json ./
COPY packages/backend/package*.json ./packages/backend/
RUN npm install --workspace=packages/backend
WORKDIR /app/packages/backend
CMD ["npm", "run", "dev"]

FROM runtime-base AS build
WORKDIR /app
COPY package*.json ./
COPY packages/backend/package*.json ./packages/backend/
RUN npm ci --workspace=packages/backend
COPY packages/backend ./packages/backend
WORKDIR /app/packages/backend
RUN npm run build

FROM runtime-base AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/packages/backend/package*.json ./packages/backend/
RUN npm ci --workspace=packages/backend --omit=dev
COPY --from=build /app/packages/backend/dist ./packages/backend/dist
WORKDIR /app/packages/backend
EXPOSE 3000
CMD ["npm", "start"]
```

- [ ] Build dev target to verify: `docker build --target development --tag backend-test -f packages/backend/Dockerfile .`
- [ ] Build production target to verify: `docker build --target production --tag backend-prod-test -f packages/backend/Dockerfile .`

---

### Task 2: Frontend multi-stage Dockerfile

**Files:** Rewrite `packages/frontend/Dockerfile`

- [ ] Write new Dockerfile:

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/

FROM base AS development
RUN npm install --workspace=packages/frontend
WORKDIR /app/packages/frontend
CMD ["npm", "run", "dev", "--", "--host"]

FROM base AS build
RUN npm ci --workspace=packages/frontend
COPY packages/frontend ./packages/frontend
WORKDIR /app/packages/frontend
RUN npm run build

FROM nginx:alpine AS production
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/packages/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- [ ] Build dev target: `docker build --target development --tag frontend-dev-test -f packages/frontend/Dockerfile .`
- [ ] Build production target: `docker build --target production --tag frontend-prod-test -f packages/frontend/Dockerfile .`

---

### Task 3: Delete old Dockerfile.dev files

**Files:** Delete `packages/backend/Dockerfile.dev`, `packages/frontend/Dockerfile.dev`

- [ ] `Remove-Item packages/backend/Dockerfile.dev`
- [ ] `Remove-Item packages/frontend/Dockerfile.dev`

---

### Task 4: Rewrite compose.yml as pure base

**Files:** Rewrite `compose.yml`

- [ ] Write base compose:

```yaml
services:
    gateway:
        ports:
            - "${GATEWAY_PORT:-3001}:80"
        depends_on:
            backend:
                condition: service_healthy
            frontend:
                condition: service_started
        networks:
            - app-network

    backend:
        env_file:
            - .env
        healthcheck:
            test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
            interval: 30s
            timeout: 10s
            retries: 3
            start_period: 40s
        networks:
            - app-network

    frontend:
        networks:
            - app-network

networks:
    app-network:
        driver: bridge
```

---

### Task 5: Update compose.dev.yml

**Files:** Modify `compose.dev.yml`

- [ ] Update to use `target: development` on multi-stage Dockerfiles:

```yaml
services:
    gateway:
        image: nginx:alpine
        container_name: gateway-dev
        ports:
            - "${GATEWAY_PORT:-3001}:80"
        volumes:
            - ./infra/nginx-gateway/nginx.dev.conf:/etc/nginx/conf.d/default.conf:ro
        depends_on:
            - backend
            - frontend
        networks:
            - app-network

    backend:
        build:
            context: .
            dockerfile: ./packages/backend/Dockerfile
            target: development
        image: backend-dev
        container_name: backend-dev
        env_file:
            - ./.env
        volumes:
            - .:/app:cached
            - backend_node_modules:/app/node_modules
            - backend_pkg_node_modules:/app/packages/backend/node_modules
        networks:
            - app-network

    frontend:
        build:
            context: .
            dockerfile: ./packages/frontend/Dockerfile
            target: development
        image: frontend-dev
        container_name: frontend-dev
        env_file:
            - ./.env
        volumes:
            - frontend_node_modules:/app/node_modules
            - frontend_pkg_node_modules:/app/packages/frontend/node_modules
            - ./packages/frontend:/app/packages/frontend
        depends_on:
            - backend
        networks:
            - app-network

volumes:
    backend_node_modules:
    backend_pkg_node_modules:
    frontend_node_modules:
    frontend_pkg_node_modules:

networks:
    app-network:
        driver: bridge
```

---

### Task 6: Create compose.prod.yml

**Files:** Create `compose.prod.yml`

- [ ] Write production override:

```yaml
services:
    gateway:
        image: ghcr.io/oscar-sr/cybersecurity-news-scraper/gateway:${IMAGE_TAG:-latest}
        container_name: gateway
        restart: unless-stopped
        deploy:
            resources:
                limits:
                    cpus: "0.5"
                    memory: "64M"
        logging:
            driver: json-file
            options:
                max-size: "10m"
                max-file: "3"

    backend:
        image: ghcr.io/oscar-sr/cybersecurity-news-scraper/backend:${IMAGE_TAG:-latest}
        container_name: backend
        restart: unless-stopped
        deploy:
            resources:
                limits:
                    cpus: "1.0"
                    memory: "512M"
        logging:
            driver: json-file
            options:
                max-size: "10m"
                max-file: "3"

    frontend:
        image: ghcr.io/oscar-sr/cybersecurity-news-scraper/frontend:${IMAGE_TAG:-latest}
        container_name: frontend
        restart: unless-stopped
        deploy:
            resources:
                limits:
                    cpus: "0.5"
                    memory: "128M"
        logging:
            driver: json-file
            options:
                max-size: "10m"
                max-file: "3"
```

---

### Task 7: Update devcontainer.json

**Files:** Modify `.devcontainer/devcontainer.json`

- [ ] Change `dockerComposeFile` to reference both compose files:

```json
{
    "name": "Cybersecurity News Scraper",
    "dockerComposeFile": ["../compose.yml", "../compose.dev.yml"],
    "service": "backend",
    "workspaceFolder": "/app",
    "runServices": ["frontend"],
    "shutdownAction": "stopCompose",
    "customizations": {
        "vscode": {
            "extensions": [
                "dbaeumer.vscode-eslint",
                "esbenp.prettier-vscode",
                "ms-vscode.vscode-typescript-next",
                "bradlc.vscode-tailwindcss"
            ],
            "settings": {
                "editor.formatOnSave": true,
                "editor.codeActionsOnSave": {
                    "source.fixAll.eslint": "explicit"
                }
            }
        }
    }
}
```

---

### Task 8: Create CI/CD workflow

**Files:** Create `.github/workflows/build-push.yml`

- [ ] Write GitHub Actions workflow:

```yaml
name: Build and Push to GHCR

on:
    push:
        branches: [main]

env:
    REGISTRY: ghcr.io
    OWNER: ${{ github.repository_owner }}

jobs:
    build-and-push:
        runs-on: ubuntu-latest
        permissions:
            contents: read
            packages: write

        strategy:
            matrix:
                service:
                    - name: backend
                      context: .
                      dockerfile: ./packages/backend/Dockerfile
                      target: production
                    - name: frontend
                      context: .
                      dockerfile: ./packages/frontend/Dockerfile
                      target: production
                    - name: gateway
                      context: .
                      dockerfile: infra/nginx-gateway/Dockerfile

        steps:
            - uses: actions/checkout@v4

            - name: Log in to GHCR
              uses: docker/login-action@v3
              with:
                  registry: ${{ env.REGISTRY }}
                  username: ${{ github.actor }}
                  password: ${{ secrets.GITHUB_TOKEN }}

            - name: Extract metadata
              id: meta
              uses: docker/metadata-action@v5
              with:
                  images: ${{ env.REGISTRY }}/${{ env.OWNER }}/cybersecurity-news-scraper/${{ matrix.service.name }}
                  tags: |
                      type=sha,prefix=,format=short
                      type=raw,value=latest

            - name: Build and push
              uses: docker/build-push-action@v6
              with:
                  context: ${{ matrix.service.context }}
                  file: ${{ matrix.service.dockerfile }}
                  target: ${{ matrix.service.target }}
                  push: true
                  tags: ${{ steps.meta.outputs.tags }}
                  labels: ${{ steps.meta.outputs.labels }}
```

---

### Task 9: Update README

**Files:** Modify `README.md`

- [ ] Replace Docker commands section with table-based documentation
