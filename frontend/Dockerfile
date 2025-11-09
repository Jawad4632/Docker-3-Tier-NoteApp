# Stage 1: Build React app
FROM node:22-alpine AS build

WORKDIR /frontend

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx","-g","daemon off;" ]