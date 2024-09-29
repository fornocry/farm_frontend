# Stage 1: Build
FROM node:22 AS build-env
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: Production
FROM node:22
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build-env /app /app
COPY package*.json ./
RUN npm install --production
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
CMD ["npm", "run", "preview"]
