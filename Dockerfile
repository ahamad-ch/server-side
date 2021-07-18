FROM node:12-alpine

WORKDIR '/app/api'

COPY ./package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3003

CMD ["sh","-c","npm run dev"]