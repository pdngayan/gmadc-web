FROM node:16-alpine3.16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN node_modules/.bin/ng build --prod

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html