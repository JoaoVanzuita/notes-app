FROM node:lts-bullseye
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app
RUN npm install --production
USER node
CMD "npm" "start"