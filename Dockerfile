FROM node:22 AS build-env
WORKDIR /app
COPY . .
RUN npm install
FROM node:22
COPY --from=build-env /app /app
WORKDIR /app
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build && npm install -g serve
CMD ["serve", "dist", "-p", "5000"]
