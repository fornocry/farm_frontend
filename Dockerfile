FROM node:22 AS build-env
WORKDIR /app
COPY . .


FROM node:22
# Declare the build argument
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
WORKDIR /app
COPY --from=build-env /app /app
ENV NODE_ENV production
RUN npm install && npm install vite --save
CMD ["npm", "run", "preview"]
