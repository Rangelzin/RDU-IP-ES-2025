-- O arqivo down serve para desfazer oque o up fez

-- Remove as FOREIGN KEYS
ALTER TABLE "etapa4_resultado" DROP CONSTRAINT "etapa4_resultado_exame_id_fkey";
ALTER TABLE "etapa4_resultado" DROP CONSTRAINT "etapa4_resultado_responsavel_id_fkey";

ALTER TABLE "etapa3_laboratorio" DROP CONSTRAINT "etapa3_laboratorio_exame_id_fkey";
ALTER TABLE "etapa3_laboratorio" DROP CONSTRAINT "etapa3_laboratorio_responsavel_id_fkey";

ALTER TABLE "etapa2_clinico" DROP CONSTRAINT "etapa2_clinico_exame_id_fkey";
ALTER TABLE "etapa2_clinico" DROP CONSTRAINT "etapa2_clinico_responsavel_id_fkey";

ALTER TABLE "etapa1_anamnese" DROP CONSTRAINT "etapa1_anamnese_exame_id_fkey";
ALTER TABLE "etapa1_anamnese" DROP CONSTRAINT "etapa1_anamnese_responsavel_id_fkey";

ALTER TABLE "exames" DROP CONSTRAINT "exames_paciente_id_fkey";

ALTER TABLE "pacientes" DROP CONSTRAINT "pacientes_ubs_id_fkey";
ALTER TABLE "users" DROP CONSTRAINT "users_ubs_id_fkey";

-- Remove as tabelas (na ordem inversa da criação)
DROP TABLE IF EXISTS "etapa4_resultado";
DROP TABLE IF EXISTS "etapa3_laboratorio";
DROP TABLE IF EXISTS "etapa2_clinico";
DROP TABLE IF EXISTS "etapa1_anamnese";
DROP TABLE IF EXISTS "exames";
DROP TABLE IF EXISTS "pacientes";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "ubs";
