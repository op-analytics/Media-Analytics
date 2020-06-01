FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

EXPOSE 8080
CMD [ "npm", "run", "dev" ]