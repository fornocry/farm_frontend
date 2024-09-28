FROM node:22 AS build-env
WORKDIR /app
COPY . .

# Declare the build argument
ARG VITE_API_URL

# Set the environment variable for the build
ENV VITE_API_URL=$VITE_API_URL

RUN npm install

FROM node:22
WORKDIR /app
COPY --from=build-env /app /app
ENV NODE_ENV production
RUN npm run build && npm install -g serve
CMD ["serve", "-s", "dist", "-p", "5000"]
