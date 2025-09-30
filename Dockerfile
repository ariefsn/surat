# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build

# Stage 2: Production
FROM node:22-alpine AS production
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production \
  && yarn cache clean \
  && rm -rf /usr/local/share/.cache /root/.cache /tmp/*

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

CMD ["node", "dist/main.js"]
