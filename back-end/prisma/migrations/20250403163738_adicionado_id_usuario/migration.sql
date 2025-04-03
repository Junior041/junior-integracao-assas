/*
  Warnings:

  - Added the required column `fk_usuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `fk_usuario` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`fk_usuario`);
