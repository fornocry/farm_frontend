FROM node:22 AS build-env
WORKDIR /app
COPY . .
RUN npm install
FROM node:22
COPY --from=build-env /app /app
WORKDIR /app
ENV NODE_ENV production
RUN npm run build && npm install -g serve
CMD ["serve","-s","dist", "-p", "5000"]
