FROM node:11

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002
CMD ["npm", "start"]
