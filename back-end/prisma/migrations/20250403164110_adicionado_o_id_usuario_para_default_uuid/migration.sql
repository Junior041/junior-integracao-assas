/*
  Warnings:

  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fk_usuario` on the `Usuario` table. All the data in the column will be lost.
  - The required column `id_usuario` was added to the `Usuario` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Usuario` DROP PRIMARY KEY,
    DROP COLUMN `fk_usuario`,
    ADD COLUMN `id_usuario` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_usuario`);
