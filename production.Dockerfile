FROM node:20 AS deps

WORKDIR /app
#criar credencias AWS para preenchimento
ARG ARG_AWS_ACCESS_KEY_ID
ARG ARG_AWS_SECRET_ACCESS_KEY

ENV AWS_ACCESS_KEY_ID=${ARG_AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${ARG_AWS_SECRET_ACCESS_KEY}
ENV AWS_REGION=us-east-1

COPY package.json ./
COPY yarn.lock ./

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

RUN yarn aws:login
RUN echo always-auth=true >>../root/.npmrc

RUN yarn install --frozen-lockfile

COPY tsconfig.json ./
COPY tsconfig.build.json ./

COPY . .

RUN yarn db:clients:generate

RUN yarn build

# FROM node:20.0.1

# WORKDIR /app

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/yarn.lock ./
# COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/src ./src
# COPY --from=builder /app/tsconfig.json ./
# COPY --from=builder /app/tsconfig.build.json ./
# COPY --from=builder /app/dist ./dist

# RUN yarn add puppeteer

EXPOSE 3000

CMD ["yarn", "start:prod"]
