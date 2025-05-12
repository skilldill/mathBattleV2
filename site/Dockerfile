FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM httpd:latest AS runtime
COPY --from=build /app/build /usr/local/apache2/htdocs/
EXPOSE 80