# specify a base image
FROM node:alpine

# specify working directory
WORKDIR /usr/app

# install dependencies
RUN npm install -g npm
RUN npm install -g yarn

# copy dependencies
COPY ./package.json ./yarn.lock ./

RUN yarn install

# copy project
COPY ./ ./

# expose port and start application
EXPOSE 8080
CMD yarn run start
