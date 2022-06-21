FROM node:16.14.2-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install npm-run-all -g
RUN npm install --production

EXPOSE 50130

CMD ["npm", "run", "prod"]