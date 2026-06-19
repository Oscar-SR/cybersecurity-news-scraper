# FROM node:20-bookworm 
FROM mcr.microsoft.com/playwright:v1.57.0-noble

# Work directory inside the container 
WORKDIR /app

# 1. Copiamos los archivos de bloqueo de la raíz del monorepo
COPY package*.json ./

# 2. Copiamos el package.json del backend
COPY packages/backend/package*.json ./packages/backend/

# 3. Instalamos SOLO las dependencias del workspace de backend usando el lockfile global
RUN npm ci --workspace=packages/backend

# Instalamos los navegadores de Playwright 
RUN npx playwright install chromium

# 4. Copiamos el resto del código del backend
COPY packages/backend ./packages/backend

# 5. Entramos en la carpeta del backend para el resto de operaciones
WORKDIR /app/packages/backend

# Compile the typescript code 
RUN npm run build

# Expose the port 
ARG PORT
EXPOSE ${PORT}

# Start command 
CMD ["npm", "start"]