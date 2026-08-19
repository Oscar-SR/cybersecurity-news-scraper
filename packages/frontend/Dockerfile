FROM node:24-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/

FROM base AS development
RUN npm install --workspace=packages/frontend
COPY packages/frontend ./packages/frontend
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
