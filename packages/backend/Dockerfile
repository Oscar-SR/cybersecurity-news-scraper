FROM mcr.microsoft.com/playwright:v1.56.1-noble AS runtime-base
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

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
