FROM node:22 AS build-env
WORKDIR /app
COPY . .

# Declare the build argument
ARG VITE_API_URL

# Set the environment variable for the build
ENV VITE_API_URL=$VITE_API_URL

FROM node:22
WORKDIR /app
COPY --from=build-env /app /app
ENV NODE_ENV production
RUN npm install && npm install vite
CMD ["vite", "preview", "--port", "5000"]
