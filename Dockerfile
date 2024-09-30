FROM node:22-alpine3.20
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 2525
CMD yarn start
