# Используем официальный образ Node.js
FROM node:20

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости (если есть)
COPY package.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Порт для API
EXPOSE 4828

# Команда запуска
CMD ["npm", "start"]