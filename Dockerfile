FROM node:22 AS build-env
WORKDIR /app
COPY . .
RUN npm install
FROM node:22
WORKDIR /app
COPY --from=build-env /app /app
ENV NODE_ENV production
RUN npm run build && npm install -g vite
CMD ["npm","run","preview"]