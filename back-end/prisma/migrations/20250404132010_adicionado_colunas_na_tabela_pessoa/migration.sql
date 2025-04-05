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


