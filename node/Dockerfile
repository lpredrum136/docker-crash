# FROM node:12-slim for faster building
FROM node
WORKDIR /usr/src/app
ENV WELCOME_MESSAGE="Welcome to Docker"
# or COPY package*.json .
COPY . .
# First try, you can stop here, and docker exec -it my-node-container bash, to get into the container. You would
# be automatically starting at /usr/src/app, and in here there will be all your files
RUN yarn install
EXPOSE 4000
CMD [ "npm", "start" ]
