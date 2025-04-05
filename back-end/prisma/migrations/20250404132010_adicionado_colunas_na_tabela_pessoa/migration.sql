/*
  Warnings:

  - A unique constraint covering the columns `[telefone]` on the table `Pessoa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Pessoa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data_nascimento` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Pessoa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pessoa` ADD COLUMN `data_nascimento` DATETIME(3) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Pessoa_telefone_key` ON `Pessoa`(`telefone`);

-- CreateIndex
CREATE UNIQUE INDEX `Pessoa_email_key` ON `Pessoa`(`email`);

-- salva o UUID da pessoa em uma variável
SET @id_pessoa := UUID();

-- insere a pessoa com esse UUID
INSERT INTO Pessoa (
  id_pessoa,
  nome,
  cpf_cnpj,
  fk_user_create,
  telefone,
  email,
  data_nascimento,
  created_at
) VALUES (
  @id_pessoa,
  'João da Silva',
  '69764171095',
  '11111111-2222-3333-4444-555555555555',
  '48999990000',
  'junior@teste.com',
  '1990-05-15',
  NOW()
);

-- usa o mesmo id da pessoa aqui
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
  @id_pessoa,
  'joao@email.com',
  '$2b$08$fkUJ0BJEfn9coaRMO/9p3.UnuR.lvQVAFZ5QM3cToH55xcsGo/Fle', --imobia
  true,
  NOW(),
  NOW()
);
