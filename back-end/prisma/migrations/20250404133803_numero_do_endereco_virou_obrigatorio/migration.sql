/*
  Warnings:

  - Made the column `numero` on table `enderecos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `enderecos` MODIFY `numero` VARCHAR(20) NOT NULL;
