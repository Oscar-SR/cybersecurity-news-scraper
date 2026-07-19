FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/

RUN npm ci --workspace=packages/frontend

COPY packages/frontend ./packages/frontend

WORKDIR /app/packages/frontend

RUN npm run build

FROM nginx:alpine AS production-stage

COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/packages/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
