
FROM node:20.0.1

WORKDIR /app

ENV AWS_REGION=us-east-1

COPY package.json ./
COPY yarn.lock ./

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

RUN echo always-auth=true >> ../root/.npmrc

COPY . .
