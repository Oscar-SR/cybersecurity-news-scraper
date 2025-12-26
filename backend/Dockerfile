# backend/Dockerfile

# Usamos una versión ligera de Node (Alpine)
FROM node:20-alpine

# Usamos Playwright
FROM mcr.microsoft.com/playwright:v1.57.0-noble

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero los package.json para aprovechar la caché de Docker
COPY package*.json ./

# Instalamos dependencias
RUN npm install --production

RUN npx playwright install chromium

# Copiamos el resto del código
COPY . .

# Exponemos el puerto (asegúrate de que tu index.js escuche en este puerto)
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]