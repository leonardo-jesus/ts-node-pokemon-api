FROM node:18-alpine as base

WORKDIR /src
COPY package.json /
COPY yarn.lock /
EXPOSE 3333

FROM base as production
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile
COPY . /
CMD ["node", "index.ts"]

FROM base as dev
ENV NODE_ENV=development
RUN yarn global add nodemon && yarn install
COPY . /
CMD ["nodemon", "index.ts"]