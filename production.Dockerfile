FROM node:20 AS deps

WORKDIR /app
#criar credencias AWS para preenchimento
ARG ARG_AWS_ACCESS_KEY_ID
ARG ARG_AWS_SECRET_ACCESS_KEY
ARG SERVER_PORT
ARG DATABASE_URL

ENV AWS_ACCESS_KEY_ID=${ARG_AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${ARG_AWS_SECRET_ACCESS_KEY}
ENV AWS_REGION=us-east-1
ENV SERVER_PORT=${SERVER_PORT}
ENV DATABASE_URL=${DATABASE_URL}

COPY package*.json ./
COPY yarn.lock ./

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

RUN yarn aws:login
RUN echo always-auth=true >>../root/.npmrc

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn prisma:generate

RUN yarn build

EXPOSE ${SERVER_PORT}

CMD ["yarn", "start:prod"]
