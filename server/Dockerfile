FROM node:lts-bullseye
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app
RUN /bin/bash -c "npm install --include=dev; npx tsc"
RUN /bin/bash -c "npm run migration:generate; npm run migration:run"
USER node
CMD ["npm" "start"]