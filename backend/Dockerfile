# backend/Dockerfile

#FROM node:20-bookworm
FROM mcr.microsoft.com/playwright:v1.57.0-noble

# Work directory inside the container
WORKDIR /app

# First, we copy al the package.json
COPY package*.json ./

# Install dependencies
RUN npm install

#RUN npx -y playwright@1.57.0 install --with-deps
RUN npx playwright install chromium

# Copy the rest of the code
COPY . .

# Expose the port
ARG PORT
EXPOSE ${PORT}

# Start command
CMD ["npm", "start"]