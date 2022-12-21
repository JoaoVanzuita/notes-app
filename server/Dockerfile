FROM node:lts-bullseye
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app
RUN /bin/bash -c "npm install --include=dev; npx tsc"
USER node
CMD "npm" "start"