FROM node:22 AS build-env
WORKDIR /app
COPY . .


RUN npm install

FROM node:22
WORKDIR /app
COPY --from=build-env /app /app
ENV NODE_ENV production
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm install -g vite
CMD ["vite", "preview", "--port", "5000"]
