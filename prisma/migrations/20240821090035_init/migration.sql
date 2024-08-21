-- CreateTable
CREATE TABLE "ATIVIDADES" (
    "CODIGO" VARCHAR,
    "ATIVIDADE" VARCHAR,
    "SCORE" VARCHAR,
    "RACIONAL" VARCHAR
);

-- CreateTable
CREATE TABLE "MUNICIPIOSBIFRONTEIRA" (
    "cep" VARCHAR,
    "bairro" VARCHAR,
    "municipio" VARCHAR,
    "estado" VARCHAR,
    "paises" VARCHAR
);

-- CreateTable
CREATE TABLE "MUNICÍPIOSFRONTEIRA" (
    "cep" VARCHAR,
    "bairro" VARCHAR,
    "municipio" VARCHAR,
    "estado" VARCHAR,
    "paises" VARCHAR
);

-- CreateTable
CREATE TABLE "NACIONALIDADES" (
    "NACIONALIDADE" VARCHAR,
    "SCORE" VARCHAR,
    "RACIONAL" VARCHAR
);

-- CreateTable
CREATE TABLE "PROFISSOES" (
    "PROFISSAO" VARCHAR,
    "SCORE" VARCHAR,
    "RACIONAL" VARCHAR
);

-- CreateTable
CREATE TABLE "REGIOESAEROPORTOS" (
    "cep" VARCHAR,
    "bairro" VARCHAR,
    "municipio" VARCHAR,
    "estado" VARCHAR,
    "cod" VARCHAR,
    "aeroporto" VARCHAR,
    "idaeroporto" VARCHAR
);

-- CreateTable
CREATE TABLE "REGIOESFAVELAS" (
    "cep" VARCHAR,
    "bairro" VARCHAR,
    "municipio" VARCHAR,
    "estado" VARCHAR,
    "nome" VARCHAR,
    "google" VARCHAR
);

-- CreateTable
CREATE TABLE "REGIOESPORTOS" (
    "cep" VARCHAR,
    "bairro" VARCHAR,
    "municipio" VARCHAR,
    "estado" VARCHAR,
    "nomeportos" VARCHAR
);

-- CreateTable
CREATE TABLE "REGIOESRODOVIARIAS" (
    "cep" VARCHAR,
    "bairro" VARCHAR,
    "municipio" VARCHAR,
    "estado" VARCHAR,
    "rodoviaria" VARCHAR,
    "google" VARCHAR
);

-- CreateTable
CREATE TABLE "RESTRICOESCORREIOS" (
    "cepinicial" VARCHAR,
    "cepfinal" VARCHAR,
    "estado" VARCHAR,
    "entregadomiciliar" VARCHAR,
    "entregainterna" VARCHAR
);

-- CreateTable
CREATE TABLE "scorecolaborador" (
    "cpf" BIGINT NOT NULL,
    "ptoquestionario" BIGINT,
    "ptototal" BIGINT,
    "cep" VARCHAR(255),
    "nome" VARCHAR(255),
    "ptoadmissao" BIGINT,
    "ptocep" BIGINT,
    "ptolista" BIGINT,
    "ptonacionalidade" BIGINT,
    "ptopep" BIGINT,
    "ptorestricao" BIGINT,

    CONSTRAINT "scorecolaborador_pkey1" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "scorefornecedor" (
    "cnpj" BIGINT NOT NULL,
    "cep" BIGINT,
    "nome" VARCHAR(255),
    "ptocep" BIGINT,
    "ptocnae" BIGINT,
    "ptofundacao" BIGINT,
    "ptolista" BIGINT,
    "ptopep" BIGINT,
    "ptototal" BIGINT,

    CONSTRAINT "scorefornecedor_pkey1" PRIMARY KEY ("cnpj")
);

-- CreateTable
CREATE TABLE "scorepessoafisica" (
    "cpf" BIGINT NOT NULL,
    "ptoquestionario" BIGINT,
    "ptototal" BIGINT,
    "cep" VARCHAR(255),
    "nome" VARCHAR(255),
    "ptoadmissao" BIGINT,
    "ptocep" BIGINT,
    "ptolista" BIGINT,
    "ptonacionalidade" BIGINT,
    "ptopep" BIGINT,
    "ptorestricao" BIGINT,

    CONSTRAINT "scorecolaborador_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "scorepessoajuridica" (
    "cnpj" BIGINT NOT NULL,
    "cep" BIGINT,
    "nome" VARCHAR(255),
    "ptocep" BIGINT,
    "ptocnae" BIGINT,
    "ptofundacao" BIGINT,
    "ptolista" BIGINT,
    "ptopep" BIGINT,
    "ptototal" BIGINT,

    CONSTRAINT "scorefornecedor_pkey" PRIMARY KEY ("cnpj")
);

-- CreateTable
CREATE TABLE "scoreprestador" (
    "cpf" BIGINT NOT NULL,
    "ptototal" BIGINT,
    "cep" BIGINT,
    "nome" VARCHAR(255),
    "ptocep" BIGINT,
    "ptolista" BIGINT,
    "ptonascimento" BIGINT,
    "ptopep" BIGINT,
    "ptoprofissao" BIGINT,

    CONSTRAINT "scoreprestador_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "usuario" (
    "idusuario" INTEGER NOT NULL,
    "nome" VARCHAR,
    "usuario" VARCHAR,
    "senha" VARCHAR,
    "departamento" VARCHAR,
    "telefone" VARCHAR,
    "empresa" VARCHAR,
    "datacad" TIMESTAMP(6),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("idusuario")
);
