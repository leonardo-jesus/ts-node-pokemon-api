FROM node:18-alpine as base

WORKDIR /src
COPY package.json .
COPY yarn.lock .

FROM base as production
COPY tsconfig.build.json .
RUN yarn install
COPY . .
RUN yarn run build
EXPOSE 3333
CMD ["yarn", "start"]

FROM base as dev
RUN yarn global add nodemon && yarn install
COPY . .
CMD ["nodemon", "index.ts"]