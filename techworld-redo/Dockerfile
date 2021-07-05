FROM node
ENV MONGO_USERNAME=admin \
    MONGO_PASSWORD=password
RUN mkdir -p /home/app 
COPY . /home/app
RUN cd /home/app && yarn install
CMD [ "node", "/home/app/index.js" ]