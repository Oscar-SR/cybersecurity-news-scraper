# frontend/Dockerfile

# --- STAGE 1 ---
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
#RUN echo "Construyendo con API URL: $VITE_API_URL"

# Create the folder with compiled files
RUN npm run build 

# --- STAGE 2 ---
FROM nginx:alpine AS production-stage

# Copy the compiled file to the Nginx folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Nginx configuration
#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]