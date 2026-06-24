# --- STAGE 1 --- [cite: 19]
FROM node:20-alpine AS build-stage

WORKDIR /app

# 1. Copiamos archivos desde la raíz del monorepo
COPY package*.json ./

# 2. Copiamos package.json del frontend
COPY packages/frontend/package*.json ./packages/frontend/

# 3. Instalamos las dependencias específicas del frontend
RUN npm ci --workspace=packages/frontend

# 4. Copiamos todo el código fuente del frontend
COPY packages/frontend ./packages/frontend

# 5. Nos movemos a la carpeta del proyecto
WORKDIR /app/packages/frontend

RUN npm run build

# --- STAGE 2 --- [cite: 20]
FROM nginx:alpine AS production-stage

COPY packages/frontend/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build-stage /app/packages/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]