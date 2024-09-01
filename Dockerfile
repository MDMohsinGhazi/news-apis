FROM node:slim

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm run build 

RUN rm -rf src

EXPOSE 8000

CMD ["node", "./dist/index.js"]