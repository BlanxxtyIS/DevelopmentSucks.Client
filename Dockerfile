# frontend/Dockerfile

# Этап 1: Сборка React-приложения
FROM node:18 AS build
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходники и билдим
COPY . .
RUN npm run build

# Этап 2: Продакшен-сервер на Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Убедимся, что у нас есть свой nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]