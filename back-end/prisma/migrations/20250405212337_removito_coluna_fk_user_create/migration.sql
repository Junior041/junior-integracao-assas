/*
  Warnings:

  - You are about to drop the column `fk_user_create` on the `Pessoa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Pessoa` DROP COLUMN `fk_user_create`;
SET @pessoa_id = 'e1a55b7b-1234-4f7a-9999-abcde1234567';

INSERT INTO Pessoa (
  id_pessoa,
  nome,
  cpf_cnpj,
  telefone,
  email,
  data_nascimento,
  created_at
) VALUES (
  @pessoa_id,
  'João da Silva',
  '69764171095',
  '48999990000',
  'junior@teste.com',
  '1990-05-15',
  NOW()
);

INSERT INTO Usuario (
  id_usuario,
  fk_pessoa,
  email,
  senha,
  ativo,
  created_at,
  updated_at
) VALUES (
  UUID(),
  @pessoa_id,
  'joao@email.com',
  '$2b$08$fkUJ0BJEfn9coaRMO/9p3.UnuR.lvQVAFZ5QM3cToH55xcsGo/Fle', -- imobia
  true,
  NOW(),
  NOW()
);
