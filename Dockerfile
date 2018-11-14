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

# default command
CMD yarn run start
