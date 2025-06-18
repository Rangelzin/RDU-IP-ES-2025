-- Gera as tabelas principais do projeto

CREATE TABLE "ubs" (
  "id" SERIAL PRIMARY KEY,
  "nome" varchar,
  "cnes" char(7) UNIQUE NOT NULL,
  "municipio" varchar,
  "uf" char(2),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "nome" varchar,
  "cpf" char(11) UNIQUE NOT NULL,
  "crm" char(9) UNIQUE,
  "email" varchar UNIQUE,
  "senha" varchar NOT NULL,
  "role" varchar,
  "ubs_id" integer NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "pacientes" (
  "id" SERIAL PRIMARY KEY,
  "nome_completo" varchar,
  "nome_mae" varchar,
  "apelido" varchar,
  "cpf" char(11) UNIQUE NOT NULL,
  "senha" varchar NOT NULL,
  "data_nascimento" date,
  "logradouro" varchar,
  "numero" varchar,
  "complemento" varchar,
  "bairro" varchar,
  "municipio" varchar,
  "uf" char(2),
  "cep" char(8),
  "telefone" char(11),
  "ponto_referencia" varchar,
  "escolaridade" varchar,
  "cartao_sus" char(15),
  "raca_cor" varchar,
  "nacionalidade" varchar,
  "ubs_id" integer NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "exames" (
  "id" SERIAL PRIMARY KEY,
  "paciente_id" integer NOT NULL,
  "protocolo" char(14) UNIQUE,
  "prontuario" char(10),
  "data_resultado" date,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "etapa1_anamnese" (
  "id" SERIAL PRIMARY KEY,
  "exame_id" integer UNIQUE NOT NULL,
  "responsavel_id" integer NOT NULL,
  "motivo_exame" varchar,
  "fez_preventivo" integer,
  "ano_ultimo_exame" char(4),
  "usa_diu" integer,
  "gravida" integer,
  "usa_pilula" integer,
  "usa_hormonio" integer,
  "radioterapia" integer,
  "ultima_menstruacao" date,
  "sangramento_relacao" integer,
  "sangramento_menopausa" integer,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "etapa2_clinico" (
  "id" SERIAL PRIMARY KEY,
  "exame_id" integer UNIQUE NOT NULL,
  "responsavel_id" integer NOT NULL,
  "inspeção_colo" varchar,
  "sinais_dst" boolean,
  "data_coleta" date,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "etapa3_laboratorio" (
  "id" SERIAL PRIMARY KEY,
  "exame_id" integer UNIQUE NOT NULL,
  "responsavel_id" integer NOT NULL,
  "laboratorio_nome" varchar,
  "laboratorio_cnes" char(14) NOT NULL,
  "numero_exame" varchar,
  "recebido_em" date,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "etapa4_resultado" (
  "id" SERIAL PRIMARY KEY,
  "exame_id" integer UNIQUE NOT NULL,
  "responsavel_id" integer NOT NULL,
  "amostra_rejeitada" text,
  "epitelios_representados" text,
  "adequabilidade_material" boolean,
  "insatisfatoria_por" text,
  "dentro_limites_normalidade" boolean,
  "alteracao_celulas_benignas" text,
  "microbiologia" text,
  "celulas_atipicas_significado_indeterminado" text,
  "atipias_celulas_escamosas" text,
  "atipias_celulas_glandulares" text,
  "outras_neoplasias_malignas" text,
  "celulas_endometriais_pos_menopausa_ou_mais40" boolean,
  "observacoes_gerais" text,
  "screening_citotecnico" varchar,
  "responsavel" varchar,
  "data_resultado" date,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "users" ADD FOREIGN KEY ("ubs_id") REFERENCES "ubs" ("id");

ALTER TABLE "pacientes" ADD FOREIGN KEY ("ubs_id") REFERENCES "ubs" ("id");

ALTER TABLE "exames" ADD FOREIGN KEY ("paciente_id") REFERENCES "pacientes" ("id");

ALTER TABLE "etapa1_anamnese" ADD FOREIGN KEY ("exame_id") REFERENCES "exames" ("id");

ALTER TABLE "etapa1_anamnese" ADD FOREIGN KEY ("responsavel_id") REFERENCES "users" ("id");

ALTER TABLE "etapa2_clinico" ADD FOREIGN KEY ("exame_id") REFERENCES "exames" ("id");

ALTER TABLE "etapa2_clinico" ADD FOREIGN KEY ("responsavel_id") REFERENCES "users" ("id");

ALTER TABLE "etapa3_laboratorio" ADD FOREIGN KEY ("exame_id") REFERENCES "exames" ("id");

ALTER TABLE "etapa3_laboratorio" ADD FOREIGN KEY ("responsavel_id") REFERENCES "users" ("id");

ALTER TABLE "etapa4_resultado" ADD FOREIGN KEY ("exame_id") REFERENCES "exames" ("id");

ALTER TABLE "etapa4_resultado" ADD FOREIGN KEY ("responsavel_id") REFERENCES "users" ("id");