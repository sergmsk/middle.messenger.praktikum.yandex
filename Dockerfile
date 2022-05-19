FROM node:latest
WORKDIR /var/www
COPY . .
RUN yarn && yarn build
EXPOSE 3000
CMD node server.js