# Stage 1: Build
FROM node:22 AS build-env
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Declare the build argument
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Run the build command if necessary
RUN npm run build  # Uncomment if you have a build script

# Stage 2: Production
FROM node:22
WORKDIR /app

# Copy only necessary files for production
COPY --from=build-env /app/package*.json ./
RUN npm install --production

# Copy built files and other necessary files
COPY --from=build-env /app/dist ./dist

# Expose the port (if necessary)
EXPOSE 5000

# Start the preview server
CMD ["npm", "run", "preview"]
