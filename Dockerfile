FROM node:18
WORKDIR /app
COPY . .
RUN npm install amqplib
CMD ["node", "index.js"]
