
FROM node:20

WORKDIR /app

ENV AWS_REGION=us-east-1
ENV SERVER_PORT=8001

# Copiar arquivos de configuração e instalar dependências
COPY package*.json ./

RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

COPY .env ./

# Rodar migrações do Prisma (ajuste conforme necessário para o seu ambiente)
RUN yarn prisma:generate

RUN npm run build

# Expor a porta que a aplicação vai utilizar
EXPOSE 8001

# Comando para iniciar a aplicação
CMD ["yarn", "start"]